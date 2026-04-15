"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import type { SimpleIcon } from "simple-icons";
import {
  siArchlinux, siUbuntu, siFedora, siDebian, siAlpinelinux,
  siManjaro, siPopos, siKalilinux, siGentoo,
  siVscodium, siDocker, siGit, siPython, siNodedotjs,
  siGo, siRust, siOpenjdk, siCplusplus, siPhp,
  siPostgresql, siMongodb, siRedis, siNginx, siApache,
  siMysql, siDiscord, siSpotify, siVlcmediaplayer,
  siFirefox, siGooglechrome, siObsidian, siSteam,
  siWindsurf, siGithub,
} from "simple-icons";

const words = ["Arch", "Ubuntu", "Fedora", "Debian", "Alpine", "Manjaro", "Pop!_OS", "Kali", "Gentoo"];
const apps = ["VS Code", "Docker", "Git", "Python", "Node.js", "Go", "Rust", "Java", "C++", "PHP", "PostgreSQL", "MongoDB", "Redis", "Nginx", "Apache", "MySQL", "Discord", "Spotify", "vlc", "Firefox", "Chrome", "Windsurf", "Obsidian", "Steam"];

const iconMap: Record<string, SimpleIcon> = {
  "Arch": siArchlinux,
  "Ubuntu": siUbuntu,
  "Fedora": siFedora,
  "Debian": siDebian,
  "Alpine": siAlpinelinux,
  "Manjaro": siManjaro,
  "Pop!_OS": siPopos,
  "Kali": siKalilinux,
  "Gentoo": siGentoo,
  "VS Code": siVscodium,
  "Docker": siDocker,
  "Git": siGit,
  "Python": siPython,
  "Node.js": siNodedotjs,
  "Go": siGo,
  "Rust": siRust,
  "Java": siOpenjdk,
  "C++": siCplusplus,
  "PHP": siPhp,
  "PostgreSQL": siPostgresql,
  "MongoDB": siMongodb,
  "Redis": siRedis,
  "Nginx": siNginx,
  "Apache": siApache,
  "MySQL": siMysql,
  "Discord": siDiscord,
  "Spotify": siSpotify,
  "vlc": siVlcmediaplayer,
  "Windsurf": siWindsurf,
  "Firefox": siFirefox,
  "Chrome": siGooglechrome,
  "Obsidian": siObsidian,
  "Steam": siSteam,
  "GitHub": siGithub,
};

function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [marqueeItems, setMarqueeItems] = useState([...words, ...apps]);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setMarqueeItems(shuffle([...words, ...apps]));
  }, []);

  useEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.scrollWidth);
    }
  }, [wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Animated sphere background — right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 py-32 lg:py-40 flex flex-col items-center text-center">
        {/* Main headline */}
        <div className="mb-8">
          <h1 
            className={`text-[clamp(3rem,10vw,8rem)] font-display leading-[0.95] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Rebuild your</span>
            <span className="flex items-end justify-center gap-6">
              <span
                className="relative inline-block transition-[width] duration-1500 ease-in-out overflow-visible"
                style={{ width: wordWidth > 0 ? wordWidth : undefined }}
              >
                <span 
                  ref={wordRef}
                  key={wordIndex}
                  className="inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
              </span>
              <span>Linux</span>
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <p 
          className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Tired of thousands of packages installation every time you switch distributions? Stop remembering packages and start building.
        </p>
        
        {/* CTAs */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
          >
            <Link href="/dashboard">
              Open dashboard
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
          >
            View on GitHub
            <BrandIcon icon={siGithub} className="w-4 h-4 ml-2 text-muted-foreground" />
          </Button>
        </div>
      </div>
      
      {/* Stats marquee - full width outside container */}
      <div 
        className={`absolute bottom-24 left-0 right-0 overflow-hidden transition-all duration-900 delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex" aria-hidden={i > 0}>
              {marqueeItems.map((item, idx) => (
                <div key={`${item}-${i}-${idx}`} className="flex items-center gap-3 pr-16">
                  {iconMap[item] ? (
                    <BrandIcon icon={iconMap[item]} className="w-7 h-7 lg:w-8 lg:h-8 shrink-0 text-muted-foreground/70" />
                  ) : (
                    <Terminal className="w-7 h-7 lg:w-8 lg:h-8 shrink-0 text-muted-foreground/70" />
                  )}
                  <span className="text-xl lg:text-2xl text-muted-foreground font-mono">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      
    </section>
  );
}
