"use client"

// Errorを継承したカスタムエラークラス
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}