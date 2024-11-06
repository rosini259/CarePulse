import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { getPatient, getUserIdByName } from "@/lib/actions/patient.actions";
import { convertToSpaceSeparated } from "@/lib/utils";

const Appointment = async ({
  params: { hyphenatedName },
}: SearchParamProps) => {
  const { toast } = useToast();
  const userId = await getUserIdByName(
    convertToSpaceSeparated(hyphenatedName)!
  );
  const patient = await getPatient(userId!).catch((error) => {
    console.log(error);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  });
  return (
    <>
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />

            <AppointmentForm
              patientId={patient?.$id}
              hyphenatedName={hyphenatedName!}
              userId={userId!}
              type="create"
              primaryPhysician={patient.primaryPhysician}
            />

            <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
          </div>
        </section>

        <Image
          src="/assets/images/appointment-img.jpg"
          height={1500}
          width={1500}
          alt="appointment"
          className="side-img max-w-[390px] bg-bottom"
          priority
        />
      </div>
      <Toaster />
    </>
  );
};

export default Appointment;
