import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation du service KV Web Starter.",
};

const lastUpdated = "1er juin 2026";
const appName = "KV Web Starter";
const contactEmail = "legal@exemple.com";

export default function TermsPage() {
  return (
    <MarketingPageShell>
      <Section className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Conditions d&apos;utilisation</h1>
        <p className="mt-2 text-sm text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>

        <div className="prose prose-sm mt-10 max-w-none text-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-medium [&_p]:mt-4 [&_p]:leading-7 [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-1.5 [&_li]:flex [&_li]:gap-2 [&_li]:text-sm [&_li]:text-muted-foreground">

          <p>
            En utilisant {appName} (&ldquo;le Service&rdquo;), vous acceptez les présentes conditions.
            Si vous n&apos;acceptez pas ces conditions, ne pas utiliser le Service.
          </p>

          <h2>1. Description du service</h2>
          <p>
            {appName} est une plateforme web offrant des fonctionnalités de prise de rendez-vous,
            de gestion d&apos;abonnements et d&apos;acces API. Le Service est fourni &ldquo;tel quel&rdquo;
            avec les fonctionnalités disponibles au moment de votre souscription.
          </p>

          <h2>2. Compte utilisateur</h2>
          <ul>
            <li><span>Vous devez fournir des informations exactes lors de la création de votre compte</span></li>
            <li><span>Vous etes responsable de la confidentialité de vos identifiants</span></li>
            <li><span>Vous devez nous notifier immédiatement de toute utilisation non autorisee de votre compte</span></li>
            <li><span>Un compte par personne physique ou entite juridique</span></li>
          </ul>

          <h2>3. Utilisation acceptable</h2>
          <p>Vous vous engagez a ne pas utiliser le Service pour :</p>
          <ul>
            <li><span>Violer des lois ou reglements applicables</span></li>
            <li><span>Porter atteinte aux droits d&apos;autrui</span></li>
            <li><span>Diffuser des contenus illicites, menaçants ou diffamatoires</span></li>
            <li><span>Tenter d&apos;acceder a des parties non autorisees du Service</span></li>
            <li><span>Soumettre le Service a une charge excessive (DDoS, scraping abusif)</span></li>
          </ul>

          <h2>4. Abonnements et paiements</h2>
          <p>
            Les abonnements payants sont factures en avance sur une base mensuelle.
            Les tarifs sont en EUR et peuvent changer avec un préavis de 30 jours.
            Aucun remboursement pour les périodes partiellement utilisees, sauf obligation legale.
          </p>
          <p>
            En cas de non-paiement, le compte est suspendu apres une periode de grace de 7 jours.
            Les donnees sont conservees 30 jours apres suspension avant suppression définitive.
          </p>

          <h2>5. Propriete intellectuelle</h2>
          <p>
            Le Service, son code, son design et son contenu sont la propriete de {appName}.
            Votre utilisation du Service ne vous confere aucun droit de propriete sur ces éléments.
          </p>
          <p>
            Vous conservez la propriete intégrale de vos donnees (reservations, clients, contenu).
            En cas de fermeture de compte, vous pouvez exporter vos donnees dans les 30 jours.
          </p>

          <h2>6. clés API</h2>
          <p>
            Vos clés API sont strictement personnelles. Vous etes responsable de tout usage
            effectue avec vos clés, qu&apos;il soit autorise ou non.
            Toute cle compromise doit etre révoquée immédiatement depuis le dashboard.
          </p>

          <h2>7. Disponibilite et maintenance</h2>
          <p>
            Nous visons une disponibilite de 99,9 % mais ne garantissons pas un acces ininterrompu.
            Des maintenances planifiées sont annoncées 48 heures a l&apos;avance par email.
            Aucun remboursement pour les interruptions de moins de 4 heures par mois.
          </p>

          <h2>8. Limitation de responsabilite</h2>
          <p>
            Dans les limites permises par la loi, {appName} ne peut etre tenu responsable
            des dommages indirects, accessoires, speciaux ou consequents resultant de votre
            utilisation du Service. Notre responsabilite totale est limitee aux montants
            payes dans les 12 mois précédant l&apos;événement.
          </p>

          <h2>9. Resiliation</h2>
          <p>
            Vous pouvez résilier votre compte a tout moment depuis les paramètres ou en nous
            contactant. Nous nous réservons le droit de suspendre ou fermer des comptes en
            violation de ces conditions, apres notification sauf en cas de violation grave.
          </p>

          <h2>10. Droit applicable</h2>
          <p>
            Ces conditions sont regies par les lois de la province de Quebec et les lois
            federales du Canada applicables. Tout litige sera soumis a la juridiction exclusive
            des tribunaux de Montreal, Quebec.
          </p>

          <h2>11. Contact</h2>
          <p>
            Pour toute question relative aux présentes conditions :{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-foreground underline underline-offset-2">
              {contactEmail}
            </a>
          </p>
        </div>
      </Section>
    </MarketingPageShell>
  );
}
