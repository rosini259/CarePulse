import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

import { SelectItem } from "@/components/ui/select";
import useDoctorList from "@/hooks/useDoctorList";
import { FormFieldType } from "@/types/enums";

import CustomFormField from "./CustomFormField";

const DoctorList = ({
  primaryPhysician,
  form,
  label,
}: {
  form: UseFormReturn<any>;
  primaryPhysician?: string;
  label:string
}) => {
  const { doctors, loading } = useDoctorList();
  return (
    <CustomFormField
      fieldType={FormFieldType.SELECT}
      control={form.control}
      name="primaryPhysician"
      label={label}
      placeholder="Select a doctor"
      value={primaryPhysician}
    >
      {loading && <div>Loading...</div>}
      {!loading &&
        doctors?.map((doctor, i) => (
          <SelectItem key={doctor.nameDoctor + i} value={doctor.nameDoctor}>
            <div className="flex cursor-pointer items-center gap-2">
              <Image
                src={doctor.doctorPictureUrl}
                width={32}
                height={32}
                alt="doctor"
                className="size-9 rounded-full border border-dark-500 "
              />
              <p>{doctor.nameDoctor}</p>
            </div>
          </SelectItem>
        ))}
    </CustomFormField>
  );
};

export default DoctorList;
