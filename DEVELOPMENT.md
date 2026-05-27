# 🛠️ Developer Setup

This file contains instructions for setting up and running the backend of Hector's Portfolio projects locally. Only for personal development use.

## Environment Setup

1. Copy the example environment file:

```bash
cp server/.env.example server/.env
```

2. Open server/.env and fill in the required values (ports, DB credentials, API keys, etc.).

## Port Organization & PM2 Setup

- Each project is assigned a reserved 100-port block.
- Frontend traffic is served via port 80 through domain routing (Cloudflare Tunnel + nginx).
- Backend services start at the base port of each block.
- Additional microservices use +10, +20, etc. offsets.

| Project    | Frontend | Backend |
| ---------- | -------- | ------- |
| Portfolio  | 80       | 10000   |
| TEONTE     | 80       | 10100   |
| AlloyMeApp | 80       | 10200   |
| ...        | ...      | ...     |

> Some projects may only include a frontend, but the port range is still reserved.

**PM2 Management:**

- Start backend with PM2:

```bash
pm2 start server/server.js --name portfolio-backend
```

- Make it persistent on reboot:

```bash
pm2 save
pm2 startup
```

## Tips / Notes for Future

- Always check which ports are free before starting a new project.
- Keep a consistent naming convention for PM2 processes.
- Tunnel / proxy configuration (Cloudflare, `cloudflared`) should match the port setup.
- For local development, document your `.env` variables clearly.
- When moving the server to a new machine or network, verify:
  - PM2 processes are running.
  - `cloudflared` tunnel is active.
  - DNS records point to the correct hostnames.

- Keep this file updated whenever a new project or microservice is added.

### Cloudflare Tunnel (Mini-Guide)

- Purpose: Expose your local backend/frontend securely to the internet without opening ports in the router.
- Command to run:

```bash
cloudflared tunnel run portfolio
```

- Example config.example.yml:

```bash
tunnel: YOUR_TUNNEL_ID
credentials-file: /home/USER/.cloudflared/YOUR_TUNNEL_CREDENTIALS.json

ingress:
    # Portfolio
  - hostname: portfolio.hnezado.dev # (public domain)
    service: http://localhost:80    # (local server URL + port)
    # TEONTE
  - hostname: to-eat-or-not-to-eat.hnezado.dev  # (public domain)
    service: http://localhost:80                # (local server URL + port)
    # AlloyMeApp frontend/backend
  - hostname: alloy-me-app.hnezado.dev  # (public domain)
    service: http://localhost:80        # (local server URL + port)
  ...
    # Fallback
  - service: http_status:404
```
