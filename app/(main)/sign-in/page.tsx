import LoginForm from "@/components/auth/login-form";

export default function SignIn() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-semibold">Sign in to access</h1>
      <LoginForm />
    </div>
  );
}
