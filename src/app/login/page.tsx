import { redirect } from "next/navigation";
import { TicketCheck } from "lucide-react";

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <TicketCheck size={25} />
          </div>

          <span className="text-2xl font-bold text-slate-900">SupportFlow</span>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Acesse sua conta
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-500">
          <p className="font-semibold text-slate-700">Usuário de teste</p>

          <p>pedro@supportflow.dev</p>
          <p>Senha: 123456</p>
        </div>
      </section>
    </main>
  );
}
