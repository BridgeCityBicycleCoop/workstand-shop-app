# Deploy Steps

- make sure your DNS settings contain A record exists to your domain/sub-domain that point to your VPS servers IP address, for example:

```sh
workstand.yourdomain.com A 56.34.23.66
```

## Single directory (VPS)

- Pocketbase is located at root of app in pb directory
- Pocketbase binary needs to match expected host environment (linux)
- Pocketbase will be managed as a systemctl service
- Caddy will be used to reverse proxy the app (make sure nginx is not also trying to do reverse proxy)
- Node will server the app via the server.js file and managed by PM2 process manager

## Pocketbase initial setup

- pull the repo locally

```sh
git clone git@github.com:BridgeCityBicycleCoop/workstand-2024.git workstand
```

- start the PB instance in your terminal

```sh
cd workstand/pb
pocketbase serve
```

- go to the local admin dashboard (not the underscore) `http:localhost:8090/_/`

- if using the seeded pocketbase starter db (pb_seed.zip), the admin user will already be set.
  u: `admin@pb.com`
  p :`allyourpocketbaseisbelongtous`

--- or setup a fresh pb instance ---

- setup your admin email and password (and any other users at this time, example: `staff`)
- you can stop the service after this with `crtl+c` at terminal

## PM2 basics

pm2 start server.js --name workstand --update-env
pm2 list
pm2 stop, start, restart <id> or <name>

## Envrionment variables

- your .env file on the VPS/server needs and ORIGIN setting for cross-origin posting and a POCKETBASE_URL (note, the .env file will not be pushed or pulled to your server and will need to be created on the server)

```sh
ORIGIN=https://subdomain.domain.com  # ex: workstand.bcbc.bike
POCKETBASE_URL=http://localhost:8090
```

## Pocketbase service

- create pocketbase.service /lib/systemd/service/pocketbase.service (see pocketbase.service sample)
- enable the pocketbase.service, start it, and check status

```sh
sudo systemctl enable pocketbase.service
sudo systemctl start pocketbase
systemctl is-active pocketbase
```

If status shows an error or is stuck at 'activating' make sure that your paths are correct in the pocketbase.service file and any sub-directories or file names (ec: /logs/acces.log) exist.

```sh
StandardOutput = append:/home/mitch/projects/workstand/pb/logs/access.log
StandardError  = append:/home/mitch/projects/workstand/pb/logs/errors.log
ExecStart      = /home/mitch/projects/workstand/pb/pocketbase serve
```

## Firewall

- make sure port 443 is open in the ufw firewall, and if using the VPS top level firewall, 443 needs to be opened there as well

```sh
sudo ufw allow 443/tcp
sudo ufw reload
sudo ufw status
```
