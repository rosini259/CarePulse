import { Models } from "node-appwrite";
import { useEffect, useState } from "react";

import { getDoctors } from "@/lib/actions/patient.actions";

import { useToast } from "./use-toast";

export interface IDoctorsListDocument extends Models.Document {
  nameDoctor: string;
  doctorPictureUrl: string;
}

type TDoctorsList = IDoctorsListDocument[] | undefined;

const useDoctorList = () => {
  const [doctors, setDoctors] = useState<TDoctorsList>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await getDoctors();
        setDoctors(response?.documents as TDoctorsList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [toast]);
  return { loading, doctors };
};

export default useDoctorList;
