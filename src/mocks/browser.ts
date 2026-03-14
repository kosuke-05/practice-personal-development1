import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/msw";
import { userHandlers } from "./handlers/user/userMsw";


export const worker = setupWorker(...handlers, ...userHandlers);