import { FC } from "react";
import RolesSettings from "@/components/Settings/RolesSettings";
import { useChangeRoleMutation, useGetAllUsersQuery } from "@/core/api";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { TRole } from "@/containers/Auth/types";

const RolesSettingsContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const {
    data: users,
    // isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = useGetAllUsersQuery(undefined, {
    selectFromResult: (response) => ({
      ...response,
      data: response.data?.filter(
        (user) => user._id !== profile?._id && !user?.isCreator,
      ),
    }),
  });
  const [changeRole] = useChangeRoleMutation();

  const handleChangeRole = async (userid: string, role: TRole) => {
    await changeRole({ userid, body: { role } });
    refetchUsers();
  };

  return (
    <RolesSettings handleChangeRole={handleChangeRole} users={users ?? []} />
  );
};

export default RolesSettingsContainer;
