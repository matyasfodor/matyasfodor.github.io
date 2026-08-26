# Getting Started with Create React App

## QR redirect tracker

`/go/[slug]` is a privacy-minimal QR redirect endpoint. Each successful `GET`
atomically increments one Redis integer named `qr:hits:<slug>`, then returns an
HTTP 302 redirect. It does not store IP addresses, user agents, referrers,
cookies, or individual visit records. Counter failures are logged but do not
prevent the redirect.

Configure these server-only environment variables in Vercel:

```dotenv
QR_REDIRECTS_JSON={"futas":"https://www.facebook.com/events/YOUR_EVENT_ID"}
UPSTASH_REDIS_REST_REDIS_URL=redis://default:YOUR_TOKEN@YOUR_DATABASE:6379
```

Create or connect a Redis database from the Vercel Marketplace and set its
authenticated connection string as `UPSTASH_REDIS_REST_REDIS_URL`; redeploy after connecting it.
Add `QR_REDIRECTS_JSON` for Production (and Preview/Development if wanted), then
redeploy. Changing a value in that JSON map and redeploying changes the target
without changing a printed QR containing, for example,
`https://matyasfodor.com/go/futas`.

The total can be read in the Upstash console with `GET qr:hits:futas`. A `HEAD`
request redirects without incrementing the count, so uptime checks and link
previews do not inflate it.

### Local redirect tracker

Local development uses Docker Compose to run Redis. Docker must be running.

Set the local redirect destinations once, then start the full stack:

```bash
cp .env.example .env.local
# Edit QR_REDIRECTS_JSON in .env.local.
npm run dev:local
```

Stopping the Next.js process also stops the containers. Redis data persists in
the `qr-redis-data` Docker volume. Inspect the counter with:

```bash
npm run redis:cli -- GET qr:hits:futas
```

Use `npm run dev` when Redis and hit counting are not needed. Production still
uses the authenticated `UPSTASH_REDIS_REST_REDIS_URL` configured in Vercel.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
