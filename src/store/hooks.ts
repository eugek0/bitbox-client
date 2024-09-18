import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IRootState } from "./types";

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
