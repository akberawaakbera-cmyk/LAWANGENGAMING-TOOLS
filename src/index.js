export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check and real database connection test
    if (url.pathname === "/api/health") {
      try {
        if (!env.DB) {
          return Response.json({
            success: false,
            app: "LAWANGEN FF",
            database: "binding missing"
          }, { status: 500 });
        }

        const result = await env.DB
          .prepare("SELECT 1 AS connected")
          .first();

        return Response.json({
          success: true,
          app: "LAWANGEN FF",
          database: result?.connected === 1
            ? "connected"
            : "connection failed"
        });
      } catch (error) {
        return Response.json({
          success: false,
          app: "LAWANGEN FF",
          database: "connection failed",
          error: error.message
        }, { status: 500 });
      }
    }

    // API fallback
    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        success: false,
        error: "API endpoint not found"
      }, { status: 404 });
    }

    // Serve website assets
    return env.ASSETS.fetch(request);
  }
};