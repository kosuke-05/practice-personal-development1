"use client"

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TaskContext } from "@/contexts/context";
import { useRouter } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStore } from "@/store/useStore";
import { PromptLoginDialog } from "./detail/promptLoginDialog";
import { drawerMenu } from "@/types/drawer/drawerMenu";

// ドロワー（全画面固定）
export const DrawerComponent = () => {
  // デバイスがPC以上の時は、ドロワーを固定
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // コンテキストの取得
  const context = useContext(TaskContext);
  if(!context) return null;

  // ルーターの取得
  const router = useRouter();

  // ストアから取得
  const loginData = useStore((state) => state.loginData);
  const authStatus = useStore((state) => state.authStatus);

  // ログインを促すダイアログの開閉状態
  const [openPromptLoginDialog, setOpenPromptLoginDialog] = useState<boolean>(false);

  /**
   * ドロワーメニュー一覧
   * ・ホーム（一覧画面）
   * ・新規登録
   *
   * ・詳細
   * ①ログイン情報が存在するかの判定
   * --- 情報が存在する場合 ---
   * ・社員名・部署名で照合とる
   *
   * --- 情報が存在しない場合 ---
   * ・ログインするように促す（ダイアログの開閉状態をtrueにする）
   *
   * ・設定
   */
  const handleDetail = () => {
    if(loginData) {
      router.push("/detail");
    } else {
      setOpenPromptLoginDialog(true);
    }
  }

  const menuList: drawerMenu[] = [
    { name: "ホーム（一覧画面）", icon: <HomeIcon />,
      action: () => {
        context.setPageStatus("normal");
        router.push("/");
      }
    },
    { name: "新規登録", icon: <AddIcon />,
      action: () => {
        context.setPageStatus("create");
        router.push("/create");
      }},
    { name: "詳細", icon: <AccountCircleIcon />,
      action: () => {
        if(authStatus === "loggedIn") {
          context.setPageStatus("detail");
        }
        handleDetail();
      }
    },
    { name: "設定", path: "/", icon: <SettingsIcon /> }
  ];

  return (
    <>
      <Drawer
        open={isDesktop}
        variant={isDesktop ? "permanent" : "temporary"}
        PaperProps={{
          sx: {
            width: 250,
            p: 1,
            flexShrink: 0,
            mt:
              context.pageStatus === "normal"
              ? "64px"
              : "0px"
          }
        }}>
        <List>
          {menuList.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => {
                  if(item.action) {
                    item.action();
                  } else if(item.path) {
                    router.push(item.path);
                  }
                }
              }>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/** ログインを促すダイアログ */}
      <PromptLoginDialog
        openPromptLoginDialog={openPromptLoginDialog}
        setOpenPromptLoginDialog={setOpenPromptLoginDialog} />
    </>
  )
};