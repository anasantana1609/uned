import { StudyProvider } from "@/components/study-provider";
import { Shell } from "@/components/shell";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudyProvider user={null}>
      <Shell>{children}</Shell>
    </StudyProvider>
  );
}
