import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
  description: "Comment nous collectons, utilisons et proteeons vos donnees personnelles.",
};

const lastUpdated = "1er juin 2026";
const appName = "KV Web Starter";
const contactEmail = "privacy@exemple.com";

export default function PrivacyPage() {
  return (
    <MarketingPageShell>
      <Section className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Politique de confidentialite</h1>
        <p className="mt-2 text-sm text-muted-foreground">Derniere mise a jour : {lastUpdated}</p>

        <div className="prose prose-sm mt-10 max-w-none text-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-medium [&_p]:mt-4 [&_p]:leading-7 [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-1.5 [&_li]:flex [&_li]:gap-2 [&_li]:text-sm [&_li]:text-muted-foreground">

          <p>
            {appName} (&ldquo;nous&rdquo;, &ldquo;notre&rdquo;) s&apos;engage a proteger votre vie privee.
            Cette politique explique quelles donnees nous collectons, comment nous les utilisons
            et les droits dont vous disposez.
          </p>

          <h2>1. Donnees que nous collectons</h2>

          <h3>Donnees que vous nous fournissez</h3>
          <ul>
            <li><span>Nom et adresse email lors de la creation de compte ou d&apos;une reservation</span></li>
            <li><span>Numero de telephone (optionnel, uniquement pour les rappels)</span></li>
            <li><span>Informations de paiement traitees par Stripe — nous ne stockons jamais les numeros de carte</span></li>
            <li><span>Messages envoyes via le formulaire de contact</span></li>
          </ul>

          <h3>Donnees collectees automatiquement</h3>
          <ul>
            <li><span>Adresse IP et type de navigateur pour la securite et le diagnostic</span></li>
            <li><span>Pages visitees et interactions (via Sentry pour le diagnostic d&apos;erreurs)</span></li>
            <li><span>Journaux d&apos;acces API si vous utilisez nos cles API</span></li>
          </ul>

          <h2>2. Comment nous utilisons vos donnees</h2>
          <ul>
            <li><span>Gerer votre compte et vos reservations</span></li>
            <li><span>Envoyer des confirmations et rappels par email</span></li>
            <li><span>Traiter les paiements via Stripe</span></li>
            <li><span>Detecter et prevenir les utilisations frauduleuses</span></li>
            <li><span>Ameliorer le service en analysant les erreurs (Sentry)</span></li>
          </ul>
          <p>
            Nous ne vendons jamais vos donnees a des tiers. Nous ne les utilisons pas
            a des fins publicitaires.
          </p>

          <h2>3. Partage avec des tiers</h2>
          <p>Nous partageons des donnees uniquement avec :</p>
          <ul>
            <li><span><strong>Stripe</strong> — traitement des paiements. Politique : stripe.com/privacy</span></li>
            <li><span><strong>Resend</strong> — envoi d&apos;emails transactionnels. Politique : resend.com/privacy</span></li>
            <li><span><strong>Sentry</strong> — diagnostic d&apos;erreurs. Aucune donnee personnelle identifiable n&apos;est transmise</span></li>
            <li><span><strong>Vercel</strong> — hebergement. Les logs sont anonymises et conserves 30 jours</span></li>
          </ul>

          <h2>4. Conservation des donnees</h2>
          <p>
            Vos donnees de compte sont conservees tant que votre compte est actif.
            Apres fermeture du compte, les donnees sont supprimees dans un delai de 90 jours,
            sauf obligation legale de conservation (ex. : donnees fiscales conservees 7 ans).
          </p>

          <h2>5. Vos droits</h2>
          <p>Conformement au RGPD et aux lois canadiennes sur la protection de la vie privee, vous avez le droit de :</p>
          <ul>
            <li><span>Acces — demander une copie de vos donnees personnelles</span></li>
            <li><span>Rectification — corriger des donnees inexactes</span></li>
            <li><span>Suppression — demander la suppression de vos donnees</span></li>
            <li><span>Portabilite — recevoir vos donnees dans un format lisible</span></li>
            <li><span>Opposition — vous opposer a certains traitements</span></li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous a{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-foreground underline underline-offset-2">
              {contactEmail}
            </a>
            . Nous repondons dans un delai de 30 jours.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Nous utilisons uniquement des cookies strictement necessaires au fonctionnement du service :
            cookie de session d&apos;authentification (expire a la fermeture du navigateur ou apres 30 jours),
            et cookie CSRF pour la securite des formulaires. Aucun cookie de suivi ou publicitaire.
          </p>

          <h2>7. Securite</h2>
          <p>
            Les donnees sont chiffrees en transit (HTTPS/TLS) et au repos dans notre base de donnees.
            Les mots de passe sont hasches avec bcrypt. Les cles API sont hashees avec SHA-256
            — meme nous ne pouvons pas les lire apres creation.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Toute modification substantielle sera communiquee par email aux comptes actifs
            au moins 15 jours avant son entree en vigueur.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question relative a cette politique ou a vos donnees personnelles :
          </p>
          <ul>
            <li>
              <span>
                Email :{" "}
                <a href={`mailto:${contactEmail}`} className="font-medium text-foreground underline underline-offset-2">
                  {contactEmail}
                </a>
              </span>
            </li>
            <li><span>Reponse garantie sous 30 jours ouvrables</span></li>
          </ul>
        </div>
      </Section>
    </MarketingPageShell>
  );
}
