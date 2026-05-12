import { Navigation } from "@/components/landing/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {/* Clear fixed header (nav inner height h-20 when not scrolled) */}
      <div className="pt-20">{children}</div>
    </>
  );
}
