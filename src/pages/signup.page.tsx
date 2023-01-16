import withAuth from "@/components/hoc/withAuth";

export default withAuth(SignupPage, "auth");

function SignupPage() {
  return (
    <div>
      <h1>Signup</h1>
    </div>
  );
}
