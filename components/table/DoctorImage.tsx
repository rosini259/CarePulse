import Image from "next/image";
import { useEffect, useState } from "react";

import { getDoctorImageByName } from "@/lib/actions/appointment.actions";

const DoctorImage = ({ doctorName }:{doctorName:string}) => {
  const [doctorImage, setDoctorImage] = useState("");

  useEffect(() => {
    const fetchDoctorImage = async () => {
      try {
        const image = await getDoctorImageByName(doctorName);
        setDoctorImage(image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctorImage();
  }, [doctorName]);

  return doctorImage ? (
    <Image
      src={doctorImage}
      alt="doctor"
      width={100}
      height={100}
      className="size-8"
    />
  ) : (
    <div>Loading...</div>
  );
};

export default DoctorImage;
