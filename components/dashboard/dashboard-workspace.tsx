"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Copy, Laptop, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Distro = "ubuntu" | "arch" | "fedora" | "opensuse" | "alpine";
type Category = "dev" | "browser" | "communication" | "database" | "media";
type Manager = "apt" | "pacman" | "dnf" | "zypper" | "apk" | "flatpak" | "snap";

type AppDefinition = {
  id: string;
  name: string;
  category: Category;
  description: string;
  packages: Partial<Record<Manager, string>>;
};

const distros: { id: Distro; name: string; manager: Manager }[] = [
  { id: "ubuntu", name: "Ubuntu / Debian", manager: "apt" },
  { id: "arch", name: "Arch / Manjaro", manager: "pacman" },
  { id: "fedora", name: "Fedora / RHEL", manager: "dnf" },
  { id: "opensuse", name: "openSUSE", manager: "zypper" },
  { id: "alpine", name: "Alpine", manager: "apk" },
];

const categories: { id: Category; name: string }[] = [
  { id: "dev", name: "Development" },
  { id: "browser", name: "Browsers" },
  { id: "communication", name: "Communication" },
  { id: "database", name: "Databases" },
  { id: "media", name: "Media / Utility" },
];

const appCatalog: AppDefinition[] = [
  {
    id: "git",
    name: "Git",
    category: "dev",
    description: "Version control essentials for any project.",
    packages: { apt: "git", pacman: "git", dnf: "git", zypper: "git", apk: "git" },
  },
  {
    id: "docker",
    name: "Docker",
    category: "dev",
    description: "Container runtime and local environment tooling.",
    packages: { apt: "docker.io", pacman: "docker", dnf: "docker", zypper: "docker", apk: "docker" },
  },
  {
    id: "vscode",
    name: "VS Codium",
    category: "dev",
    description: "Open-source code editor with plugin ecosystem.",
    packages: { flatpak: "com.vscodium.codium" },
  },
  {
    id: "firefox",
    name: "Firefox",
    category: "browser",
    description: "Privacy-friendly browser for daily browsing.",
    packages: { apt: "firefox", pacman: "firefox", dnf: "firefox", zypper: "MozillaFirefox", apk: "firefox" },
  },
  {
    id: "chrome",
    name: "Google Chrome",
    category: "browser",
    description: "Popular Chromium-based browser.",
    packages: { flatpak: "com.google.Chrome" },
  },
  {
    id: "discord",
    name: "Discord",
    category: "communication",
    description: "Voice and text chat for teams and communities.",
    packages: { flatpak: "com.discordapp.Discord" },
  },
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    description: "Team communication and channel workflows.",
    packages: { snap: "slack", flatpak: "com.slack.Slack" },
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "database",
    description: "Powerful relational database server.",
    packages: { apt: "postgresql", pacman: "postgresql", dnf: "postgresql-server", zypper: "postgresql-server", apk: "postgresql" },
  },
  {
    id: "redis",
    name: "Redis",
    category: "database",
    description: "In-memory datastore for cache and queues.",
    packages: { apt: "redis-server", pacman: "redis", dnf: "redis", zypper: "redis", apk: "redis" },
  },
  {
    id: "obsidian",
    name: "Obsidian",
    category: "media",
    description: "Markdown-first knowledge base and notes.",
    packages: { flatpak: "md.obsidian.Obsidian", snap: "obsidian" },
  },
  {
    id: "vlc",
    name: "VLC",
    category: "media",
    description: "Reliable media playback for most formats.",
    packages: { apt: "vlc", pacman: "vlc", dnf: "vlc", zypper: "vlc", apk: "vlc" },
  },
  {
    id: "steam",
    name: "Steam",
    category: "media",
    description: "Gaming platform and launcher.",
    packages: { flatpak: "com.valvesoftware.Steam" },
  },
];

function buildScript(selectedApps: AppDefinition[], distro: Distro): string {
  const distroConfig = distros.find((item) => item.id === distro) ?? distros[0];
  const nativeManager = distroConfig.manager;

  const nativePackages = selectedApps
    .map((app) => app.packages[nativeManager])
    .filter(Boolean) as string[];
  const flatpakPackages = selectedApps
    .map((app) => app.packages.flatpak)
    .filter(Boolean) as string[];
  const snapPackages = selectedApps
    .map((app) => app.packages.snap)
    .filter(Boolean) as string[];

  const lines: string[] = [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    `# BootStack generated setup for ${distroConfig.name}`,
    "echo 'Starting installation workflow...'",
    "",
  ];

  if (nativePackages.length > 0) {
    if (nativeManager === "apt") {
      lines.push("sudo apt update");
      lines.push(`sudo apt install -y ${nativePackages.join(" ")}`);
    } else if (nativeManager === "pacman") {
      lines.push(`sudo pacman -Syu --noconfirm ${nativePackages.join(" ")}`);
    } else if (nativeManager === "dnf") {
      lines.push(`sudo dnf install -y ${nativePackages.join(" ")}`);
    } else if (nativeManager === "zypper") {
      lines.push(`sudo zypper install -y ${nativePackages.join(" ")}`);
    } else if (nativeManager === "apk") {
      lines.push("sudo apk update");
      lines.push(`sudo apk add ${nativePackages.join(" ")}`);
    }
    lines.push("");
  }

  if (flatpakPackages.length > 0) {
    lines.push(`# Flatpak apps (${flatpakPackages.length})`);
    lines.push("flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo");
    lines.push(`flatpak install -y flathub ${flatpakPackages.join(" ")}`);
    lines.push("");
  }

  if (snapPackages.length > 0) {
    lines.push(`# Snap apps (${snapPackages.length})`);
    lines.push(`sudo snap install ${snapPackages.join(" ")}`);
    lines.push("");
  }

  if (selectedApps.length === 0) {
    lines.push("echo 'Select at least one app to generate your setup script.'");
  } else {
    lines.push(`echo 'Done. Installed ${selectedApps.length} app(s).'`);
  }

  return lines.join("\n");
}

export function DashboardWorkspace() {
  const [selectedDistro, setSelectedDistro] = useState<Distro>("ubuntu");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(["git", "firefox", "vscode"]);

  const filteredApps = useMemo(() => {
    return appCatalog.filter((app) => {
      const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const selectedApps = useMemo(() => {
    return appCatalog.filter((app) => selectedIds.includes(app.id));
  }, [selectedIds]);

  const scriptOutput = useMemo(() => {
    return buildScript(selectedApps, selectedDistro);
  }, [selectedApps, selectedDistro]);

  const toggleSelection = (appId: string) => {
    setSelectedIds((current) =>
      current.includes(appId)
        ? current.filter((id) => id !== appId)
        : [...current, appId]
    );
  };

  const copyScript = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(scriptOutput);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-10">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to landing page
            </Link>
            <h1 className="font-display text-4xl tracking-tight lg:text-5xl">BootStack Dashboard</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Select your distro, choose apps, and generate installation scripts. This is now the main workspace where BootStack features can evolve.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Laptop className="h-3.5 w-3.5" />
              Dashboard beta
            </Badge>
            <Badge variant="outline">{selectedIds.length} selected</Badge>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[280px_1fr_360px]">
          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">Workspace Controls</CardTitle>
              <CardDescription>Filter what you want to install</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="distro-select">
                  Linux distribution
                </label>
                <select
                  id="distro-select"
                  value={selectedDistro}
                  onChange={(event) => setSelectedDistro(event.target.value as Distro)}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {distros.map((distro) => (
                    <option key={distro.id} value={distro.id}>
                      {distro.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="app-search">
                  Search apps
                </label>
                <Input
                  id="app-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="docker, browser, editor..."
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Categories</p>
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("all")}
                >
                  All categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">App Catalog</CardTitle>
              <CardDescription>
                {filteredApps.length} result(s) in the current view
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 px-5 sm:grid-cols-2">
              {filteredApps.map((app) => {
                const isSelected = selectedIds.includes(app.id);
                return (
                  <div
                    key={app.id}
                    className="rounded-lg border border-border p-4 transition-colors hover:border-foreground/25"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h3 className="font-medium">{app.name}</h3>
                      {isSelected ? (
                        <Badge className="gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Selected
                        </Badge>
                      ) : (
                        <Badge variant="outline">{app.category}</Badge>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{app.description}</p>
                    <Button
                      size="sm"
                      variant={isSelected ? "secondary" : "outline"}
                      className="w-full"
                      onClick={() => toggleSelection(app.id)}
                    >
                      {isSelected ? "Remove from setup" : "Add to setup"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-base">Generated Script</CardTitle>
              <CardDescription>
                Preview and copy your install command sequence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-5">
              <div className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                <p className="mb-2 font-medium">Selected apps</p>
                {selectedApps.length === 0 ? (
                  <p className="text-muted-foreground">No apps selected yet.</p>
                ) : (
                  <ul className="space-y-1">
                    {selectedApps.map((app) => (
                      <li key={app.id} className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{app.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <textarea
                readOnly
                value={scriptOutput}
                className="h-[360px] w-full rounded-md border border-input bg-muted/20 p-3 font-mono text-xs leading-relaxed"
              />
              <Button size="sm" className="w-full" onClick={copyScript}>
                <Copy className="h-4 w-4" />
                Copy script
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
