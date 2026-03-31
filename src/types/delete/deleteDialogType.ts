"use client"

export type DialogType = {
  openDeleteConfirmation: boolean,
  handleDelete: () => void,
  cancelDelete: () => void
};