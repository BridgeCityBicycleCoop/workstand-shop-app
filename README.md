# Workstand - Open Source management, tracking and reporting tool for non-profit memberhips, inventory, and activities.

## Setup Local Pocketbase DB on MacOS

Create your own local .env file - see `.env.example`
open your terminal

```bash
brew install pocketbase
/opt/homebrew/bin/pocketbase serve
```

Go to the Admin UI in your browser by command click the link in your terminal. It will prompt you to set up an email and password which will need to match your `.env` file.

Once there, manually create a user record in the `users` collection. After getting the dev steps completed below, you will be able to login using the info created above.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
