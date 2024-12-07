import Home from "@/components/Home";
import { useAppSelector } from "@/store";
import { FC } from "react";
import { profileSelector } from "../Auth/selectors";

const HomeContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  return <Home profile={profile} />;
};

export default HomeContainer;
