import { FC, useState } from "react";
import { AutoComplete, Flex, Typography } from "antd";
import { ProductFilled } from "@ant-design/icons";
import { AutoCompleteProps } from "antd/lib";
import { debounce } from "lodash";
import { useLazySearchStoragesOptionsQuery } from "@/containers/Storages/api";
import { StorageSearcherProps } from "./types";
import styles from "./styles.module.scss";
import { useNavigate } from "@tanstack/react-router";

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
    navigate({ to: `/storage/${option._id}` });
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
