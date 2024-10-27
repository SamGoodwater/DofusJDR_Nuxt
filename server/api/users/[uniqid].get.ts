import prisma from "../../utils/prisma";
import { handleError } from "~/utils/errorHandler";
import { user } from '@prisma/client'; 

export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event)
    let uniqid = getRouterParams(event).uniqid
    !uniqid ? uniqid : body.uniqid
    
    if(uniqid){
        return await getUserByUniqid(uniqid)

    } else {
        throw handleError("Error", {
            statusCode: 500,
            statusMessage: "Unique ID not provided",
            sendToast: true, // Déclenchement du toast côté client
            toastConfig: {
              title: "Erreur lors de la récupération de l'uniqid.",
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


export async function getUserByUniqid(uniqid: string) : Promise<user | null> {
  return prisma.user.findUnique({
    where: {
      uniqid: uniqid
    }
  }).then((response) => {
    return response
  }).catch((error) => {
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
    })
}