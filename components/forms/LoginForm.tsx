"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { auth, getPatient } from "@/lib/actions/patient.actions";
import "react-phone-number-input/style.css";
import { convertToHyphenated } from "@/lib/utils";
import { LoginFormValidation } from "@/lib/validation";
import { FormFieldType } from "@/types/enums";

import CustomFormField from "../common/CustomFormField";
import SubmitButton from "../common/SubmitButton";

export const Loginform = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: ILoginUserParams) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        password: values.password,
        name:values.name
      };
      // bug show error if the user not found
      const authUser = await auth(user);
      const patient = await getPatient(authUser?.userId!)
      if (authUser) {
        const name = convertToHyphenated(patient.name) 
        router.push(`/patients/${name}/new-appointment`);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="MohamedSami@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="password"
          placeholder="Ms0123456789#"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
