import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyleUrl from './styles/global.css';
import buttonStyleUrl from './styles/button.css';
import cardStyleUrl from './styles/card.css';
import dropdownStyleUrl from './styles/dropdown.css';
import headerStyleUrl from './styles/header.css';
import inputStyleUrl from './styles/input.css';
import modalStyleUrl from './styles/modal.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyleUrl },
  { rel: 'stylesheet', href: buttonStyleUrl },
  { rel: 'stylesheet', href: cardStyleUrl },
  { rel: 'stylesheet', href: dropdownStyleUrl },
  { rel: 'stylesheet', href: headerStyleUrl },
  { rel: 'stylesheet', href: inputStyleUrl },
  { rel: 'stylesheet', href: modalStyleUrl },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
