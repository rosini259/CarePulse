"use client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const ToasterOnServer = ({ serverAction }: any) => {
  const { toast } = useToast();
  if (!serverAction) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }
  return <Toaster />;
};

export default ToasterOnServer;
