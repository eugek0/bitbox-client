import Header from "@/components/Layouts/Header";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";
import { FC } from "react";

const HeaderContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  return <Header profile={profile} />;
};

export default HeaderContainer;
