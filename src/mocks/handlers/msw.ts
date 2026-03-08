import { InputTask, InputTaskType } from "@/components/createTask";
import { HttpResponse, http } from "msw"

// データ配列
let tasks: InputTaskType[] = [];

export const handlers = [
  http.post("/api/task", async ({ request }) => {
    // JSオブジェクトに変換
    const body = (await request.json()) as InputTask;

    // id番号を付与
    const newTask = { id: crypto.randomUUID(), ...body };

    // idを付与したデータをデータ配列に追加
    tasks.push(newTask);

    // JSオブジェクトに変換してreturn
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.get("/api/tasks", () => {
    return HttpResponse.json(tasks)
  }),

  http.put("/api/task/:id", async ({ params, request }) => {
    const body = (await request.json()) as InputTaskType;

    // idが合致するデータを検索
    tasks = tasks.map(
      t => t.id === params.id
      ? {...t, ...body}
      : t
    );

    return HttpResponse.json({ ok : true });
  })
]