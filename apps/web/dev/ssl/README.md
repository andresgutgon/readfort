## Why We Need SSL in Development?

Chrome extension content scripts require two security measures from your server to allow requests from other web pages:

1. Configure CORS to permit requests from specific websites. In this case, we're focusing on all Kindle online domains.
2. Ensure NextJS Auth writes the session cookie with `SameSite=None`. You can learn more about this setting [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).

About `SameSite=None`:

> This indicates that the browser should send the cookie with both cross-site and same-site requests. The cookie must be flagged as Secure, like so: `SameSite=None; Secure`.

The term 'secure' here implies the need for `https` on your server. We're configuring SSL for our local development Next.js app to allow the next-auth session cookie to be set as `SameSite=None`. This is essential for enabling the cookie to be accessible from the Chrome extension.

### Note About Security

The [NextAuth documentation](https://next-auth.js.org/configuration/options#cookies) advises against modifying the default cookie configuration. However, it seems necessary in order to achieve cross-site sessions, which is a requirement for our app. With proper CORS setup and restrictions on which sites can read the session cookies, the configuration should remain secure.

> Customizing the cookie policy may expose your application to security risks and is meant for advanced users who are aware of the consequences. It is generally not recommended to use this feature.

Instead of this warning, a detailed guide on secure `SameSite=None` configuration might be more helpful. An addition to pass this setting without needing to override the entire cookie configuration would be beneficial.

## How to Set Up SSL in Development?

We use [mkcert](https://github.com/FiloSottile/mkcert) and [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy) for SSL setup.

`mkcert`: A tool for generating a local SSL certificate that your system will trust. Its simplicity is key. If anything is unclear, refer to their repository's README.
`local-ssl-proxy`: Instead of setting up a reverse proxy with Traefik/Nginx in a Docker environment, which could complicate Node server debugging, we use this for simplicity, especially when debugging from the editor.

### SSL in Development with mkcert

Follow these steps to enable SSL on your local machine.
Generate a local SSL certificate using [mkcert](https://github.com/FiloSottile/mkcert), which can be installed via Homebrew on macOS.

Execute the following:

```
cd ~/code/apps/web/ssl/certificates
mkcert readfort.dev
```

Edit your `/etc/hosts` file to map the domain to your local IP address:

```bash
127.0.0.1	readfort.dev
```

Start your Next.js development server as usual:

```
pnpm dev
```

In another terminal, start the https proxy:

```
pnpm ssl
```

In your `.env` file, specify the SSL local proxy domain for Next Auth:

```
NEXTAUTH_URL='https://localhost:3001'
```

This tells Next.js Auth to recognize the SSL proxy domain `https://localhost:3001` as the app domain, instead of the actual Next.js domain `http://localhost:3000`. Refer to the configuration in `./ssl/config.json`.

# Articles

### About Cookies and Host Permissions

The Chrome extensions documentation can be unclear. The following article helped clarify the concepts of host permissions and cookies for me:
https://www.gmass.co/blog/send-cookie-cross-origin-xmlhttprequest-chrome-extension/

1. Host permissions: We request user consent to perform actions on a specific host. This might be unnecessary for API interaction because we can make requests via AJAX without explicit permission to access our own server.
2. Cookie permissions in `manifest.json` are not for sending cookies through AJAX. They're for interacting with the site's cookies using the Chrome API `chrome.cookies`.
