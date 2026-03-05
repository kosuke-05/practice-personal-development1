"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreType = {
  
}

export const useStore = create<StoreType>() (
  persist(
    (set) => ({
      pageStatus: "normal",
    }),
    {
      name: "tasks-storage"
    }
  )
)