import { FC, useState } from "react";
import RecoverEmailForm from "@/components/Auth/RecoverForm/RecoverEmailForm";
import { useForm } from "antd/es/form/Form";
import { IRecoverEmailFields } from "./types";
import { useSendRecoverLetterMutation } from "../api";
import ChangePasswordModal from "@/components/Auth/RecoverForm/ChangePasswordModal";

const RecoverEmailFormContainer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const [form] = useForm<IRecoverEmailFields>();

  const [sendLetter, { isLoading: isLetterSending }] =
    useSendRecoverLetterMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async (values: IRecoverEmailFields) => {
    setEmail(values.email);
    await sendLetter(values);
    handleOpenModal();
    form.resetFields();
  };

  return (
    <>
      <RecoverEmailForm
        form={form}
        loading={isLetterSending}
        onFinish={handleFinish}
      />
      <ChangePasswordModal
        email={email}
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default RecoverEmailFormContainer;
