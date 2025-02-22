import { FC } from "react";
import { AutoComplete, Flex, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import { StorageSearcherProps } from "./types";
import styles from "./styles.module.scss";

const StorageSearcher: FC<StorageSearcherProps> = (props) => {
  const [search, { data: options }] = useLazySearchStoragesOptionsQuery();

  const handleSearch: AutoCompleteProps["onSearch"] = debounce((name) => {
    search({ name });
  }, 500);

  return (
    <AutoComplete
      onSearch={handleSearch}
      options={options ?? []}
      optionRender={(option) => (
        <Flex align="center" gap={10}>
          <ProductFilled className={styles["icon"]} />
          <Typography.Text>{option.data.value}</Typography.Text>
        </Flex>
      )}
      allowClear
      {...props}
    />
  );
};

export default StorageSearcher;
