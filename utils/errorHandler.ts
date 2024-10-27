import { H3Error, createError } from "h3";

interface ErrorHandlerOptions {
  statusCode?: number;
  statusMessage?: string;
  logError?: boolean;
  sendToast?: boolean;
  toastConfig?: {
    title: string;
    description: string;
    duration: number;
    color: string;
    icon: string;
  };
}

export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): H3Error {
  const {
    statusCode = 500,
    statusMessage = "Internal Server Error",
    logError = true,
    sendToast = false,
    toastConfig = {
      title: "Erreur inconnue.",
      description: "",
      duration: 5000,
      color: "red",
      icon: "i-octicon-alert-24",
    },
  } = options;

  // Journaliser l'erreur si spécifié
  if (logError) {
    console.error("Error:", error);
  }

  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";

  // Ajouter les informations de toast à la réponse pour qu'elles puissent être utilisées côté client
  const toastPayload = sendToast
    ? {
        title: toastConfig.title || statusMessage,
        description: toastConfig.description,
        duration: toastConfig.duration,
        color: toastConfig.color,
        icon: toastConfig.icon,
      }
    : null;

  return createError({
    statusCode,
    statusMessage,
    data: {
      message: errorMessage,
      toast: toastPayload, // Ajout de la configuration de toast dans la réponse
    },
  });
}
