import { auth } from "@/lib/auth";
import { DashboardPageHeader } from "@/components/dashboard-ui/dashboard-shell";
import {
  SettingsProfileSection,
  SettingsBusinessSection,
  SettingsMediaSection,
} from "./settings-client";

export default async function DashboardSettingsPage() {
  const session = await auth();

  return (
    <main className="grid gap-6 px-6 py-10">
      <DashboardPageHeader
        title="Parametres"
        description="Configuration du profil, de l'entreprise et des medias."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <SettingsProfileSection
          name={session?.user?.name}
          email={session?.user?.email}
          avatarSrc={session?.user?.image}
        />
        <SettingsBusinessSection />
      </div>

      <SettingsMediaSection />
    </main>
  );
}
