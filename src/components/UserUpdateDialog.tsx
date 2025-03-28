"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { User } from "@/interface/User";
import { toast } from "sonner";
import { updateUserById } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/redux/features/user/UserSlice";

export type UserUpdate = Partial<User>;

const UserUpdateDialog = ({
  user,
  isEditDialogOpen,
  setIsEditDialogOpen,
  loading,
  setLoading,
}: {
  user: User;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  //   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  //   const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const usersFromStore = useSelector(
    (state: { user: { users: User[] } }) => state.user.users
  );

  const onSubmit = async (data: UserUpdate) => {
    try {
      setLoading(true);
      const response = await updateUserById(data, user.id.toString());

      toast.success("User updated successfully");

      const newUsers = usersFromStore.map((u) => {
        if (u.email === user.email) {
          return {
            ...u,
            first_name: data.first_name || u.first_name,
            last_name: data.last_name || u.last_name,
            email: data.email || u.email,
          };
        }
        return u;
      });

      dispatch(setUsers(newUsers)); // Assuming you have a setUsers action in your Redux slice
      reset();
      setIsEditDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      key={user.id}
      open={isEditDialogOpen}
      onOpenChange={setIsEditDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("first_name", {
                required: true,
              })}
            />
          </div>
          <div className="">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("last_name", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="email">Last Name</Label>
            <Input id="email" {...register("email", { required: true })} />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.708L7.291 7.29zm10.585 0a8.001 8.001 0 01-2.583-2.583l2.583 2.583zm-2.583-10.585a8.001 8.001 0 012.583 2.583L14.708 4.708z"
                  ></path>
                </svg>
                Saving Changes
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateDialog;
