"use server";

import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createUserSchema } from "@/schemas/user-schema";

export type CreateUserState = {
  success: boolean;
  message: string;
};

export async function createUser(
  _previousState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const parsedData = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message:
        parsedData.error.issues[0]?.message ??
        "Os dados do usuário são inválidos.",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Já existe um usuário cadastrado com esse email.",
      };
    }

    const hashedPassword = await hash(parsedData.data.password, 12);

    await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
        role: parsedData.data.role,
      },
    });

    revalidatePath("/users");

    return {
      success: true,
      message: "Usuário criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return {
      success: false,
      message: "Não foi possível criar o usuário.",
    };
  }
}
