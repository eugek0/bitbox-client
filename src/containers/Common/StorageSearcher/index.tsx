import { FC } from "react";
import { AutoComplete } from "antd";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import { StorageSearcherProps } from "./types";

const StorageSearcher: FC<StorageSearcherProps> = (props) => {
  const [search, { data: options }] = useLazySearchStoragesOptionsQuery();

  const handleSearch: AutoCompleteProps["onSearch"] = debounce((name) => {
    search({ name });
  }, 500);

  return (
    <AutoComplete
      onSearch={handleSearch}
      options={options ?? []}
      allowClear
      {...props}
    />
  );
};

export default StorageSearcher;
