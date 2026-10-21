// Contract fixture for the CLI process: no requests can leave the test process.
globalThis.fetch = async (input, options) => {
  const u = new URL(String(input));
  if (u.origin !== "https://fixture.supabase.co")
    throw new Error("Unexpected fixture destination");
  if (!options?.headers?.apikey?.startsWith("sb_publishable_"))
    throw new Error("Expected public API header");
  if (u.pathname === "/auth/v1/settings")
    return Response.json({
      external: { email: process.env.UNED_CHECK_FIXTURE !== "email-disabled" },
    });
  if (u.pathname.startsWith("/rest/v1/")) {
    if (process.env.UNED_CHECK_FIXTURE === "anonymous-readable")
      return Response.json([]);
    return Response.json(
      { code: "42501", message: "Permission denied" },
      { status: 401 },
    );
  }
  throw new Error("Unexpected fixture endpoint");
};
