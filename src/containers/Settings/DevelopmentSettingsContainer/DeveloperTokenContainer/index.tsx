import { FC } from "react";
import DeveloperToken from "@/components/Settings/DevelopmentSettings/DeveloperToken";
import {
  useCheckDeveloperTokenQuery,
  useDeleteDeveloperTokenMutation,
  useLazyGenerateDeveloperTokenQuery,
} from "@/containers/Auth/api";
import useApp from "antd/es/app/useApp";

const DeveloperTokenContainer: FC = () => {
  const { message, modal } = useApp();

  const {
    data: hasDevToken,
    refetch,
    isLoading: isTokenLoading,
  } = useCheckDeveloperTokenQuery();
  const [
    genToken,
    { data: token, isFetching: isTokenFetching, reset: resetToken },
  ] = useLazyGenerateDeveloperTokenQuery();
  const [deleteToken, { isLoading: isTokenDeleting }] =
    useDeleteDeveloperTokenMutation();

  const handleCopy = () => {
    navigator.clipboard.writeText(token ?? "");
    message.success({
      content: "Токен скопирован в буффер обмена",
      duration: 0.75,
    });
  };

  const handleDeleteToken = async () => {
    const result = await modal.confirm({
      title: "Внимание!",
      content: "Вы точно хотите удалить токен разработчика?",
    });

    if (!result) return;

    await deleteToken();
    resetToken();
    refetch();
  };

  const handleGenerateToken = async () => {
    const result = hasDevToken
      ? await modal.confirm({
          title: "Внимание!",
          content:
            "Вы точно хотите сгенерировать новый токен разработчика? После этого старый токен перестанет работать.",
        })
      : true;

    if (!result) return;

    await genToken();
    refetch();
  };

  return (
    <DeveloperToken
      token={token ?? null}
      hasDevToken={hasDevToken ?? false}
      isGenerateButtonLoading={isTokenFetching}
      isDeleteButtonLoading={isTokenDeleting}
      isTokenLoading={isTokenLoading}
      handleCopy={handleCopy}
      handleGenerateToken={handleGenerateToken}
      handleDeleteToken={handleDeleteToken}
    />
  );
};

export default DeveloperTokenContainer;
