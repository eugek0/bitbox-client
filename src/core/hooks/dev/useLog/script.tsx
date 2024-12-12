import { useEffect } from "react";
import { UseLogType } from "./types";

export const useLog: UseLogType = (subject) => {
  useEffect(() => {
    console.log(subject);
  }, [subject]);
};
