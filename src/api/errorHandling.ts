// API通信に失敗した場合の処理
export default function ErrorHandling(status: number): string {
  let message;

  switch(status) {
    case 400:
      message = "リクエストが不正である可能性があります。"
      break;

    case 401:
      message = "認証できていない状態です。"
      break;

    case 404:
      message = "対象データが見つかりませんでした。"
      break;

    case 409:
      message = "データが既に存在しています。";
      break;

    case 422:
      message = "入力内容に問題があります。";
      break;

    case 500:
      message = "サーバーエラーが発生しています。"
      break;

    default:
      message = "予期しないエラーが発生しました。"
  };

  return message;
};