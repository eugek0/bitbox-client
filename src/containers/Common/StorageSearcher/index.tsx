import { FC } from "react";
import { AutoComplete, Flex, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import { StorageSearcherProps } from "./types";
import styles from "./styles.module.scss";
import { useNavigate } from "@tanstack/react-router";

const StorageSearcher: FC<StorageSearcherProps> = (props) => {
  const navigate = useNavigate();

  const [search, { data: options }] = useLazySearchStoragesOptionsQuery();

  const handleSearch: AutoCompleteProps["onSearch"] = debounce((name) => {
    search({ name });
  }, 500);

  const handleSelect: AutoCompleteProps["onSelect"] = (_: string, option) => {
    navigate({ to: `/storage/${option._id}` });
  };

  return (
    <AutoComplete
      onSearch={handleSearch}
      onSelect={handleSelect}
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
