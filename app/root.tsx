import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { AuthProvider } from "./context/AuthContext";
import { AOSProvider } from "./context/AOSContext";
import React, { useEffect } from "react";
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import EditPhotoDialog from "./routes/account/pages/business/pages/gallery/gallery/EditPhotoDialog";
import { EditPhotoDialogProvider } from "./context/EditPhotoDialogContext";
import { AddPhotoDialogProvider } from "./context/AddPhotoDialogContext";
import { SliderProvider } from "./context/SliderContext";
import { NotificationProvider } from "./context/NotificationContext";

//React.useLayoutEffect = React.useEffect
if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()

  useEffect(() => {


    NProgress.start()

    const holdWait = async () => {
      await new Promise((resolve) => setTimeout(resolve, 13000));
    }

    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();

      }
    }
  }, [navigation])
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NotificationProvider>
          <SliderProvider>
            <EditPhotoDialogProvider>
              <AddPhotoDialogProvider>
                <AOSProvider>
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                </AOSProvider>
              </AddPhotoDialogProvider>
            </EditPhotoDialogProvider>
          </SliderProvider>
        </NotificationProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
