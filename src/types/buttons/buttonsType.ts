"use client"

import { InputTaskType } from "../create/createType";

// 編集ボタン
export type EditButtonType = {
  item: InputTaskType,
  handleEdit: (item: InputTaskType) => void
};

// 削除ボタン
export type DeleteButtonType = {
  id: string,
  deleteStart: (id: string) => void
};

// 削除【はい】ボタン
export type DeleteYesButtonType = {
  onClick: () => void
};

// 削除【いいえ】ボタン
export type DeleteNoButtonType = {
  onClick: () => void
};

// 検索ボタン
export type SearchButtonType = {
  onClick: () => void
};

