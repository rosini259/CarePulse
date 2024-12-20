import Image from "next/image";
import Link from "next/link";

import AddDoctorButton from "@/components/AddDoctorButton";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import ToasterOnServer from "@/components/ToasterOnServer";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList().catch((error) => {
    console.error(error);
  });
  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="size-auto w-fit max-sm:w-4/5"
            />
          </Link>

          <p className="font-semibold max-sm:text-sm">
            Admin Dashboard
          </p>
        </header>

        <main className="admin-main">
          <section className="flex w-full justify-between space-y-4">
            <div>
              <h1 className="header">Welcome 👋</h1>
              <p className="text-dark-700">
                Start the day with managing new appointments
              </p>
            </div>
            <AddDoctorButton />
          </section>

          <section className="admin-stat">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon={"/assets/icons/appointments.svg"}
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon={"/assets/icons/pending.svg"}
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon={"/assets/icons/cancelled.svg"}
            />
          </section>

          <DataTable columns={columns} data={appointments.documents} />
        </main>
      </div>
      <ToasterOnServer serverAction={appointments} />
    </>
  );
};

export default AdminPage;
