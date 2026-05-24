import { createFileRoute } from "@tanstack/react-router";
import { ForgiveMeApp } from "@/components/forgive/ForgiveMeApp";

export const Route = createFileRoute("/")({
  component: ForgiveMeApp,
});
