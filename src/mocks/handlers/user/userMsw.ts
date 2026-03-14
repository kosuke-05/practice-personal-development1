import { UserValidationType } from "@/components/user/userRegisterDialog";
import {http, HttpResponse} from "msw";

const users: UserValidationType[] = [];

export const userHandlers = [
  // 登録処理
  http.post("/api/user", async ({ request }) => {
    const body =( await request.json()) as UserValidationType;
    const newUser = {
      id: crypto.randomUUID(),
      ...body
    };
    users.push(newUser);

    console.log("msw : 登録完了")

    return HttpResponse.json(newUser, { status: 201 });
  })
]