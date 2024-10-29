import { Models } from "node-appwrite";
import { useEffect, useState } from "react";

import { getDoctors } from "@/lib/actions/patient.actions";

export interface IDoctorsListDocument extends Models.Document {
  nameDoctor: string;
  doctorPictureUrl: string;
}

type TDoctorsList = IDoctorsListDocument[] | undefined;

const useDoctorList = () => {
  const [doctors, setDoctors] = useState<TDoctorsList>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await getDoctors();
        setDoctors(response?.documents as TDoctorsList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);
  return { loading, doctors };
};

export default useDoctorList;
