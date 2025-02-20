import { createContext } from "react";
import { IStorageTableContext } from "./types";

const StorageTableContext = createContext<IStorageTableContext | null>(null);

export default StorageTableContext;
