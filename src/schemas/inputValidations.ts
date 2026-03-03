import * as z from "zod";

// タスク名
export const schemas = z.object({
  // タスク名
  taskName:
    z.string()
    .min(2, {
      message: "2文字以上入力して下さい。"
    }),

  // タスク説明
  taskDescription:
    z.string()
    .optional(),

  // タスク進捗
  taskStatus:
    z.enum(["not-started", "in-progress", "done"])
    .or(z.literal(""))
    .refine(v => v !== "", {
      message: "いずれかを選択して下さい"
    }),

  // タスク優先度
  taskPriority:
    z.enum(["low", "middle", "high"])
    .or(z.literal(""))
    .refine(v => v !== "", {
      message: "いずれかを選択して下さい"
    }),

  // 期限
  dueDate:
    z.string()
    .refine(v => v !== "", {
      message: "提出期限を入力して下さい"
    })
});