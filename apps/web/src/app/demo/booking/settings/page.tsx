import { DEMO_BOOKING_INTEGRATIONS } from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { BookingSettingsCard } from "@/components/booking/booking-settings-card";
import { AutomationTemplateCard } from "@/components/booking/automation-template-card";
import { IntegrationStatusCard } from "@/components/booking/integration-status-card";
import { RolePermissionsCard } from "@/components/booking/role-permissions-card";

const BUSINESS_FIELDS = [
  { label: "Nom de l etablissement", value: "Seren Studio", type: "text" as const },
  { label: "Type d activite",         value: "Studio yoga & bien-etre", type: "text" as const },
  { label: "Adresse",                 value: "12 rue de la Paix, Lyon 69002", type: "text" as const },
  { label: "Timezone",                value: "Europe/Paris", type: "select" as const },
];

const BOOKING_FIELDS = [
  { label: "Reservations en ligne",   value: "true",  type: "toggle" as const },
  { label: "Confirmation manuelle",   value: "false", type: "toggle" as const },
  { label: "Delai minimum reservation", value: "1h avant", type: "text" as const },
  { label: "Delai maximum reservation", value: "90 jours", type: "text" as const },
  { label: "Page de reservation",     value: "seren-studio.zenslot.io", type: "text" as const },
];

const NOTIFICATION_FIELDS = [
  { label: "Nouvelle reservation",        value: "true",  type: "toggle" as const },
  { label: "Annulation client",           value: "true",  type: "toggle" as const },
  { label: "Absence non signalee",        value: "true",  type: "toggle" as const },
  { label: "Nouveau paiement",            value: "false", type: "toggle" as const },
  { label: "Rapport quotidien",           value: "true",  type: "toggle" as const },
];

const REMINDER_TEMPLATES = [
  { id: "r1", name: "Confirmation de reservation", type: "email" as const, trigger: "Apres une nouvelle reservation", delay: "Immediat", status: "active" as const },
  { id: "r2", name: "Rappel J-1",                  type: "email" as const, trigger: "Avant le rendez-vous",          delay: "24h avant", status: "active" as const },
  { id: "r3", name: "Rappel H-1 par SMS",          type: "sms"   as const, trigger: "Avant le rendez-vous",          delay: "1h avant",  status: "active" as const },
  { id: "r4", name: "Suivi post-seance",            type: "email" as const, trigger: "Apres le rendez-vous",          delay: "2h apres",  status: "active" as const },
  { id: "r5", name: "Invitation avis",              type: "email" as const, trigger: "Apres le rendez-vous",          delay: "24h apres", status: "inactive" as const },
];

const ROLES = [
  {
    id: "admin",
    name: "Administrateur",
    members: ["Lea Fontaine"],
    permissions: ["Tableau de bord", "Services", "Clients", "Paiements", "Parametres", "Rapports"],
  },
  {
    id: "staff",
    name: "Personnel",
    members: ["Marc Deschamps", "Sophie Renard", "David Moreau"],
    permissions: ["Calendrier", "Clients (partiel)", "Ses propres reservations"],
  },
];

export default function BookingSettingsPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Parametres</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Configuration de votre espace ZenSlot
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives &mdash; lecture seule
          </span>
        </div>

        {/* Business profile + booking settings */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <BookingSettingsCard
            title="Profil de l etablissement"
            description="Informations publiques de votre entreprise"
            fields={BUSINESS_FIELDS}
          />
          <BookingSettingsCard
            title="Regle de reservation"
            description="Controle des reservations en ligne"
            fields={BOOKING_FIELDS}
          />
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <BookingSettingsCard
            title="Notifications proprietaire"
            description="Alertes envoyees a l equipe admin"
            fields={NOTIFICATION_FIELDS}
          />
        </div>

        {/* Reminders */}
        <section className="mb-8">
          <h2 className="mb-4 text-base font-semibold">Rappels automatiques</h2>
          <AutomationTemplateCard templates={REMINDER_TEMPLATES} />
        </section>

        {/* Integrations */}
        <section className="mb-8">
          <h2 className="mb-4 text-base font-semibold">Integrations</h2>
          <IntegrationStatusCard integrations={DEMO_BOOKING_INTEGRATIONS} />
        </section>

        {/* Roles */}
        <section>
          <h2 className="mb-4 text-base font-semibold">Roles &amp; permissions</h2>
          <RolePermissionsCard roles={ROLES} />
        </section>
      </main>
    </BookingDemoShell>
  );
}
