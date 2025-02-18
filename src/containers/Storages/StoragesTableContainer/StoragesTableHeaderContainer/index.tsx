import { FC } from "react";
import StoragesTableHeader from "@/components/Storages/StoragesTable/StoragesTableHeader";
import { StoragesTableHeaderContainerProps } from "./types";

const StoragesTableHeaderContainer: FC<StoragesTableHeaderContainerProps> = (
  props,
) => {
  return <StoragesTableHeader {...props} />;
};

export default StoragesTableHeaderContainer;
