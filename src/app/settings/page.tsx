import { redirect } from "next/navigation";
import { User, Shield, Settings2 } from "lucide-react";

import { auth } from "@/auth";
import { Sidebar } from "@/components/layout/sidebar";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar
        user={{
          name: session.user.name ?? "Usuário",
          role: session.user.role,
        }}
      />

      <section className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>

            <p className="text-sm text-slate-500">
              Gerencie suas preferências e configurações
            </p>
          </div>
        </header>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">Minha conta</h2>

                  <p className="text-sm text-slate-500">
                    Informações do usuário autenticado
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-500">Nome</span>
                  <p className="font-medium text-slate-900">
                    {session.user.name ?? "Não informado"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500">E-mail</span>
                  <p className="font-medium text-slate-900">
                    {session.user.email ?? "Não informado"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500">Perfil</span>
                  <p className="font-medium text-slate-900">
                    {session.user.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <Settings2 size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">Preferências</h2>

                  <p className="text-sm text-slate-500">
                    Preferências pessoais do sistema
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Em breve você poderá alterar suas preferências por aqui.
              </p>
            </div>

            {isAdmin && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-red-100 p-3 text-red-600">
                    <Shield size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Administração do sistema
                    </h2>

                    <p className="text-sm text-slate-500">
                      Configurações disponíveis apenas para administradores
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  Aqui podemos adicionar futuramente categorias, prioridades,
                  regras de atendimento e outras configurações.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
