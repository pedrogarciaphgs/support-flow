"use server";

import bcrypt from "bcryptjs";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type ChangePasswordState = {
  success: boolean;
  message: string;
};

export async function changePassword(
  _previousState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      success: false,
      message: "Preencha todos os campos.",
    };
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      message: "A nova senha deve ter pelo menos 6 caracteres.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      message: "As novas senhas não coincidem.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!passwordMatches) {
      return {
        success: false,
        message: "Senha atual incorreta.",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Senha alterada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao alterar senha:", error);

    return {
      success: false,
      message: "Não foi possível alterar a senha.",
    };
  }
}
