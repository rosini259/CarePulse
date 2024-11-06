"use client";
import { useEffect } from "react";

import useAppointmentForm, {
  IAppointmentForm,
} from "@/hooks/useAppointmentForm";
import "react-datepicker/dist/react-datepicker.css";
import { FormFieldType } from "@/types/enums";

import CustomFormField from "../common/CustomFormField";
import DoctorList from "../common/DoctorList";
import SubmitButton from "../common/SubmitButton";
import { Form } from "../ui/form";
import { Toaster } from "../ui/toaster";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
  hyphenatedName,
  primaryPhysician,
}: IAppointmentForm) => {
  const { form, onSubmit, buttonLabel, isLoading } = useAppointmentForm({
    userId,
    hyphenatedName,
    patientId,
    type,
    appointment,
    setOpen,
    primaryPhysician,
  });

  useEffect(() => {
    if (form.getValues("primaryPhysician") === "") {
      form.setValue("primaryPhysician", primaryPhysician!);
    }
  }, [form, primaryPhysician]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <DoctorList
              primaryPhysician={primaryPhysician!}
              form={form}
              label="doctor"
            />

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
      <Toaster />
    </Form>
  );
};
