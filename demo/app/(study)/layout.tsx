import { StaticStudyGate } from "@/components/static-study-gate";
export default function HostedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaticStudyGate>{children}</StaticStudyGate>;
}
