import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Footer } from "@/components/layout/footer";
import { siteData } from "@/data/site";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    client: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 font-mono text-xs ${colors[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-3 font-mono text-sm text-accent-brand">
              {siteData.hero.location}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {siteData.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
              {siteData.hero.subtitle}
            </p>
            <div className="mt-8 flex items-center gap-4">
              {siteData.hero.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-brand"
                >
                  {social.name} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About">
          <div className="max-w-2xl space-y-4">
            {siteData.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        {/* Now */}
        <Section id="now" title="Now">
          <p className="mb-6 text-sm text-muted-foreground">
            Updated {siteData.now.updated}
          </p>
          <ul className="max-w-2xl space-y-3">
            {siteData.now.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          {/* Featured */}
          <div className="mb-12">
            <h3 className="mb-6 text-lg font-semibold">Featured</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {siteData.projects.featured.map((project) => (
                <div
                  key={project.title}
                  className="rounded-lg border border-border/50 bg-card p-6 transition-colors hover:border-accent-brand/30"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold">{project.title}</h4>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.url || project.github) && (
                    <div className="mt-4 flex gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent-brand hover:underline"
                        >
                          Visit →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Client Work */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Client Work</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {siteData.projects.client.map((project) => (
                <div
                  key={project.title}
                  className="rounded-lg border border-border/50 bg-card p-6 transition-colors hover:border-accent-brand/30"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold">{project.title}</h4>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <div className="mt-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-brand hover:underline"
                      >
                        Visit →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Life / Hobbies */}
        <Section id="life" title="Life">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteData.hobbies.map((hobby) => (
              <div
                key={hobby.name}
                className="flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:border-accent-brand/30"
              >
                <span className="text-2xl">{hobby.emoji}</span>
                <div>
                  <h4 className="font-semibold">{hobby.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {hobby.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <div className="max-w-2xl">
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {siteData.contact.description}
            </p>
            {siteData.contact.available && (
              <p className="mb-6 flex items-center gap-2 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">
                  Available for new projects
                </span>
              </p>
            )}
            <a
              href={`mailto:${siteData.contact.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-brand px-5 py-2.5 font-medium text-accent-brand-foreground transition-opacity hover:opacity-90"
            >
              {siteData.contact.email}
            </a>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
