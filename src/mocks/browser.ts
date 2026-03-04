import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/msw";


export const worker = setupWorker(...handlers);