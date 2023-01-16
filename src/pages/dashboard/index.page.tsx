import withAuth from "@/components/hoc/withAuth";
import DashboardLayoutAdmin from "@/layouts/dashboard/DashboardLayoutAdmin";

/**
 * Short
 *
 */

export default withAuth(AdminPage, ["login_user.store"]);

function AdminPage() {
  return (
    <DashboardLayoutAdmin>
      <h1>Admin Page</h1>
    </DashboardLayoutAdmin>
  );
}
