"use client"

import { useStore } from "@/store/useStore"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// エラーメッセージを表示するダイアログ
export const ErrorDialog = () => {
  // ストアから取得
  const openErrorDialog = useStore((state) => state.openErrorDialog);
  const errorMessage = useStore((state) => state.errorMessage);
  const errorStatus = useStore((state) => state.errorStatus);
  const setOpenErrorDialog = useStore((state) => state.setOpenErrorDialog);
  const setErrorMessage = useStore((state) => state.setErrorMessage);
  const setErrorStatus = useStore((state) => state.setErrorStatus);

  // 戻るボタン押下後の処理
  const handleClick = () => {
    setErrorMessage(null);
    setErrorStatus(null);
    setOpenErrorDialog(false);
  };

  return (
    <Dialog
      open={openErrorDialog}
      sx={{
        p: 2
      }}>
      <DialogContent>
        {`
          ステータス：${errorStatus}
          メッセージ：${errorMessage}
        `}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClick}>
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  )
}