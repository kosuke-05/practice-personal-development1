"use client"

import { LogoutDialogType } from "@/types/user/userLogoutDialogType";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export const UserLogoutDialog = ({
  openUserLogoutDialog,
  setOpenUserLogoutDialog,
  handleLogoutYes
}: LogoutDialogType) => {

  return (
    <Dialog
      open={openUserLogoutDialog}
      onClose={() => setOpenUserLogoutDialog(false)}
      sx={{
        p: 2
      }}>
      <DialogTitle variant="h6">ログアウトしても宜しいですか？</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleLogoutYes}>
          はい
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenUserLogoutDialog(false)}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  )
};