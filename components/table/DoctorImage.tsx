import Image from "next/image";
import { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { getDoctorImageByName } from "@/lib/actions/appointment.actions";

import { Toaster } from "../ui/toaster";

const DoctorImage = ({ doctorName }: { doctorName: string }) => {
  const [doctorImage, setDoctorImage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctorImage = async () => {
      try {
        const image = await getDoctorImageByName(doctorName);
        setDoctorImage(image!);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    };

    fetchDoctorImage();
  }, [doctorName, toast]);

  return doctorImage ? (
    <Image
      src={doctorImage}
      alt="doctor"
      width={100}
      height={100}
      className="size-8"
    />
  ) : (
    <>
      <div>Loading...</div>
      <Toaster />
    </>
  );
};

export default DoctorImage;
