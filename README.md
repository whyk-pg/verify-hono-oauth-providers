# Verify `@hono/oauth-providers/discord`

## 本リポジトリの目的
`@hono/oauth-providers/discord`を使ってDiscord IDによる認証基盤が作れるか確認したい

## 本リポジトリの達成目標
- [x] 環境構築
- [ ] Discord側と疎通させる
- [ ] 認証してユーザー情報が取得できることを確認する
- [ ] 特定のサーバーIDをもとに認可制御を行なう

## エラー解決
### redirect_uriの無効
https://502f-175-132-206-78.ngrok-free.app/auth/discord というURLでDiscord認証を試したところ、以下のURLになった

```
https://discord.com/oauth2/authorize?response_type=code&client_id=xxx&scope=identify+email+guilds&state=xxxx&prompt=consent&redirect_uri=http%3A%2F%2F502f-175-132-206-78.ngrok-free.app%2Fauth%2Fdiscord
```

その結果、`redirect_uri`が無効だと判定された
![`redirect_uri`が無効だというDiscord側のエラー画面](./.github/assets/discord_error.png)
しかし、redirect_uriを`https://～`に書き直したところ正常な認証画面に遷移し、そこでボタンを押すとまた`redirect_uri`が不正だとしてエラー画面に遷移した
![`redirect_uri`が無効だというアプリ側のエラー画面](./.github/assets/app_error.png)

## 参考資料
- [@hono/oauth-providers/discord](https://github.com/honojs/middleware/tree/main/packages/oauth-providers#discord)
