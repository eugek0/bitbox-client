import { FC, useState } from "react";
import { AutoComplete, Flex, Typography } from "antd";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import {
  StorageSearcherProps,
  StorageSearcherType,
  StorageSearcherVariants,
} from "./types";
import { useNavigate } from "@tanstack/react-router";
import { STORAGE_SEARCHER_TYPE_ICONS } from "./constants";
import { FileAddFilled } from "@ant-design/icons";

const StorageSearcher: FC<StorageSearcherProps> = (props) => {
  const [value, setValue] = useState<string>("");

  const navigate = useNavigate();

  const [search, { data: options }] = useLazySearchStoragesOptionsQuery();

  const handleChange: AutoCompleteProps["onChange"] = (value) => {
    setValue(value);
  };

  const handleSearch: AutoCompleteProps["onSearch"] = debounce((name) => {
    search({ name });
  }, 500);

  const handleSelect: AutoCompleteProps["onSelect"] = (_: string, option) => {
    const variants: StorageSearcherVariants = {
      storage: [`/storage/${option.value}`],
      directory: [
        `/storage/${option.storage}`,
        { parent: option.value as string },
      ],
      file: [
        `/storage/${option.storage}`,
        {
          parent: option.parent ?? undefined,
          entityid: option.value as string,
        },
      ],
    };

    navigate({
      to: variants[option.type as StorageSearcherType][0],
      search: variants[option.type as StorageSearcherType][1],
    });
    setValue("");
  };

  return (
    <AutoComplete
      value={value}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onChange={handleChange}
      options={options ?? []}
      optionRender={(option) => (
        <Flex align="center" gap={10}>
          {STORAGE_SEARCHER_TYPE_ICONS[
            option.data.extension ?? (option.data.type as StorageSearcherType)
          ] ?? <FileAddFilled />}
          <Typography.Text>{option.data.label}</Typography.Text>
        </Flex>
      )}
      allowClear
      {...props}
    />
  );
};

export default StorageSearcher;
