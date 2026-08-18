"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type UpdateProfileState = {
  success: boolean;
  message: string;
};

export async function updateProfile(
  _previousState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();

  if (name.length < 2) {
    return {
      success: false,
      message: "Informe um nome válido.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Perfil atualizado com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);

    return {
      success: false,
      message: "Não foi possível atualizar o perfil.",
    };
  }
}
