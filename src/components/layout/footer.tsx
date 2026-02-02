import { siteData } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {siteData.hero.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          {siteData.hero.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
