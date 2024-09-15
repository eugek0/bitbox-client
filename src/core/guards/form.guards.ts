import { IFormException } from "../types";

export const isFormException = (unknown: unknown): unknown is IFormException =>
  typeof (unknown as IFormException).data === "object" &&
  typeof (unknown as IFormException).data.message === "string" &&
  typeof (unknown as IFormException).data.field === "string" &&
  (unknown as IFormException).status === 400;
