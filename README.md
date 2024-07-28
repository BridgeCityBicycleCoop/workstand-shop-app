# 🚲 Workstand - Shop App

> **⚠️ CAUTION:** This project is under active development.

Workstand is a basic membership sign-in and bicycle management web application developed for the [Bridge City Bicycle Co-operative (BCBC)](https://bcbc.bike). It allows the BCBC to collect usage data for their shop. This helps with program planning, grant reporting, volunteer management, and more.

## 💻 Tech Stack

This app is developed using [Sveltekit](https://kit.svelte.dev/), [Typescript](https://www.typescriptlang.org/), [Superforms](https://superforms.rocks/), and [Pocketbase](https://pocketbase.io/).

## 🏃‍♂️ Quickstart

Follow these steps to get the project up and running on your machine.

### Setup Local Pocketbase DB

1. Create your own local `.env` file.

   - see `.env.example` for an reference.

2. Download and install [Pocketbase](https://pocketbase.io/docs/)
   - On macOS it's easiest to use [Homebrew](https://brew.sh/): `brew install pocketbase`
3. Start Pocketbase: `./pocketbase serve`
4. Go to the Admin UI (via the URL in your terminal).
5. It will prompt you to set up an email and password which will need to match your `.env` file.
6. Manually create a user record in the `users` collection.
7. Complete the development steps below, then login using the info created above.

### Development

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## 🚛 Deployment

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with:

```bash
`npm run preview`.
```

> **NOTE**: To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. You will also need a place to host the [Pocketbase](https://pocketbase.io/) server, which may be [anywhere pocketbase can be installed](https://pocketbase.io/docs/going-to-production/) but could also be a cloud provider like [pockethost.io](https://pockethost.io/) or [Fly.io](https://github.com/pocketbase/pocketbase/discussions/537).

## 🥰 Code of Conduct

All contributors and maintainers are required to adhere to the [Bridge City Bicycle Co-operative Policies](https://bcbc.bike/policies/). Please treat each other with the same respect and courtesy online as you would in person at the shop.

For questions, disputes, or clarifications, contact the BCBC Digital Committee at [digital@bridgecitybicyclecoop.com](mailto:digital@bridgecitybicyclecoop.com).

## 💌 Contribute

Workstand is currently under active development and is **not ready to accept contributions**. If you are interested in volunteering for the _BCBC Digital Committee_, please email [digital@bridgecitybicyclecoop.com](mailto:digital@bridgecitybicyclecoop.com) and we'd be happy to talk.
