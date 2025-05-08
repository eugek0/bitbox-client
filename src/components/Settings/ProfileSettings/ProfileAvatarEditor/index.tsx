import { FC } from "react";
import Cropper from "react-easy-crop";
import styles from "./styles.module.scss";
import { ProfileAvatarEditorProps } from "./types";
import { Button, Flex, Slider } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ProfileAvatarEditor: FC<ProfileAvatarEditorProps> = ({
  handleGetCroppedImage,
  isAvatarChanging,
  onZoomChange,
  handleClose,
  zoom,
  ...props
}) => {
  return (
    <div onClick={handleClose} className={styles["body"]}>
      <Button
        className={styles["close"]}
        onClick={handleClose}
        icon={<CloseOutlined />}
        type="text"
      />
      <Flex
        className={styles["wrapper"]}
        onClick={(event) => event.stopPropagation()}
        vertical
      >
        <div className={styles["crop-wrapper"]}>
          <Cropper
            {...props}
            onZoomChange={onZoomChange}
            zoom={zoom}
            aspect={1}
            showGrid={false}
            cropShape="round"
          />
        </div>
        <Button
          className={styles["cut"]}
          loading={isAvatarChanging}
          onClick={handleGetCroppedImage}
          type="primary"
        >
          Обрезать
        </Button>
        <div className={styles["slider-wrapper"]}>
          <Slider
            onChange={onZoomChange}
            value={zoom}
            min={1}
            max={3}
            step={0.01}
            tooltip={{ formatter: null }}
          />
        </div>
      </Flex>
    </div>
  );
};

export default ProfileAvatarEditor;
