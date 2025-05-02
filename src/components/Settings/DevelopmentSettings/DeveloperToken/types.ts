import { Nullable } from "@/core/types";
import { MouseEventHandler } from "react";

export interface DeveloperTokenProps {
  token: Nullable<string>;
  hasDevToken: boolean;
  isGenerateButtonLoading?: boolean;
  isDeleteButtonLoading?: boolean;
  isTokenLoading?: boolean;
  handleCopy: MouseEventHandler<HTMLButtonElement>;
  handleGenerateToken: MouseEventHandler<HTMLButtonElement>;
  handleDeleteToken: MouseEventHandler<HTMLButtonElement>;
}
