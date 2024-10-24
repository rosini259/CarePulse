"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddDoctorForm from "./forms/AddDoctorForm";
import { Button } from "./ui/button";

// bug after submit we need to close the modal
const AddDoctorButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-green-500"
        >
          add doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">

        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize tracking-wider">
            Add Name And Picture Of Doctor
          </DialogTitle>
        </DialogHeader>

        <AddDoctorForm setOpenModal={setOpenModal}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorButton;
