declare module "bun" {
  interface Env {
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}