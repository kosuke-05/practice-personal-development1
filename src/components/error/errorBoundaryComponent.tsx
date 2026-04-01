"use client"

import { TaskContext } from "@/contexts/context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FallbackProps } from "react-error-boundary";

// 予期せぬエラーが発生した際のUI
export const ErrorBoundaryComponent = ({
  resetErrorBoundary
}: FallbackProps) => {
  // ルーターの取得
  const router = useRouter();

  // コンテキストの取得
  const context = useContext(TaskContext);
  if(!context) return null;

  return (
    <Box component="div">
      <Typography variant="h4">予期せぬエラーが発生しました</Typography>
      <Button
        variant="contained"
        onClick={() => {
          resetErrorBoundary();
          context.setPageStatus("normal");
          router.push("/");
        }}>
        ホーム画面に戻る
      </Button>
    </Box>
  )
};