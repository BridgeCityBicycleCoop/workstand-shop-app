notes
ubuntu server
make sure nginx or no other reverse proxy is running/colliding with Caddy

use Caddy for https (see /etc/caddy/Caddyfile)

```bash
workstand.nomadiklabs.com {
    reverse_proxy localhost:3000
    request_body {
        max_size 10MB
    }
}
```

server app with node js/pm2
pm2 start server.js --name workstand --update-env
pm2 list
pm2 stop, start, restart <id> or <name>

.env needs ORIGIN=https://your.domain.com (or prepend node/pm2 command with it)
create pocketbase.service /lib/systemd/service, enable it, and set to auto restart
sudo systemctl enable pocketbase
sudo systemctl start pocketbase
systemctl is-active pocketbase

## Steps:

- create local linux/AMD pocketbase package (not ARM), setup admin and other users via local admin website, seed with backup data if you have it or just import the schemas.json for the collections
- rsync the pb binary and pb_data folders to your remote server (or pull down to it with git if you've cloned the repo)
- make sure server .env file exists in app root and has correct settings for ORIGIN and POCKETBASE_URL
- make sure deps are installed and app is built for production
- create server.js file to launch the prod built app, ex: /build/index.js
- make sure caddy, pm2/app, and pb are all started and on right ports
- make sure DNS A record exists for url, example workstand.yourdomain.com
- make sure node adaptor replaces auto adaptor in svelte.config, and is npm installed
- make sure VPS host and ufw firewall are open for port 443
  $ sudo ufw allow 443/tcp
  Restart the firewall to apply changes
  $ sudo ufw reload
  $ sudo ufw status
