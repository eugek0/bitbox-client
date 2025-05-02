import { FC, PropsWithChildren } from "react";
import { Flex, Result } from "antd";
import SettingsLayout from "@/components/Layouts/SettingsLayout";
import FullscreenLoader from "@/containers/Common/FullscreenLoader";
import { useAppSelector } from "@/store";
import {
  isProfileLoadingSelector,
  profileSelector,
} from "@/containers/Auth/selectors";
import styles from "./styles.module.scss";
import { useLocation } from "@tanstack/react-router";
import { SETTINGS_LAYOUT_PERMISSIONS } from "./constants";

const SettingsLayoutContainer: FC<PropsWithChildren> = ({ children }) => {
  const profile = useAppSelector(profileSelector);
  const isProfileLoading = useAppSelector(isProfileLoadingSelector);

  const location = useLocation();

  if (isProfileLoading) {
    return <FullscreenLoader />;
  }

  return (
    <SettingsLayout>
      {SETTINGS_LAYOUT_PERMISSIONS[location.pathname ?? ""].includes(
        profile?.role ?? "user",
      ) ? (
        children
      ) : (
        <Flex className={styles["result"]} justify="center" flex={1}>
          <Result
            status="403"
            title="Ошибка доступа"
            subTitle="У вас недостаточно прав, чтобы использовать этот раздел"
          />
        </Flex>
      )}
    </SettingsLayout>
  );
};

export default SettingsLayoutContainer;
