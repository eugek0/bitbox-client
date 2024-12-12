import { FC } from "react";
import Home from "@/components/Home";
import { useAppSelector } from "@/store";
import { profileSelector } from "../Auth/selectors";

const HomeContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  return <Home profile={profile} />;
};

export default HomeContainer;
