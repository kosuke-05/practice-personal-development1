import { describe, expect, it } from "vitest";
import { renderComponent } from "./renderComponent.integration.test";
import userEvent from "@testing-library/user-event";;
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { useRouter } from "next/navigation";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

describe("タスク登録処理", () => {
  it("タスク登録処理の成功", async () => {
    renderComponent();

    // 入力
    await userEvent.type(
      screen.getByLabelText("タスク名"),
      "タスク名テスト"
    );

    await userEvent.type(
      screen.getByLabelText("タスク説明欄"),
      "タスク説明欄"
    );

    // 進捗度（MUI Select）
    const progressButton = screen.getByRole("button", { name: "進捗度" });
    await userEvent.click(progressButton);
    const notStartedOption = await screen.findByText("未着手");
    await userEvent.click(notStartedOption);

    // 優先度（MUI Select）
    const priorityButton = screen.getByRole("button", { name: "優先度" });
    await userEvent.click(priorityButton);
    const middleOption = await screen.findByText("中");
    await userEvent.click(middleOption);

    await userEvent.type(
      screen.getByRole("textbox", { name: "dueDate" }),
      "タスク期日"
    );

    await userEvent.type(
      screen.getByLabelText("社員名"),
      "社員名"
    );

    await userEvent.selectOptions(
      screen.getByLabelText("部署名"),
      "sales"
    );

    await userEvent.click(
      screen.getByRole("button", { name: "登録" })
    );

    // 期待値
    expect(mockPush).toHaveBeenCalledWith("/");
  });
})