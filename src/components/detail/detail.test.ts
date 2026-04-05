import { InputTaskType } from "@/types/create/createType";
import { describe, expect, it } from "vitest";
import { omitDone, sortByDueDate, sortByDueDateAndOmitDone } from "./detailUtil";

// 仮想データ
const tasks: InputTaskType[] = [
  {id: "1", taskName: "業務A", taskDescription: "", taskStatus: "inProgress", taskPriority: "low", dueDate: "2025-01-01", employeeName: "開発太郎", departmentName: "development"},
  {id: "2", taskName: "業務B", taskDescription: "", taskStatus: "done", taskPriority: "low", dueDate: "2024-01-01", employeeName: "営業次郎", departmentName: "sales"},
  {id: "3", taskName: "業務C", taskDescription: "", taskStatus: "inProgress", taskPriority: "middle", dueDate: "2025-01-05", employeeName: "営業三郎", departmentName: "sales"}
];

const allDoneTasks: InputTaskType[] = [
  {id: "1", taskName: "業務A", taskDescription: "", taskStatus: "done", taskPriority: "low", dueDate: "2025-01-01", employeeName: "開発太郎", departmentName: "development"},
  {id: "2", taskName: "業務B", taskDescription: "", taskStatus: "done", taskPriority: "low", dueDate: "2024-01-01", employeeName: "営業次郎", departmentName: "sales"},
  {id: "3", taskName: "業務C", taskDescription: "", taskStatus: "done", taskPriority: "middle", dueDate: "2025-01-05", employeeName: "営業三郎", departmentName: "sales"}
]

describe("【単体テスト】タスクの表示について", () => {
  it("完了タスクを省く", () => {
    const result = omitDone(tasks);

    expect(result).toEqual([
      {id: "1", taskName: "業務A", taskDescription: "", taskStatus: "inProgress", taskPriority: "low", dueDate: "2025-01-01", employeeName: "開発太郎", departmentName: "development"},
      {id: "3", taskName: "業務C", taskDescription: "", taskStatus: "inProgress", taskPriority: "middle", dueDate: "2025-01-05", employeeName: "営業三郎", departmentName: "sales"}
    ]);
  });

  it("直近の日付から出力", () => {
    const result = sortByDueDate(tasks);

    expect(result).toEqual([
      {id: "2", taskName: "業務B", taskDescription: "", taskStatus: "done", taskPriority: "low", dueDate: "2024-01-01", employeeName: "営業次郎", departmentName: "sales"},
      {id: "1", taskName: "業務A", taskDescription: "", taskStatus: "inProgress", taskPriority: "low", dueDate: "2025-01-01", employeeName: "開発太郎", departmentName: "development"},
      {id: "3", taskName: "業務C", taskDescription: "", taskStatus: "inProgress", taskPriority: "middle", dueDate: "2025-01-05", employeeName: "営業三郎", departmentName: "sales"}
    ]);
  });

  it("空配列でもエラーにならない", () => {
    const array: InputTaskType[] = [];

    expect(sortByDueDateAndOmitDone(array)).toEqual([])
  });

  it("進捗度が完了のタスクを省いて、かつ直近の日付から表示する", () => {
    const result = sortByDueDateAndOmitDone(tasks);

    expect(result).toEqual([
      {id: "1", taskName: "業務A", taskDescription: "", taskStatus: "inProgress", taskPriority: "low", dueDate: "2025-01-01", employeeName: "開発太郎", departmentName: "development"},
      {id: "3", taskName: "業務C", taskDescription: "", taskStatus: "inProgress", taskPriority: "middle", dueDate: "2025-01-05", employeeName: "営業三郎", departmentName: "sales"}
    ])
  });

  it("全て完了している場合、空配列が返されるのか", () => {
    const result = sortByDueDateAndOmitDone(allDoneTasks);

    expect(result).toEqual([]);
  });
});