import Header from "@/components/Layouts/Header";
import { useGetProfileQuery } from "@/containers/Auth/api";
import { FC } from "react";

const HeaderContainer: FC = () => {
  const { data } = useGetProfileQuery();

  return <Header profile={data} />;
};

export default HeaderContainer;
