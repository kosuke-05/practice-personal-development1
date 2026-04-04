import { InputTaskType } from "@/types/create/createType";

// 完了タスクを省く
export const omitDone = (data: InputTaskType[]) => {
  return [...(data ?? [])]
    .filter(
      (item) => item.taskStatus !== "done"
    );
};

// 直近の日付からソート
export const sortByDueDate = (data: InputTaskType[]) => {
  return [...(data ?? [])]
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
};

/**
 * ①空配列でもエラーにならない
 * ②進捗度が完了のタスクを省いて、かつ直近の日付から表示する
 * ③全て完了している場合は、空配列が返されるのか
 */
export const sortByDueDateAndOmitDone = (data: InputTaskType[]) => {
  return [...(data ?? [])]
    .filter(
      (item) => item.taskStatus !== "done"
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
};