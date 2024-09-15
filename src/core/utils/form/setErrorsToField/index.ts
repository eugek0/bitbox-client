import { IFormException } from "@/core/types";
import { FormInstance } from "antd";

export const setErrorsToField = (
  form: FormInstance,
  error: IFormException,
): void => {
  form.setFields([{ name: error.data.field, errors: [error.data.message] }]);
};
