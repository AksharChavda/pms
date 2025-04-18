import { hc } from "hono/client";
import { AppTypes } from "@/app/api/[[...route]]/route";

export const client = hc<AppTypes>(process.env.NEXT_PUBLIC_URL!);