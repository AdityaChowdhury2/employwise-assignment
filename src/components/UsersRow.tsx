"use client";
import React, { FC, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import Image from "next/image";
import { User } from "@/interface/User";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { deleteUserById, updateUserById } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserUpdate = Partial<User>;

const UserRow: FC<{ user: User }> = ({ user }) => {
  const {
    id,
    avatar,
    first_name: firstName,
    last_name: lastName,
    email,
  } = user;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_Name: firstName,
      last_Name: lastName,
      email: email,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: UserUpdate) => {
    try {
      setLoading(true);
      const response = await updateUserById(data, id.toString());
      console.log(response);
      toast.success("User updated successfully");
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteUserById(id.toString());
      console.log(response);
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
      <TableRow key={id}>
        <TableCell>
          <Image
            width={40}
            height={40}
            src={avatar}
            alt={`${firstName}'s avatar`}
            className="h-10 w-10 rounded-full"
          />
        </TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell>{lastName}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                      {...register("first_Name", { required: true })}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("last_Name", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Last Name</Label>
                    <Input
                      id="email"
                      {...register("email", { required: true })}
                    />
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
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
