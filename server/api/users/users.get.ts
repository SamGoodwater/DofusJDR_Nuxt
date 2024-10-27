import prisma from "../../utils/prisma";
import { handleError } from "~/utils/errorHandler";
import { user } from "@prisma/client"; 
import { User } from "~/models/user";


export default defineEventHandler(async (event) => {
  try {
    return await getUsers()

  } catch (error: unknown) {
    throw handleError(error, {
      statusCode: 500,
      statusMessage: "Failed to fetch users",
      sendToast: true, // Déclenchement du toast côté client
      toastConfig: {
        title: "Erreur lors de la récupération des l'utilisateurs·trices",
        description: "Impossible de récupérer les utilisateurs·trices.",
        duration: 5000,
        color: "red",
        icon: "i-octicon-alert-24",
      },
    });
  }
});

export async function getUsers() : Promise<User[] | null> {
  const usersFromDb = await prisma.user.findMany()
  .then((response) => {
    for (let i = 0; i < response.length; i++) {
      response[i] = new User(response[i]);
    }
    return response
    
  }).catch((error) => {
    throw handleError(error, {
      statusCode: 500,
      statusMessage: "Failed to fetch users",
      sendToast: true, // Déclenchement du toast côté client
      toastConfig: {
        title: "Erreur lors de la récupération des l'utilisateurs·trices",
        description: "Impossible de récupérer les utilisateurs·trices.",
        duration: 5000,
        color: "red",
        icon: "i-octicon-alert-24",
      },
    });
  })

  return usersFromDb.map(user => new User({
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
    hash: user.hash,
  }));
}