"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { AddDoctor } from "@/lib/actions/appointment.actions";
import { storeFileInfoAsFormdata } from "@/lib/utils";
import { AddDoctorSchema } from "@/lib/validation";
import { FormFieldType } from "@/types/enums";

import CustomFormField from "../common/CustomFormField";
import SubmitButton from "../common/SubmitButton";
import { FileUploader } from "../FileUploader";
import { Form, FormControl } from "../ui/form";
import { Toaster } from "../ui/toaster";

const AddDoctorForm = ({ setOpenModal }: IAddDoctorFormProps) => {
  const form = useForm<z.infer<typeof AddDoctorSchema>>({
    resolver: zodResolver(AddDoctorSchema),
    defaultValues: {
      nameDoctor: "",
      doctorPictureUrl: [],
    },
  });
  const { handleSubmit, control } = form;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: typeof AddDoctorSchema._type) => {
    try {
      setIsLoading(true);
      const formData = storeFileInfoAsFormdata(data.doctorPictureUrl!);
      const DoctorDetails = {
        nameDoctor: data.nameDoctor,
        doctorPictureUrl: data.doctorPictureUrl ? formData : undefined,
      };
      await AddDoctor({
        nameDoctor: DoctorDetails.nameDoctor,
        doctorPictureUrl: DoctorDetails.doctorPictureUrl!,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <CustomFormField
            control={control}
            name="nameDoctor"
            label="name doctor"
            fieldType={FormFieldType.INPUT}
            placeholder="dr/mohamed sami"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={control}
            name="doctorPictureUrl"
            label="doctor picture"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
          <SubmitButton isLoading={isLoading}>Add</SubmitButton>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default AddDoctorForm;
