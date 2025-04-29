import { FC, useEffect, useState } from "react";
import SettingsMenu from "@/components/Layouts/SettingsLayout/SettingsMenu";
import { useLocation } from "@tanstack/react-router";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";

const SettingsMenuContainer: FC = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const profile = useAppSelector(profileSelector);

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.slice(
      location.pathname.lastIndexOf("/") + 1,
    );

    setActiveItem(pathname);
  }, [location]);

  return <SettingsMenu role={profile?.role} activeItem={activeItem} />;
};

export default SettingsMenuContainer;
