export default defineNuxtRouteMiddleware((to, from) => {
  // Middleware qui écoute les erreurs à chaque navigation
  const toast = useToast();

  // Vérifie si l'erreur existe dans la route (tu peux également utiliser un store)
  if (process.client && to.meta.error && to.meta.toast) {
    const { title, description, duration, color, icon } = to.meta.toast;

    // Affiche la notification de l'erreur
    toast.add({
      id: "error_" + Math.floor(Math.random() * 10000),
      title: title,
      description: description,
      icon: icon,
      color: color,
      timeout: duration,
    });

    // Supprime l'erreur après avoir affiché la notification
    to.meta.error = null;
    to.meta.toast = null;
  }
});
