import { PrismaClient, User } from "@prisma/client";

export const getAllUsers = async (): Promise<User[]> => {
  const prisma = new PrismaClient();
  const allUsers = await prisma.user.findMany().catch((e) => {
    throw e;
  });

  return allUsers;
};

export interface IRegisterUser {
  name: string;
  email: string;
  bio: string;
  initialPostTitle: string;
}

export const registerUser = async (props: IRegisterUser): Promise<void> => {
  const { name, email, bio, initialPostTitle } = props;
  const prisma = new PrismaClient();
  await prisma.user
    .create({
      data: {
        name,
        email,
        profile: {
          create: {
            bio,
          },
        },
        posts: {
          create: {
            title: initialPostTitle,
          },
        },
      },
    })
    .catch((e) => {
      throw e;
    });
};
