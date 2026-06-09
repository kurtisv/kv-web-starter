const fr = {
  app: {
    name: "KV Web Starter",
    tagline: "Base modulaire premium pour sites marketing, booking et SaaS/API.",
  },
  nav: {
    services: "Services",
    pricing: "Tarifs",
    booking: "Reservation",
    api: "API",
    docs: "Docs",
    contact: "Contact",
    dashboard: "Dashboard",
  },
  booking: {
    title: "Reservation claire pour services, staff et disponibilites.",
    updateAvailability: "Mettre a jour les disponibilites",
    requestBooking: "Demander une reservation",
  },
  Dashboard: {
    nav: {
      ariaLabel: "Navigation principale",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      overview: "Vue d'ensemble",
      bookings: "Reservations",
      availability: "Disponibilites",
      services: "Services",
      staff: "Equipe",
      customers: "Clients",
      apiKeys: "Cles API",
      apiUsage: "Usage API",
      billing: "Facturation",
      settings: "Parametres",
    },
    header: {
      admin: "Admin",
      signOut: "Deconnexion",
    },
    overview: {
      title: "Centre de controle",
    },
    stats: {
      todayBookings: "Reservations aujourd'hui",
      monthlyRevenue: "Revenus du mois",
      monthlyRequests: "Requetes API du mois",
      activeSubscriptions: "Abonnements actifs",
    },
  },
  Auth: {
    login: {
      title: "Connexion",
      description: "Acces administrateur.",
      withGitHub: "Se connecter avec GitHub",
      or: "ou",
      email: "Email",
      password: "Mot de passe",
      submit: "Se connecter",
      submitting: "Connexion...",
      error: "Identifiants invalides.",
      noMethod:
        "Aucune methode de connexion configuree.",
    },
    signOut: "Deconnexion",
  },
  Billing: {
    title: "Facturation",
    description: "Gerer votre abonnement et vos paiements.",
    portal: {
      open: "Ouvrir le portail client",
    },
  },
  Common: {
    loading: "Chargement...",
    error: "Une erreur est survenue.",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    create: "Creer",
    confirm: "Confirmer",
    back: "Retour",
    next: "Suivant",
    noResults: "Aucun resultat.",
    copyNow: "Copiez maintenant",
  },
  Errors: {
    notFound: "Page non trouvee.",
    forbidden: "Acces refuse.",
    serverError: "Erreur serveur. Veuillez reessayer.",
    invalidForm: "Formulaire invalide. Verifiez les champs.",
    unauthorized: "Vous devez etre connecte pour acceder a cette page.",
  },
} as const;

export default fr;
