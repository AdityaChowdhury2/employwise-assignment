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

const UserRow: FC<{ user: User }> = ({ user }) => {
  const {
    id,
    avatar,
    first_name: firstName,
    last_name: lastName,
    email,
  } = user;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                      value={firstName}
                      {...register("first_Name", { required: true })}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      {...register("last_Name", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Last Name</Label>
                    <Input
                      id="email"
                      value={email}
                      {...register("email", { required: true })}
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => console.log("delete", id)}
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
