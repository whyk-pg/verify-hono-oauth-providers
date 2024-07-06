import { discordAuth } from "@hono/oauth-providers/discord";
import { githubAuth } from "@hono/oauth-providers/github";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/auth/discord",
  discordAuth({
    client_id: Bun.env.DISCORD_CLIENT_ID,
    client_secret: Bun.env.DISCORD_CLIENT_SECRET,
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

app.use("/auth/github", githubAuth({
  client_id: Bun.env.GITHUB_CLIENT_ID,
  client_secret: Bun.env.GITHUB_CLIENT_SECRET,
  scope: ["public_repo", "read:user", "user", "read:org"],
  oauthApp: true,
}))

app.get("/auth/github", async (c) => {
  const token = c.get("token");
  const refreshToken = c.get('refresh-token')
  const grantedScopes = c.get("granted-scopes")
  const user = c.get("user-github");

  return c.json({
    token,
    refreshToken,
    grantedScopes,
    user,
  });
});

export default app;
