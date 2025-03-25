import { createContext } from "react";
import { TStorageContext } from "./types";
import { Nullable } from "@/core/types";

export const StorageContext = createContext<Nullable<TStorageContext>>(null);
