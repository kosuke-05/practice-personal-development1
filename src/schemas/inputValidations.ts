import * as z from "zod";

// タスク名
const taskNameSchema = z.object({
  taskName:
    z.string()
    .min(2, {
      message: "2文字以上入力して下さい。"
    })
});

// タスク説明
const taskDescriptionSchema = z.object({
  taskDescription:
    z.string()
    .optional()
});

// タスク進捗
const taskStatusSchema = z.object({
  taskStatus:
    z.enum(["not-started", "in-progress", "done"])
    .or(z.literal(""))
    .refine(v => v !== "", {
      message: "いずれかを選択して下さい"
    })
});

// 優先度
const taskPrioritySchema = z.object({
  taskPriority:
    z.enum(["low", "middle", "high"])
    .or(z.literal(""))
    .refine(v => v !== "", {
      message: "いずれかを選択して下さい"
    })
});

// 期限
const taskDueDateSchema = z.object({
  dueDate:
    z.string()
    .refine(v => v !== "", {
      message: "提出期限を入力して下さい"
    })
});

export const schema = taskNameSchema
.and(taskDescriptionSchema)
.and(taskStatusSchema)
.and(taskPrioritySchema)
.and(taskDueDateSchema);