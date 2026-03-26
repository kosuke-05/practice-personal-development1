"use client"

export const paginationApi = async (
  {
    pageNumber,
    taskPerPage
  } : {
    pageNumber: number,
    taskPerPage: number
  }
) => {
  // クエリパラメータの作成
  const params = new URLSearchParams();

  if(pageNumber) params.append("pageNumber", String(pageNumber));
  if(taskPerPage) params.append("taskPerPage", String(taskPerPage));

  const res = await fetch(`/api/pagination?${params}`);

  return res.json();
};