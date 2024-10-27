import prisma from "../../../utils/prisma";
import { handleError } from "../../../utils/errorHandler";
import superjson from "superjson";

export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.product.findMany();
    return superjson.serialize(products).json;
  } catch (error: unknown) {
    throw handleError(error, {
      statusCode: 500,
      statusMessage: "Failed to fetch product",
      sendToast: true, // Déclenchement du toast côté client
      toastConfig: {
        title: "Erreur lors de la récupération du produit",
        description: "Impossible de récupérer le produit.",
        duration: 5000,
        color: "red",
        icon: "i-octicon-alert-24",
      },
    });
  }
});
