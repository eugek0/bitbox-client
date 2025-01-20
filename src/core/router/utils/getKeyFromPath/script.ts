import { PATH_KEYS_DICTIONARY } from "@/core/constants";
import { Nullable } from "@/core/types";

export const getKeyFromPath = (path: string): Nullable<string> => {
  return PATH_KEYS_DICTIONARY[path];
};
