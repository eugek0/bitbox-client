import { FC } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import ProfileSettings from "@/components/Settings/ProfileSettings";
import { ProfileEditFormFields } from "@/components/Settings/ProfileSettings/ProfileEditForm/types";
import { ContactType } from "@/containers/Auth/types";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { useEditUserMutation } from "@/core/api";
import { useLazyGetProfileQuery } from "@/containers/Auth/api";

const ProfileSettingsContainer: FC = () => {
  const [form] = useForm<ProfileEditFormFields>();

  const profile = useAppSelector(profileSelector);

  const contactType = useWatch<ContactType>("prefered_contacts", form);

  const [edit, { isLoading: isEditing }] = useEditUserMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const handleEdit = async (body: ProfileEditFormFields) => {
    await edit({ userid: profile?._id ?? "", body });
    getProfile();
  };

  return (
    <ProfileSettings
      form={form}
      isEditing={isEditing}
      avatar={profile?.avatar}
      isTelegramHidden={contactType !== "telegram"}
      initialValues={profile}
      handleEdit={handleEdit}
    />
  );
};

export default ProfileSettingsContainer;
