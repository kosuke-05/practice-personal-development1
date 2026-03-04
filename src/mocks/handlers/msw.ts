import { InputTask } from "@/components/createTask";
import { HttpResponse, http } from "msw"

// データ配列
let tasks = [];

export const handlers = [
  http.post("/api/task", async ({ request }) => {
    console.log("MSW");
    // JSオブジェクトに変換
    const body = (await request.json()) as InputTask;

    // id番号を付与
    const newTask = { id: crypto.randomUUID(), ...body };

    // idを付与したデータをデータ配列に追加
    tasks.push(newTask);

    // JSオブジェクトに変換してreturn
    return HttpResponse.json(newTask, { status: 201 });
  })
]