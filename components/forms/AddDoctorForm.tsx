"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AddDoctor } from "@/lib/actions/appointment.actions";
import { AddDoctorSchema } from "@/lib/validation";
import { FormFieldType } from "@/types/enums";

import CustomFormField from "../common/CustomFormField";
import SubmitButton from "../common/SubmitButton";
import { FileUploader } from "../FileUploader";
import { Form, FormControl } from "../ui/form";

const AddDoctorForm = () => {
  const form = useForm<z.infer<typeof AddDoctorSchema>>({
    resolver: zodResolver(AddDoctorSchema),
    defaultValues: {
      nameDoctor: "",
      doctorPictureUrl: [],
    },
  });
  const { handleSubmit, control } = form;
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: typeof AddDoctorSchema._type) => {
    setIsLoading(true);

    // bug dublicated Store file info in form data as
    let formData;
    if (data.doctorPictureUrl && data.doctorPictureUrl?.length > 0) {
      const blobFile = new Blob([data.doctorPictureUrl[0]], {
        type: data.doctorPictureUrl[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", data.doctorPictureUrl[0].name);
    }
    const DoctorDetails = {
      nameDoctor: data.nameDoctor,
      doctorPictureUrl: data.doctorPictureUrl ? formData : undefined,
    };
    const addNewDoctor = await AddDoctor({
      nameDoctor: DoctorDetails.nameDoctor,
      doctorPictureUrl: DoctorDetails.doctorPictureUrl!,
    });
    // console.log("Form Submitted:", DoctorDetails);
    console.log(addNewDoctor)
      setIsLoading(false);
  };
  return (
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
  );
};

export default AddDoctorForm;
