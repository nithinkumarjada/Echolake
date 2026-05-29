"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  Bot,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Github,
  Mail,
  MessageSquare,
  Printer,
  Search,
  Send,
  X
} from "lucide-react";
import { CommandPalette } from "@/components/command-palette";
import { motion, AnimatePresence } from "@/components/motion";
import { Navbar } from "@/components/navbar";
import { SectionHeading } from "@/components/section-heading";
import { ThreeBackground } from "@/components/three-background";
import {
  careerTimeline,
  certifications,
  education,
  expertise,
  experiences,
  posts,
  profile,
  projectCategories,
  projects,
  skillGroups,
  stats,
  testimonials
} from "@/lib/portfolio-data";

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [openExperience, setOpenExperience] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [formSent, setFormSent] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const target = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
      return matchesCategory && target.includes(projectQuery.toLowerCase());
    });
  }, [category, projectQuery]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main id="home" className="overflow-hidden">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Navbar onCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <FloatingSocials />
      <BackToTop />

      <section className="relative min-h-screen px-4 pt-32">
        <ThreeBackground />
        <div className="premium-grid absolute inset-0 -z-20" />
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 pb-16 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Available for data, cloud, and software roles</span>
            <h1 className="mt-6 font-display text-5xl font-bold tracking-normal sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <TypingRoles />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgb(var(--muted))] sm:text-xl">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white shadow-glow transition hover:-translate-y-1 dark:bg-white dark:text-ink"
              >
                <Download size={19} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--line),0.9)] px-5 py-3 font-bold transition hover:-translate-y-1 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Mail size={19} />
                Contact
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.slice(0, 3).map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4">
                  <item.icon className="mb-3 text-cyanx" size={22} aria-hidden="true" />
                  <div className="font-display text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-[rgb(var(--muted))]">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="relative mx-auto w-full max-w-md"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyanx/30 via-mintx/20 to-coralx/20 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-4">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyanx/20 via-white/20 to-mintx/20">
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
                  alt="Professional portrait placeholder for Nithin Kumar Jada"
                  width={900}
                  height={1125}
                  priority
                  className="h-full w-full object-cover mix-blend-luminosity dark:opacity-85"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Metric label="Pipeline SLA" value="99.9%" />
                <Metric label="Cloud Ready" value="IaC" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="content">
        <About />
        <Skills />
        <Experience
          openExperience={openExperience}
          setOpenExperience={setOpenExperience}
        />
        <Projects
          query={projectQuery}
          setQuery={setProjectQuery}
          category={category}
          setCategory={setCategory}
          filteredProjects={filteredProjects}
          setSelectedProject={setSelectedProject}
        />
        <Certifications />
        <Education />
        <Achievements />
        <GitHubSection />
        <Blog />
        <Testimonials testimonial={testimonial} setTestimonial={setTestimonial} />
        <ResumeSection />
        <AdvancedFeatures onCommand={() => setCommandOpen(true)} />
        <Contact formSent={formSent} setFormSent={setFormSent} />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

function TypingRoles() {
  return (
    <div className="mt-4 h-12 overflow-hidden font-display text-2xl font-bold text-cyanx sm:text-3xl">
      <div className="animate-marquee flex w-max gap-8">
        {[...profile.roles, ...profile.roles].map((role, index) => (
          <span key={`${role}-${index}`}>{role}</span>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(var(--line),0.8)] p-4">
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-sm text-[rgb(var(--muted))]">{label}</div>
    </div>
  );
}

function FloatingSocials() {
  return (
    <aside className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
      {profile.social.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          title={item.label}
          className="glass grid size-11 place-items-center rounded-full transition hover:-translate-y-1"
        >
          <item.icon size={18} />
        </a>
      ))}
    </aside>
  );
}

function BackToTop() {
  return (
    <a
      href="#home"
      aria-label="Back to top"
      title="Back to top"
      className="glass fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full transition hover:-translate-y-1"
    >
      <ArrowUp size={20} />
    </a>
  );
}

function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="A data-minded engineer with product instincts."
        description="I like systems that are easy to trust: clear contracts, observable behavior, polished interfaces, and measurable business value."
      />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold">Professional Summary</h3>
          <p className="mt-4 leading-8 text-[rgb(var(--muted))]">
            Technology professional specializing in data engineering, cloud infrastructure, and full-stack software. Career objective: build dependable platforms that help teams move faster without compromising quality, security, or long-term maintainability.
          </p>
          <div className="mt-6 grid gap-3">
            {expertise.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[rgba(var(--line),0.8)] p-3">
                <CheckCircle2 className="text-mintx" size={18} aria-hidden="true" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {careerTimeline.map((item, index) => (
            <motion.div
              key={item.year}
              className="glass rounded-3xl p-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="text-sm font-bold text-cyanx">{item.year}</div>
              <h3 className="mt-1 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-[rgb(var(--muted))]">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="A practical stack for modern data products."
        description="Categorized skill cards with motion that communicates confidence without turning the page into a fireworks show."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="glass rounded-3xl p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-cyanx/15 text-cyanx">
                <group.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold">{group.title}</h3>
            </div>
            <div className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm font-semibold">
                    <span>{skill.name}</span>
                    <span className="text-[rgb(var(--muted))]">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyanx to-mintx"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({
  openExperience,
  setOpenExperience
}: {
  openExperience: number;
  setOpenExperience: (index: number) => void;
}) {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience"
        title="Impact-oriented engineering history."
        description="Expandable timeline entries show responsibilities, technology choices, and the business result behind the work."
      />
      <div className="mx-auto max-w-4xl space-y-4">
        {experiences.map((job, index) => (
          <div key={job.company} className="glass rounded-3xl p-5">
            <button
              type="button"
              onClick={() => setOpenExperience(openExperience === index ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={openExperience === index}
            >
              <span>
                <span className="block font-display text-xl font-bold">{job.title}</span>
                <span className="block text-sm text-[rgb(var(--muted))]">{job.company} • {job.duration}</span>
              </span>
              <ChevronDown className={`shrink-0 transition ${openExperience === index ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openExperience === index ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-5 font-semibold text-mintx">{job.impact}</p>
                  <ul className="mt-4 grid gap-2 text-[rgb(var(--muted))]">
                    {job.responsibilities.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <span key={tech} className="rounded-full bg-cyanx/10 px-3 py-1 text-sm font-bold text-cyanx">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects({
  query,
  setQuery,
  category,
  setCategory,
  filteredProjects,
  setSelectedProject
}: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  filteredProjects: typeof projects;
  setSelectedProject: (project: (typeof projects)[number]) => void;
}) {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Premium case studies with architecture and outcomes."
        description="Search, filter, inspect details, and jump to code or demos."
      />
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="glass flex items-center gap-3 rounded-full px-4 py-3 lg:w-96">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects..."
            className="w-full bg-transparent outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                category === item ? "bg-ink text-white dark:bg-white dark:text-ink" : "glass"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.title}
            layout
            className="glass overflow-hidden rounded-3xl"
            whileHover={{ y: -6 }}
          >
            <Image
              src={project.image}
              alt=""
              width={1200}
              height={760}
              className="h-52 w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <div className="text-sm font-bold text-cyanx">{project.category}</div>
              <h3 className="mt-2 font-display text-xl font-bold">{project.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[rgb(var(--muted))]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold dark:bg-white/10">
                    {tech}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-ink"
              >
                View Case Study
                <ExternalLink size={16} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <SectionHeading eyebrow="Certifications" title="Signals of current platform fluency." description="Cloud, data, and lakehouse credentials organized as recruiter-friendly proof points." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div key={cert} className="glass rounded-3xl p-6">
            <CheckCircle2 className="mb-4 text-mintx" />
            <h3 className="font-display text-lg font-bold">{cert}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading eyebrow="Education" title="Academic foundation for scalable systems." description="Degree work, relevant coursework, and technical projects in a concise timeline view." />
      {education.map((item) => (
        <div key={item.school} className="glass mx-auto max-w-4xl rounded-3xl p-6 sm:p-8">
          <div className="font-display text-2xl font-bold">{item.school}</div>
          <p className="mt-2 text-[rgb(var(--muted))]">{item.degree} • GPA {item.gpa}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoList title="Coursework" items={item.coursework} />
            <InfoList title="Academic Projects" items={item.projects} />
            <InfoList title="Achievements" items={item.achievements} />
          </div>
        </div>
      ))}
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display font-bold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <SectionHeading eyebrow="Achievements" title="Numbers recruiters can scan quickly." description="Animated professional stats across experience, projects, certifications, and technical depth." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <motion.div key={item.label} className="glass rounded-3xl p-6" whileInView={{ y: [12, 0], opacity: [0, 1] }} viewport={{ once: true }}>
            <item.icon className="mb-4 text-cyanx" />
            <div className="font-display text-4xl font-bold">{item.value}</div>
            <p className="mt-2 text-[rgb(var(--muted))]">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function GitHubSection() {
  return (
    <section id="github" className="section-shell">
      <SectionHeading eyebrow="GitHub" title="Development activity and open-source signal." description="Live-ready GitHub embeds for contributions, repositories, stars, forks, commits, and activity heatmap." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-3xl p-5">
          <Image
            src="https://ghchart.rshah.org/52d6ff/nithin-kumar-jada"
            alt="GitHub contribution graph"
            width={1000}
            height={180}
            unoptimized
            className="w-full rounded-2xl bg-white p-4"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <Github className="mb-4 text-cyanx" />
          <h3 className="font-display text-2xl font-bold">Repository Snapshot</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Metric label="Repositories" value="36" />
            <Metric label="Stars" value="124" />
            <Metric label="Forks" value="41" />
            <Metric label="Recent commits" value="82" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) => `${post.title} ${post.category} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <section id="blog" className="section-shell">
      <SectionHeading eyebrow="Blog" title="Technical writing with practical architecture notes." description="Searchable articles, tags, reading time, and newsletter subscription." />
      <label className="glass mx-auto mb-6 flex max-w-xl items-center gap-3 rounded-full px-4 py-3">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="w-full bg-transparent outline-none" />
      </label>
      <div className="grid gap-5 md:grid-cols-3">
        {filtered.map((post) => (
          <article key={post.title} className="glass rounded-3xl p-6">
            {post.featured ? <span className="text-sm font-bold text-coralx">Featured</span> : null}
            <h3 className="mt-3 font-display text-xl font-bold">{post.title}</h3>
            <p className="mt-3 text-sm text-[rgb(var(--muted))]">{post.category} • {post.readTime}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => <span key={tag} className="rounded-full bg-cyanx/10 px-3 py-1 text-xs font-bold text-cyanx">{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
      <form className="glass mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-3xl p-4 sm:flex-row">
        <input type="email" required placeholder="Email for newsletter" className="min-h-12 flex-1 rounded-full border border-[rgba(var(--line),0.8)] bg-transparent px-4 outline-none" />
        <button type="submit" className="rounded-full bg-ink px-5 py-3 font-bold text-white dark:bg-white dark:text-ink">Subscribe</button>
      </form>
    </section>
  );
}

function Testimonials({ testimonial, setTestimonial }: { testimonial: number; setTestimonial: (index: number) => void }) {
  const active = testimonials[testimonial];
  return (
    <section id="testimonials" className="section-shell">
      <SectionHeading eyebrow="Testimonials" title="Signals from managers, clients, and peers." description="Carousel-ready recommendations and endorsements." />
      <div className="glass mx-auto max-w-4xl rounded-3xl p-8 text-center">
        <MessageSquare className="mx-auto mb-5 text-cyanx" />
        <p className="font-display text-2xl font-bold leading-10">“{active.quote}”</p>
        <p className="mt-5 font-bold">{active.name}</p>
        <p className="text-sm text-[rgb(var(--muted))]">{active.role}</p>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button key={item.name} type="button" onClick={() => setTestimonial(index)} aria-label={`Show testimonial ${index + 1}`} className={`size-3 rounded-full ${index === testimonial ? "bg-cyanx" : "bg-black/20 dark:bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="section-shell">
      <SectionHeading eyebrow="Resume" title="Resume preview, download, and print tools." description="Recruiter-ready actions with ATS and PDF paths." />
      <div className="glass mx-auto grid max-w-5xl gap-6 rounded-3xl p-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <FileText className="mb-4 text-cyanx" size={32} />
          <h3 className="font-display text-2xl font-bold">Nithin_SDE.pdf</h3>
          <p className="mt-3 text-[rgb(var(--muted))]">Place the provided resume at <span className="font-mono">public/resume/Nithin_SDE.pdf</span> for one-click download and preview.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={profile.resume} download className="rounded-full bg-ink px-4 py-2 font-bold text-white dark:bg-white dark:text-ink">Download PDF</a>
            <a href={profile.resume} download className="rounded-full border border-[rgba(var(--line),0.8)] px-4 py-2 font-bold">ATS Resume</a>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--line),0.8)] px-4 py-2 font-bold"><Printer size={17} /> Print</button>
          </div>
        </div>
        <div className="min-h-72 rounded-2xl border border-[rgba(var(--line),0.8)] bg-black/5 p-4 dark:bg-white/5">
          <iframe src={profile.resume} title="Resume preview" className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}

function AdvancedFeatures({ onCommand }: { onCommand: () => void }) {
  const features = ["AI chatbot assistant", "Resume analyzer", "Visitor analytics dashboard", "Multi-language support", "Theme customization", "Portfolio search", "Command palette", "Interactive skill visualization", "PWA offline mode"];
  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Platform" title="Advanced portfolio features." description="Product-grade functionality that turns the portfolio into a personal brand platform." />
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature} className="glass rounded-3xl p-5">
            <Bot className="mb-3 text-mintx" />
            <h3 className="font-display font-bold">{feature}</h3>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button type="button" onClick={onCommand} className="rounded-full bg-ink px-5 py-3 font-bold text-white dark:bg-white dark:text-ink">Open Search</button>
      </div>
    </section>
  );
}

function Contact({ formSent, setFormSent }: { formSent: boolean; setFormSent: (value: boolean) => void }) {
  return (
    <section id="contact" className="section-shell">
      <SectionHeading eyebrow="Contact" title="Start a focused technical conversation." description="Validated contact form plus direct channels for hiring managers and collaborators." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-2xl font-bold">Contact Methods</h3>
          <div className="mt-5 space-y-3">
            {profile.contactMethods.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-[rgba(var(--line),0.8)] p-3">
                <item.icon className="text-cyanx" size={19} />
                <span><strong>{item.label}</strong><br /><span className="text-sm text-[rgb(var(--muted))]">{item.value}</span></span>
              </div>
            ))}
          </div>
        </div>
        <form
          className="glass rounded-3xl p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setFormSent(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" required />
            <Input label="Email" type="email" required />
          </div>
          <Input label="Subject" required />
          <label className="mt-4 block">
            <span className="font-bold">Message</span>
            <textarea required rows={5} className="mt-2 w-full rounded-2xl border border-[rgba(var(--line),0.8)] bg-transparent p-4 outline-none" />
          </label>
          {formSent ? <p className="mt-4 rounded-2xl bg-mintx/15 p-3 font-bold text-mintx">Message validated successfully. Connect this form to Resend, SendGrid, or your CRM endpoint.</p> : null}
          <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white dark:bg-white dark:text-ink">
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>
      <footer className="mt-16 border-t border-[rgba(var(--line),0.8)] pt-8 text-center text-sm text-[rgb(var(--muted))]">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP-ready architecture, and Three.js.
      </footer>
    </section>
  );
}

function Input({ label, type = "text", required = false }: { label: string; type?: string; required?: boolean }) {
  return (
    <label className="mt-4 block">
      <span className="font-bold">{label}</span>
      <input type={type} required={required} className="mt-2 h-12 w-full rounded-full border border-[rgba(var(--line),0.8)] bg-transparent px-4 outline-none" />
    </label>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="glass max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl" initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} onClick={(event) => event.stopPropagation()}>
            <div className="relative">
              <Image src={project.image} alt="" width={1200} height={600} className="h-64 w-full object-cover" />
              <button type="button" onClick={onClose} aria-label="Close project modal" className="glass absolute right-4 top-4 grid size-10 place-items-center rounded-full"><X size={18} /></button>
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl font-bold">{project.title}</h2>
              <p className="mt-3 text-[rgb(var(--muted))]">{project.description}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <InfoList title="Key Features" items={project.features} />
                <div>
                  <h3 className="font-display font-bold">Architecture Diagram</h3>
                  <div className="mt-3 rounded-2xl border border-[rgba(var(--line),0.8)] p-4 text-sm text-[rgb(var(--muted))]">
                    Sources → Ingestion → Processing → Storage → Serving → Dashboards
                  </div>
                  <h3 className="mt-5 font-display font-bold">Challenge Solved</h3>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">{project.challenges}</p>
                </div>
              </div>
              <p className="mt-5 font-bold text-mintx">{project.impact}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full bg-cyanx/10 px-3 py-1 text-sm font-bold text-cyanx">{tech}</span>)}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={project.github} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-bold text-white dark:bg-white dark:text-ink"><Github size={17} /> GitHub</a>
                <a href={project.demo} className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--line),0.8)] px-4 py-2 font-bold"><ExternalLink size={17} /> Live Demo</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
