import { FC } from "react";
import UserListSidebar from "@/components/Common/UserListSidebar";
import { useGetUserListQuery } from "@/core/api/users.api";

const UserListSidebarContainer: FC = () => {
  const { data: users } = useGetUserListQuery();

  return <UserListSidebar users={users ?? []} />;
};

export default UserListSidebarContainer;
