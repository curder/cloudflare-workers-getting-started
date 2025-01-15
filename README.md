# Cloudflare workers

```bash
# 创建项目
npm create cloudflare

# 本地执行数据库迁移 `cloudflare-workers-getting-started` 是数据库名
npx wrangler d1 execute cloudflare-workers-getting-started --local --file=seeders/create_todos_table.sql # 本地调试

# 创建数据库
npx wrangler d1 create cloudflare-workers-getting-started --location=apac
npx wrangler d1 execute cloudflare-workers-getting-started --remote --file=seeders/create_todos_table.sql # 推送到Cloudflare

# 本地开发
npm run start

# 部署项目
npm run deploy

# 使用 wrangler 登录
npx wrangler login

# 查看登录情况
npx wrangler whoami
```

## Apis

- GET `/api/v1/todos` 列表
- POST `/api/v1/todos` 新增
- PUT `/api/v1/todos/:todo` 更新
- DELETE `/api/v1/todos/:todo` 删除

官方文档：https://developers.cloudflare.com/workers/#more-resources

Hono 官方文档：https://hono.dev/
