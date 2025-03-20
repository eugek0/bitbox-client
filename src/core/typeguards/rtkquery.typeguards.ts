import { IRTKQueryError } from "../types/rtkquery.types";

export const isRTKQueryError = (unknown: any): unknown is IRTKQueryError =>
  unknown && typeof unknown?.status === "number";
