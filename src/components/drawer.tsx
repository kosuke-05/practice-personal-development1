"use client"

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode, useContext } from "react";
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

// メニュー型
type drawerMenu = {
      name: string,
      path?: string,
      icon: ReactNode,
      action?: () => void
};

// ドロワー（全画面固定）
export const DrawerComponent = () => {
  // デバイスがPC以上の時は、ドロワーを固定
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // コンテキストの取得
  const context = useContext(TaskContext);
  if(!context) return;

  // ルーターの取得
  const router = useRouter();

  /**
   * ドロワーメニュー一覧
   * ・ホーム（一覧画面） 
   * ・新規登録
   * ・設定
   */
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
    { name: "設定", path: "/", icon: <SettingsIcon /> }
  ];

  return (
    <Drawer
      open={isDesktop}
      variant={isDesktop ? "permanent" : "temporary"}
      PaperProps={{
        sx: {
          width: 250,
          p: 1,
          flexShrink: 0,
          mt: "64px"
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
  )
};