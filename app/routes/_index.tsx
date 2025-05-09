import type { MetaFunction } from "@remix-run/node";
import ResponsiveNav from "~/components/header/navbar/default/ResponsiveNav";
import Home from "./home/Home";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <ResponsiveNav />
      <Home />
    </div>
  );
}

