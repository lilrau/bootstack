"use client";

import { ArrowRight, Star, GitBranch, Users, Heart } from "lucide-react";

const contributionWays = [
  {
    icon: Star,
    title: "Star the repo",
    description: "Show your support by starring BootStack on GitHub",
    action: "Star on GitHub",
    popular: true,
  },
  {
    icon: GitBranch,
    title: "Contribute code",
    description: "Help us add new apps, fix bugs, or improve features",
    action: "View issues",
    popular: false,
  },
  {
    icon: Users,
    title: "Share feedback",
    description: "Report issues or suggest improvements to make BootStack better",
    action: "Open an issue",
    popular: false,
  },
  {
    icon: Heart,
    title: "Spread the word",
    description: "Share BootStack with your friends and the Linux community",
    action: "Share project",
    popular: false,
  },
];

export function ContributionSection() {
  return (
    <section id="contribute" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Contribute
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Free and
            <br />
            <span className="text-stroke">open source</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            BootStack is and always will be free. Help us build the best Linux setup tool for everyone.
          </p>
        </div>

        {/* Contribution Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
          {contributionWays.map((way, idx) => (
            <div
              key={way.title}
              className={`relative p-8 lg:p-12 bg-background ${
                way.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {way.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 p-3 bg-foreground/5 rounded-lg w-fit">
                  <way.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <h3 className="font-display text-2xl text-foreground mb-3">{way.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{way.description}</p>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  way.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {way.action}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Every contribution matters — whether it's code, feedback, or just spreading the word.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>MIT License</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Made with ❤️ by the community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
