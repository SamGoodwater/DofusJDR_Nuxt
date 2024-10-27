import prisma from "../../utils/prisma";
import { handleError } from "~/utils/errorHandler";
import bcrypt from 'bcrypt';
import uniqid from "~/utils/uniqid";
import { user } from '@prisma/client'; 

export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event)

    if(body.pseudo, body.email, body.password){
        return await createUserByUniqid(body.pseudo, body.email, body.password)

    } else {
        throw handleError("Error", {
            statusCode: 500,
            statusMessage: "Unique ID not provided",
            sendToast: true, // Déclenchement du toast côté client
            toastConfig: {
              title: "Erreur lors de la récupération de l'uniqid",
              description: "Impossible de récupérer l'uniqid.",
              duration: 5000,
              color: "red",
              icon: "i-octicon-alert-24",
            } 
        });
    }
    
  } catch (error: unknown) {
    throw handleError(error, {
      statusCode: 500,
      statusMessage: "Failed to fetch user",
      sendToast: true, // Déclenchement du toast côté client
      toastConfig: {
        title: "Erreur lors de la récupération de l'utilisateur·trice",
        description: "Impossible de récupérer l'utilisateur·trice.",
        duration: 5000,
        color: "red",
        icon: "i-octicon-alert-24",
      },
    });
  }
});

export async function createUserByUniqid(pseudo: string, email: string, password: string) : Promise<user | null> {
  let hash = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      uniqid: uniqid(),
      pseudo: pseudo,
      email: email,
      hash: hash,
      role: "user"
    }

  }).then((response) => {
    return response

  }).catch((error) => {
    throw handleError(error, {
      statusCode: 500,
      statusMessage: "Failed to create user",
      sendToast: true, // Déclenchement du toast côté client
      toastConfig: {
        title: "Erreur lors de la création de l'utilisateur·trice",
        description: "Impossible de créer l'utilisateur·trice.",
        duration: 5000,
        color: "red",
        icon: "i-octicon-alert-24",
      },
    });
  })
}