"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { FallbackProps } from "react-error-boundary";

// 予期せぬエラーが発生した際のUI
export const ErrorBoundaryComponent = ({
  resetErrorBoundary
}: FallbackProps) => {
  // ルーターの取得
  const router = useRouter();

  return (
    <Box component="div">
      <Typography variant="h4">予期せぬエラーが発生しました</Typography>
      <Button
        variant="contained"
        onClick={() => {
          resetErrorBoundary();
          window.location.reload();
        }}>
        ホーム画面に戻る
      </Button>
    </Box>
  )
};