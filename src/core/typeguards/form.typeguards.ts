import { IFormException } from "../types";

export const isFormException = (unknown: any): unknown is IFormException =>
  unknown.data &&
  typeof unknown.data === "object" &&
  typeof unknown.data.message === "string" &&
  typeof unknown.data.field === "string" &&
  unknown.status === 400;
