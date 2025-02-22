import { FC } from "react";
import { Avatar, Flex, Select, Typography } from "antd";
import { SelectProps } from "antd/lib";
import { useGetUsersOptionsQuery } from "@/core/api";

const UsersSelect: FC<SelectProps> = (props) => {
  const { data: options, isFetching } = useGetUsersOptionsQuery();

  return (
    <Select
      {...props}
      options={options}
      loading={isFetching}
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
