import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoginformDefaultValues } from "@/constants";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { convertToHyphenated, storeFileInfoAsFormdata } from "@/lib/utils";
import { RegisterFormValidation } from "@/lib/validation";

import { useToast } from "./use-toast";

const useRegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      ...LoginformDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    setIsLoading(true);
    const formData = storeFileInfoAsFormdata(values.identificationDocument!);
    const createNewUser = await createUser({
      email: values.email,
      password: values.password,
      name:values.name
    });
    const userId = createNewUser.$id as string
    try {
      const patient = {
        userId,
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
      };
      const newPatient = await registerPatient(patient);
      if (newPatient) {
        const name = convertToHyphenated(newPatient.name)
        router.push(`/patients/${name}/new-appointment`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }finally{
      setIsLoading(false);
    }
  };
  return {form,onSubmit,isLoading};
};

export default useRegisterForm;
