import { FC } from "react";
import Header from "@/components/Layouts/Header";
import { HeaderContainerProps } from "./types";

const HeaderContainer: FC<HeaderContainerProps> = ({ showLogotype = true }) => {
  return <Header showLogotype={showLogotype} />;
};

export default HeaderContainer;
