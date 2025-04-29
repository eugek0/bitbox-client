import { FC } from "react";
import SecuritySettings from "@/components/Settings/SecuritySettings";
import { useForm } from "antd/es/form/Form";
import { ChangePasswordFormFields } from "@/components/Settings/SecuritySettings/ChangePasswordForm/types";
import { useChangePasswordMutation } from "@/core/api";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { isFormException } from "@/core/typeguards";
import { setErrorsToField } from "@/core/utils";

const SecuritySettingsContainer: FC = () => {
  const [form] = useForm<ChangePasswordFormFields>();

  const profile = useAppSelector(profileSelector);

  const [changePassword, { isLoading: isChanging }] =
    useChangePasswordMutation();

  const handleChangePassword = async (body: ChangePasswordFormFields) => {
    try {
      await changePassword({ userid: profile?._id ?? "", body }).unwrap();
    } catch (error) {
      if (isFormException(error)) {
        setErrorsToField(form, error);
      }
    }
  };

  return (
    <SecuritySettings
      handleChangePassword={handleChangePassword}
      form={form}
      isChanging={isChanging}
    />
  );
};

export default SecuritySettingsContainer;
