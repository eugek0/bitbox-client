import { FC, useEffect, useState } from "react";
import SettingsMenu from "@/components/Layouts/SettingsLayout/SettingsMenu";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";

const SettingsMenuContainer: FC = () => {
  const [activeItem, setActiveItem] = useState<string>("");

  const profile = useAppSelector(profileSelector);

  const location = useLocation();
  const navigate = useNavigate();

  const handlers = {
    profile: () => navigate({ to: "/settings/profile" }),
    security: () => navigate({ to: "/settings/security" }),
    development: () => navigate({ to: "/settings/development" }),
    roles: () => navigate({ to: "/settings/roles" }),
  };

  useEffect(() => {
    const pathname = location.pathname.slice(
      location.pathname.lastIndexOf("/") + 1,
    );

    setActiveItem(pathname);
  }, [location]);

  return (
    <SettingsMenu
      role={profile?.role}
      activeItem={activeItem}
      handlers={handlers}
    />
  );
};

export default SettingsMenuContainer;
