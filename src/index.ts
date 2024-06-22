import { discordAuth } from "@hono/oauth-providers/discord";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/auth/discord",
  discordAuth({
    client_id: Bun.env.CLIENT_ID,
    client_secret: Bun.env.CLIENT_SECRET,
    scope: ["identify", "email", "guilds"],
  }),
);

app.get("/auth/discord", (c) => {
  const token = c.get("token");
  const refreshToken = c.get("refresh-token");
  const grantedScopes = c.get("granted-scopes");
  const user = c.get("user-discord");

  return c.json({
    token,
    refreshToken,
    grantedScopes,
    user,
  });
});

export default app;
