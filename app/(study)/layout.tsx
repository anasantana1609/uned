import { serverClient } from "@/lib/supabase/server";
import { StudyProvider } from "@/components/study-provider";
import { Shell } from "@/components/shell";
export const dynamic = "force-dynamic";
export default async function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await serverClient();
  const user = client ? (await client.auth.getUser()).data.user : null;
  return (
    <StudyProvider
      user={
        user
          ? {
              id: user.id,
              email: user.email ?? "",
              name:
                typeof user.user_metadata?.full_name === "string"
                  ? user.user_metadata.full_name
                  : "",
            }
          : null
      }
    >
      <Shell>{children}</Shell>
    </StudyProvider>
  );
}
