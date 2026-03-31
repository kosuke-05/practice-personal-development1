import { UserValidationType } from "@/types/user/userRegisterDialogType";
import { http, HttpResponse } from "msw";

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
  }),

  // 認証処理
  http.post("/api/user/login", async ({ request }) => {
    const body = (await request.json()) as Omit<UserValidationType, "employeeName" | "departmentName">;

    const matchData = users.find(
      u =>
        u.mailAddress === body.mailAddress &&
        u.password === body.password
    );

    // 合致するデータが存在しない場合
    if(!matchData) {
      return HttpResponse.json(
        { message : "Unauthorized" },
        { status: 401 }
      )
    }

    return HttpResponse.json(matchData);
  })
];