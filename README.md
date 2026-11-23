# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Admin account and Gmail verification

Copy `.env.example` to `.env` for local development and set a strong `ADMIN_PASSWORD`.
The first successful admin sign-in initializes the server-side account file with a salted
scrypt password hash. The default login username is `admin`; the configured admin email
also works as the login identifier.

To send account-change verification codes through Gmail, enable 2-Step Verification on
the sender account, create a Google App Password, then set `SMTP_USER` and
`SMTP_APP_PASSWORD` in the server environment. Set `ADMIN_RECOVERY_EMAIL` to the inbox
that should receive the one-time codes. Never expose SMTP credentials in client-side
variables or commit them to source control.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
