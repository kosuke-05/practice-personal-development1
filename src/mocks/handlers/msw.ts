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
    return HttpResponse.json(tasks, { status: 200 });
  }),

  http.get("/api/task", ({ request }) => {
    // api層のURLを取得
    const url = new URL(request.url);

    // 社員名・部署名を取得
    const employeeName = url.searchParams.get("employeeName") ?? "";
    const departmentName = url.searchParams.get("departmentName") ?? "";

    // 配列から該当したデータを取得
    const result = tasks.filter(
      t => {
        const matchEmployeeName =
          !employeeName || t.employeeName.includes(employeeName);

        const matchDepartmentName =
          !departmentName || t.departmentName.includes(departmentName);

        return matchEmployeeName && matchDepartmentName;
      }
    );

    return HttpResponse.json(result, { status: 200 });
  }),

  http.put("/api/task/:id", async ({ params, request }) => {
    const body = (await request.json()) as InputTaskType;

    // idが合致するデータを検索
    tasks = tasks.map(
      t => t.id === params.id
      ? {...t, ...body}
      : t
    );

    return HttpResponse.json(body, { status: 200 });
  }),

  http.delete("/api/task/:id", async ({ params }) => {
    tasks = tasks.filter(t => t.id !== params.id);

    return new HttpResponse(null, { status: 204 });
  })
];