import RecoverPassword from "@/components/Auth/RecoverPassword";
import { FC } from "react";
import { useCheckRecoveryTokenQuery } from "../api";
import { useParams, useSearch } from "@tanstack/react-router";
import FullscreenLoader from "@/containers/Common/FullscreenLoader";
import { Flex, Result } from "antd";

const RecoverPasswordContainer: FC = () => {
  const { userid } = useParams({ from: "/auth/recover/$userid" });
  const { token } = useSearch({ from: "/auth/recover/$userid" });

  const { error, isFetching } = useCheckRecoveryTokenQuery({
    userid,
    params: {
      token,
    },
  });

  if (isFetching) {
    return <FullscreenLoader />;
  }

  if (error) {
    return (
      <Flex className="page100vh" align="center" justify="center">
        <Result
          status="error"
          title="Ошибка"
          subTitle="Токен является недействительным"
        />
      </Flex>
    );
  }

  return <RecoverPassword />;
};

export default RecoverPasswordContainer;
