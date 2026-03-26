"use client"

import { paginationHooks } from "@/hooks/paginationHooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

// ページネーション
type PaginationComponentType = {
  pageNumber: number,
  setPageNumber: Dispatch<SetStateAction<number>>,
  totalPage: number,
  taskPerPage: number
};

export const PaginationComponent = ({
  pageNumber,
  setPageNumber,
  totalPage,
  taskPerPage
}: PaginationComponentType) => {

  return (
    <Box
      component="div"
      sx={{
        mt: "10px",
        display: "flex",
        justifyContent: "center"
      }}>
      <Button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}>
        前へ
      </Button>
      {[...Array(totalPage)].map((_, i) => {
        const page = i + 1;

        return (
          <Button
            key={i}
            variant="text"
            onClick={() => setPageNumber(page)}
            sx={{
              fontWeight: pageNumber === page ? "bold" : "normal"
            }}>
            {page}
          </Button>
        )
      })}
      <Button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === totalPage}>
        次へ
      </Button>
    </Box>
  )
};