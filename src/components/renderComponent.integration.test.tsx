import { TaskContext } from "@/contexts/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { CreateTasks } from "./createTask";

export const renderComponent = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <TaskContext.Provider value={{
        pageStatus: "create",
        setPageStatus: vi.fn(),
        editData: {
          id: "",
          taskName: "",
          taskDescription: "",
          taskStatus: "",
          taskPriority: "",
          dueDate: "",
          employeeName: "",
          departmentName: ""
        },
        setEditData: vi.fn()
      }}>
        <CreateTasks />
      </TaskContext.Provider>
    </QueryClientProvider>
  )
};