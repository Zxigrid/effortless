import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardCard from '@/Components/Ui/DashboardCard';
import { Bookmark } from 'react-feather';
import BreadCrumbs from '@/Components/Ui/BreadCrumbs';

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Dashboard">
      <Head title="Dashboard" />

      <BreadCrumbs>
        <BreadCrumbs.Disable value={"Dashboard"} />
      </BreadCrumbs>

      <section className="w-full mb-3">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">You're logged in!</div>
        </div>
      </section>

      <section className="flex justify-start">
        <DashboardCard href="#" Icon={Bookmark} title='Total Post' total={0} />
      </section>
    </AuthenticatedLayout>
  );
}
