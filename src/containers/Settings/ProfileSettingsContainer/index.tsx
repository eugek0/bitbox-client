import { FC, useState } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import ProfileSettings from "@/components/Settings/ProfileSettings";
import { ProfileEditFormFields } from "@/components/Settings/ProfileSettings/ProfileEditForm/types";
import { ContactType } from "@/containers/Auth/types";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { useChangeAvatarMutation, useEditUserMutation } from "@/core/api";
import { useLazyGetProfileQuery } from "@/containers/Auth/api";
import { isFormException } from "@/core/typeguards";
import { setErrorsToField } from "@/core/utils";
import { readFile } from "./ProfileAvatarEditorContainer/utils";

const ProfileSettingsContainer: FC = () => {
  const [image, setImage] = useState<string>("");

  const profile = useAppSelector(profileSelector);

  const [form] = useForm<ProfileEditFormFields>();
  const contactType = useWatch<ContactType>("prefered_contacts", form);

  const [edit, { isLoading: isEditing }] = useEditUserMutation();
  const [getProfile] = useLazyGetProfileQuery();
  const [changeAvatar] = useChangeAvatarMutation();

  const handleEdit = async (body: ProfileEditFormFields) => {
    try {
      await edit({ userid: profile?._id ?? "", body }).unwrap();
      getProfile();
    } catch (error) {
      if (isFormException(error)) {
        setErrorsToField(form, error);
      }
    }
  };

  const handleChangeAvatar = () => {
    const upload = document.createElement("input");
    upload.setAttribute("type", "file");
    upload.setAttribute("accept", "image/*");

    const changeEventHandler = async () => {
      for (const file of upload?.files ?? []) {
        const image = await readFile(file);
        setImage(image);
      }

      upload.removeEventListener("change", changeEventHandler);
    };

    upload.addEventListener("change", changeEventHandler);
    upload.click();
  };

  const handleResetAvatar = async () => {
    if (!profile) return;

    await changeAvatar({ userid: profile?._id });
    getProfile();
  };

  const handleCloseChangeAvatar = () => {
    setImage("");
  };

  return (
    <ProfileSettings
      form={form}
      isEditing={isEditing}
      avatar={profile?.avatar}
      isTelegramHidden={contactType !== "telegram"}
      initialValues={profile}
      image={image}
      handleEdit={handleEdit}
      handleChangeAvatar={handleChangeAvatar}
      handleResetAvatar={handleResetAvatar}
      handleClosechangeAvatar={handleCloseChangeAvatar}
    />
  );
};

export default ProfileSettingsContainer;
