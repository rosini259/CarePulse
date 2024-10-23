import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoginformDefaultValues } from "@/constants";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { convertToHyphenated } from "@/lib/utils";
import { RegisterFormValidation } from "@/lib/validation";

const useRegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      ...LoginformDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    setIsLoading(true);

    // bug dublicated Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    const createNewUser = await createUser({
      email: values.email,
      password: values.password,
      name:values.name
    });
    const userId = createNewUser.$id;
    try {
      const patient = {
        userId, // bug user id have type any
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
    }

    setIsLoading(false);
  };
  return {form,onSubmit,isLoading};
};

export default useRegisterForm;
