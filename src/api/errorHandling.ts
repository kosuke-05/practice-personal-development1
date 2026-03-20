"use client"

// API通信に失敗した場合の処理
export default function ErrorHandling(status: number) {
  let message;

  switch(status) {
    case 401:
      message = "認証できていない状態です。"
      break;

    case 404:
      message = "対象データが見つかりませんでした。"
      break;

    case 500:
      message = "サーバーエラーが発生しています。"
  };

  return message;
};