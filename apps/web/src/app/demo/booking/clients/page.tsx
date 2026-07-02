import {
  DEMO_CLIENTS,
  DEMO_INTAKE_FORMS,
  DEMO_INTAKE_ANSWERS,
} from "@/lib/demo-data/booking-demo-data";
import { BookingDemoShell } from "@/components/booking/booking-demo-shell";
import { ClientDirectoryTable } from "@/components/booking/client-directory-table";
import { ClientProfileCard } from "@/components/booking/client-profile-card";
import { IntakeFormPreview } from "@/components/booking/intake-form-preview";
import { ClientNotesPanel } from "@/components/booking/client-notes-panel";
import { ClientSegmentCard } from "@/components/booking/client-segment-card";

const DEMO_CLIENT_NOTES = [
  { id: "note-1", content: "Genou droit fragile — eviter extensions forcees lors des seances.", author: "Marc D.", date: "3 janvier 2025", isInternal: true },
  { id: "note-2", content: "Cliente tres reguliere, inscrite au pack VIP. Preference creneaux 9h-11h.", author: "Sophie R.", date: "15 mars 2025", isInternal: true },
];

const SPOTLIGHT_CLIENT = DEMO_CLIENTS[0]!;
const INTAKE_FORM = DEMO_INTAKE_FORMS[0]!;
const INTAKE_ANSWERS = DEMO_INTAKE_ANSWERS["client-1"];

export default function BookingClientsPage() {
  return (
    <BookingDemoShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Seren Studio &mdash; Demo fictive
            </p>
            <h1 className="mt-1 text-2xl font-bold">Clients</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {DEMO_CLIENTS.length} clients enregistres
            </p>
          </div>
          <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Donnees fictives
          </span>
        </div>

        {/* Segment overview */}
        <ClientSegmentCard clients={DEMO_CLIENTS} className="mb-8" />

        {/* Directory */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Repertoire</h2>
          <ClientDirectoryTable clients={DEMO_CLIENTS} />
        </section>

        {/* Client spotlight */}
        <section className="mb-10">
          <h2 className="mb-4 text-base font-semibold">Profil client &mdash; exemple</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <ClientProfileCard client={SPOTLIGHT_CLIENT} />

            <div className="space-y-4 lg:col-span-2">
              <IntakeFormPreview
                title={INTAKE_FORM.title}
                fields={INTAKE_FORM.fields}
                answers={INTAKE_ANSWERS?.answers ?? {}}
                consentAt={INTAKE_ANSWERS?.consentAt}
              />
              <ClientNotesPanel notes={DEMO_CLIENT_NOTES} />
            </div>
          </div>
        </section>

        {/* Intake forms */}
        <section>
          <h2 className="mb-4 text-base font-semibold">Formulaires d&apos;admission</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {DEMO_INTAKE_FORMS.map((form) => (
              <div key={form.id} className="rounded-xl border bg-card p-5 shadow-sm">
                <p className="font-medium text-sm mb-2">{form.title}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {form.fields.length} champ{form.fields.length > 1 ? "s" : ""} &mdash;
                  Applique a : {form.serviceIds.length} service{form.serviceIds.length > 1 ? "s" : ""}
                </p>
                <div className="space-y-1.5">
                  {form.fields.map((field) => (
                    <div key={field.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                      {field.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </BookingDemoShell>
  );
}
