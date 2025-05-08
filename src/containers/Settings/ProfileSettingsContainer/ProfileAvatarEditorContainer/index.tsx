import { FC, useState } from "react";
import ProfileAvatarEditor from "@/components/Settings/ProfileSettings/ProfileAvatarEditor";
import { Area, CropperProps } from "react-easy-crop";
import { Nullable } from "@/core/types";
import { getCroppedImg } from "./utils";
import { ProfileAvatarEditorContainerProps } from "./types";
import { useChangeAvatarMutation } from "@/core/api";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { useLazyGetProfileQuery } from "@/containers/Auth/api";

const ProfileAvatarEditorContainer: FC<ProfileAvatarEditorContainerProps> = ({
  handleClose,
  image,
}) => {
  const [pixels, setPixels] = useState<Nullable<Area>>(null);
  const [crop, setCrop] = useState<CropperProps["crop"]>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const profile = useAppSelector(profileSelector);

  const [changeAvatar, { isLoading: isAvatarChanging }] =
    useChangeAvatarMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const handleChangeCrop = (crop: CropperProps["crop"]) => {
    setCrop(crop);
  };

  const handleChangeZoom = (zoom: number) => {
    setZoom(zoom);
  };

  const handleCompleteCrop: CropperProps["onCropComplete"] = (_, pixels) => {
    setPixels(pixels);
  };

  const handleGetCroppedImage = async () => {
    if (!pixels || !profile) return;

    const avatar = await getCroppedImg(image, pixels);

    if (avatar) {
      const formdata = new FormData();

      formdata.append("avatar", avatar);

      await changeAvatar({
        userid: profile._id,
        body: formdata,
      });
      handleClose();
      getProfile();
    }
  };

  return (
    <ProfileAvatarEditor
      image={image}
      crop={crop}
      zoom={zoom}
      isAvatarChanging={isAvatarChanging}
      onCropChange={handleChangeCrop}
      onZoomChange={handleChangeZoom}
      onCropComplete={handleCompleteCrop}
      handleGetCroppedImage={handleGetCroppedImage}
      handleClose={handleClose}
    />
  );
};

export default ProfileAvatarEditorContainer;
