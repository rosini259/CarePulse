/* eslint-disable no-unused-vars */
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface ILoginUserParams {
  email: string;
  password: string;
  name?:string
}
declare interface User extends ILoginUserParams {
  name: string | undefined;
  phone: string | undefined;
  $id: string;
}

declare interface RegisterUserParams extends ILoginUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone?: string;
  appointment: Appointment;
  type: string;
};

declare interface ICustomFormField {
  control: Control<any>;
  name: string;
  label?: string;
  fieldType: FormFieldType; // get this type out of here it need to import control and formfieldtype
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
  showTimeSelect?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  dateFormat?: string;
  value?:string
}

interface IAddDoctorFormProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};