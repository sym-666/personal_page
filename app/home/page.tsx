import Link from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'

export default function HomePage() {
  return (
    <div className="space-y-20 pt-8 pb-12">
      {/* <nav
        aria-label="Home sections"
        className="sticky top-4 z-10 -mt-2 flex flex-wrap gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-600 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-300"
      >
        {headerNavLinks.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="hover:text-primary-600 dark:hover:text-primary-300 rounded-full px-3 py-1.5 font-semibold transition"
          >
            {tab.title}
          </Link>
        ))}
      </nav> */}

      <section
        id="overview"
        className="to-primary-50/60 dark:to-primary-950/40 relative overflow-hidden rounded-3xl border border-gray-200/70 bg-gradient-to-br from-white via-gray-50 px-6 py-14 shadow-sm sm:px-10 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900"
      >
        <div className="bg-primary-200/60 dark:bg-primary-800/30 pointer-events-none absolute top-10 -left-24 h-56 w-56 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-gray-200/70 blur-3xl dark:bg-gray-800/40" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gray-600 uppercase shadow-sm dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
              Notes for builders
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl md:text-6xl dark:text-white">
              Craft ideas into products, one clear post at a time.
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              This is a home for practical guides, experiments, and progress logs. Expect thoughtful
              breakdowns, actionable checklists, and the occasional deep dive.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="bg-primary-600 hover:bg-primary-700 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
              >
                Explore the blog
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-500"
              >
                View projects
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-transparent px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                About the author
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="bg-primary-500 h-2.5 w-2.5 rounded-full" />
                Weekly writing cadence
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                Built with Next.js + MDX
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Strategy notes',
                text: 'Roadmaps, product thinking, and decisions worth revisiting.',
              },
              {
                title: 'Design systems',
                text: 'Patterns, tokens, and scalable UI habits you can copy.',
              },
              {
                title: 'Engineering logs',
                text: 'Shipping lessons, perf audits, and code archaeology.',
              },
              {
                title: 'Team rituals',
                text: 'How I plan weeks, run reviews, and keep momentum.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-950/60"
              >
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured collections</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Curated tracks that combine essays, templates, and hands-on exercises.
          </p>
          <div className="mt-6 grid gap-4">
            {[
              {
                title: 'Launch playbook',
                desc: 'From positioning to post-launch retrospectives.',
                href: '/blog',
              },
              {
                title: 'Design critique kit',
                desc: 'Frameworks for feedback that moves the work forward.',
                href: '/blog',
              },
              {
                title: 'Build in public',
                desc: 'Weekly updates and experiments on real projects.',
                href: '/projects',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group hover:border-primary-400 hover:bg-primary-50/60 flex items-start justify-between gap-4 rounded-2xl border border-gray-200/80 bg-gray-50/70 px-5 py-4 transition dark:border-gray-800 dark:bg-gray-900/60"
              >
                <div>
                  <h3 className="group-hover:text-primary-700 dark:group-hover:text-primary-300 text-base font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </div>
                <span className="group-hover:text-primary-600 text-xl text-gray-400 transition">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div
          id="principles"
          className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8 text-white shadow-sm"
        >
          <h2 className="text-2xl font-bold">Working principles</h2>
          <p className="mt-2 text-sm text-gray-300">
            The rules that guide every post, sprint, and experiment.
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            {[
              'Document the decision, not just the outcome.',
              'Prefer small releases with loud feedback loops.',
              'Keep the stack boring, keep the ideas sharp.',
              'Ship with a checklist, learn with a journal.',
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="highlights" className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Deep-dive essays',
            text: 'Long-form explorations that connect strategy, design, and engineering.',
            link: '/blog',
            label: 'Browse essays',
          },
          {
            title: 'Project snapshots',
            text: 'What I am building now, with timelines and constraints.',
            link: '/projects',
            label: 'See projects',
          },
          {
            title: 'Speaking and notes',
            text: 'Slides, talks, and short reads you can skim in minutes.',
            link: '/about',
            label: 'Get the notes',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
            <Link
              href={item.link}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-300 mt-6 inline-flex items-center gap-2 text-sm font-semibold transition"
            >
              {item.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </section>

      <section
        id="subscribe"
        className="rounded-3xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Want the next post in your inbox?
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Subscribe for concise updates, no spam, and early access to templates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200"
            >
              Learn more
            </Link>
            <Link
              href="/blog"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
            >
              Read latest
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
