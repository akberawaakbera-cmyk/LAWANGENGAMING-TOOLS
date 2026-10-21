export default {
async fetch(request, env) {
const url = new URL(request.url);

if (url.pathname === "/api/health") {
  return Response.json({
    success: true,
    app: "LAWANGEN FF",
    database: env.DB ? "binding configured" : "binding missing"
  });
}
return env.ASSETS.fetch(request);

}
};