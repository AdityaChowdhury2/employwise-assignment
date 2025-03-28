"use client";
import React, { FC, useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import Image from "next/image";
import { User } from "@/interface/User";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

import { deleteUserById } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UserUpdateDialog from "./UserUpdateDialog";
import { removeUser, setUsers } from "@/redux/features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const UserRows: FC<{ users: User[] }> = ({ users }) => {
  const [openDialogUserId, setOpenDialogUserId] = useState<number | null>(null); // Track the open dialog by user ID
  const [loading, setLoading] = useState<boolean>(false);
  // const { register, handleSubmit, reset } = useForm({
  //   defaultValues: {},
  // });
  const dispatch = useDispatch();

  const usersFromStore = useSelector(
    (state: { user: { users: User[] } }) => state.user.users
  );

  useEffect(() => {
    // Dispatch the users to the Redux store
    dispatch(setUsers(users));
  }, [dispatch]);

  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteUserById(id.toString());

      if (!response.ok) {
        throw new Error("Failed to delete user");
        toast.error("Failed to delete user");
      }
      dispatch(removeUser(id)); // Assuming you have a removeUser action in your Redux slice
      toast.success("User deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {usersFromStore.length > 0 ? (
        usersFromStore.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Image
                width={40}
                height={40}
                src={user.avatar}
                alt={`${user.first_name}'s avatar`}
                className="h-10 w-10 rounded-full"
              />
            </TableCell>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <UserUpdateDialog
                  key={user.id}
                  user={user}
                  isEditDialogOpen={openDialogUserId === user.id}
                  setIsEditDialogOpen={(isOpen) =>
                    setOpenDialogUserId(isOpen ? user.id : null)
                  }
                  loading={loading}
                  setLoading={setLoading}
                />
                <Button
                  disabled={loading}
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              <p className="text-gray-500">No users found.</p>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};

export default UserRows;
