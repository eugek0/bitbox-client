import { FC } from "react";
import { AutoComplete, Flex, Typography } from "antd";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import { StorageSearcherProps } from "./types";
import { ProductFilled } from "@ant-design/icons";

const StorageSearcher: FC<StorageSearcherProps> = (props) => {
  const [search, { data: options }] = useLazySearchStoragesOptionsQuery({
    selectFromResult: (response) => ({
      ...response,
      data: response.data?.map((option) => ({
        ...option,
        label: (
          <Flex align="center" gap={10}>
            <ProductFilled />
            <Typography.Text>{option.value}</Typography.Text>
          </Flex>
        ),
      })),
    }),
  });

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
