import { FC, useEffect, useState } from "react";
import { Avatar, Flex, Select, Tag, Typography } from "antd";
import { SelectProps } from "antd/lib";
import { useGetUsersOptionsQuery } from "@/core/api";
import { useAppSelector } from "@/store";
import { profileIdSelector } from "@/containers/Auth/selectors";
import { Nullable } from "@/core/types";
import styles from "./styles.module.scss";

const UsersSelect: FC<SelectProps> = (props) => {
  const [avatars, setAvatars] =
    useState<Nullable<Record<string, string>>>(null);

  const id = useAppSelector(profileIdSelector);

  const { data: options, isFetching } = useGetUsersOptionsQuery();

  useEffect(() => {
    setAvatars(
      options?.reduce(
        (accumulator, option) => ({
          ...accumulator,
          [option.value as string]: option.avatar,
        }),
        {},
      ) as Record<string, string>,
    );
  }, [options]);

  return (
    <Select
      {...props}
      options={options?.filter((option) => option.value !== id) ?? []}
      loading={isFetching}
      tagRender={(option) => (
        <Tag className={styles["tag"]} bordered={false}>
          {avatars?.[option.value] && (
            <Avatar
              className={styles["avatar"]}
              size="small"
              src={avatars[option.value]}
            />
          )}
          {option.label}
        </Tag>
      )}
      optionRender={(option) => (
        <Flex align="center" gap={10}>
          <Avatar src={option.data.avatar} size="small" />
          <Typography.Text>{option.data.label}</Typography.Text>
        </Flex>
      )}
    />
  );
};

export default UsersSelect;
