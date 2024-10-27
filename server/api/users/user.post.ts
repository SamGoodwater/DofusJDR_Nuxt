import prisma from "../../utils/prisma";
import { handleError } from "~/utils/errorHandler";
import {getUserByUniqid} from "./[uniqid].get";
import { user } from "@prisma/client";
import { User } from "~/models/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (body.uniqid) {
      let pseudo : string | null = body.pseudo ? body.pseudo : null;
      let email : string | null = body.email ? body.email : null;
      let role : "user" | "moderator" | "admin" | null = body.role ? body.role : null;
      let hash : string | null = null;
      let password : string | null = null;
      if (body.password && body.repeatpassword) {
        if (body.password === body.repeatpassword) {
          password = body.password;
        } else {
          throw handleError("Error", {
            statusCode: 500,
            statusMessage: "Passwords don't match",
            sendToast: true, // Déclenchement du toast côté client
            toastConfig: {
              title: "Erreur lors de la récupération des mots de passe",
              description: "Les mots de passe ne correspondent pas.",
              duration: 5000,
              color: "red",
              icon: "i-octicon-alert-24",
            },
          });
        }
      }

      return await updateUserByUniqid(body.uniqid, {
        pseudo: pseudo,
        email: email,
        role: role,
        hash: hash,
      });

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
        },
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

export async function updateUserByUniqid(
  uniqid: string,
  {
    pseudo,
    email,
    role,
    hash,
  }: {
    pseudo: string | null;
    email: string | null;
    role: "user" | "moderator" | "admin" | null;
    hash: string | null;
  }
): Promise<user | null> {
  let newpeudo : string | null = null;
  let newemail : string | null = null;
  let newrole : string | null = null;
  let newhash : string | null = null;

  let oldUser = await getUserByUniqid(uniqid);

  if(!oldUser){
    throw handleError("Error", {
      statusCode: 500,
      statusMessage: "User not found",
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

  if (pseudo && pseudo !== oldUser.pseudo && pseudo !== "") {
    newpeudo = pseudo;
  } else {
    newpeudo = oldUser.pseudo;
  }

  if (email && email !== oldUser.email && email !== "") {
    newemail = email;
  } else {
    newemail = oldUser.email;
  }

  if (role && role !== oldUser.role && role.match(/user|moderator|admin|/)) {
    newrole = role;
  } else {
    newrole = oldUser.role;
  }

  if (hash && hash !== oldUser.hash && hash !== "") {
    newhash = hash;
  } else {
    newhash = oldUser.hash;
  }

  return prisma.user
    .update({
      where: {
        uniqid: uniqid,
      },
      data: {
        pseudo: newpeudo,
        email: newemail,
        role: newrole,
        hash: newhash,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw handleError(error, {
        statusCode: 500,
        statusMessage: "Failed to update user",
        sendToast: true, // Déclenchement du toast côté client
        toastConfig: {
          title: "Erreur lors de la mise à jour de l'utilisateur·trice",
          description: "Impossible de mettre à jour l'utilisateur·trice.",
          duration: 5000,
          color: "red",
          icon: "i-octicon-alert-24",
        },
      });
    });
}
