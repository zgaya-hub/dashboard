import { Stack, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Menu, Sidebar } from "react-pro-sidebar";
import SidebarItem, { SidebarItemProps } from "./SideBarItem";
import useSidebar from "@/context/Sidebar.context";
import { CollapsedSideBarUserCard, ExpandSideBarUserCard } from "./SideBarUserCard";
import { AnalyticsIcon, DashboardIcon, LinkIcon, PlayDoubleIcon, PlaySquareIcon, QuestionAnswerIcon, SettingIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CSSProperties, useState } from "react";

interface SideBarSectionProps {
  listItems: SidebarItemProps[];
}

function SideBarSection({ listItems }: SideBarSectionProps) {
  return (
    <Menu>
      {listItems.map((item) => {
        return <SidebarItem key={item.label} label={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />;
      })}
    </Menu>
  );
}

export default function LayoutSideBar() {
  const [activeItemLabel, setActiveItemLabel] = useState("");
  const { t } = useTranslation();
  const { isCollapsed } = useSidebar();

  const sections = {
    sidebar: [
      {
        icon: <DashboardIcon />,
        label: t("Layout.Sidebar.dashboard"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.dashboard")),
        isActive: activeItemLabel === t("Layout.Sidebar.dashboard"),
      },
      {
        icon: <AnalyticsIcon />,
        label: t("Layout.Sidebar.analytics"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.analytics")),
        isActive: activeItemLabel === t("Layout.Sidebar.analytics"),
      },
      {
        icon: <PlaySquareIcon />,
        label: t("Layout.Sidebar.manageMovie"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.manageMovie")),
        isActive: activeItemLabel === t("Layout.Sidebar.manageMovie"),
      },
      {
        icon: <PlayDoubleIcon />,
        label: t("Layout.Sidebar.manageSeries"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.manageSeries")),
        isActive: activeItemLabel === t("Layout.Sidebar.manageSeries"),
      },
      {
        icon: <LinkIcon />,
        label: t("Layout.Sidebar.socialLinking"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.socialLinking")),
        isActive: activeItemLabel === t("Layout.Sidebar.socialLinking"),
      },
    ],
    footer: [
      {
        icon: <SettingIcon />,
        label: t("Layout.Sidebar.settings"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.settings")),
        isActive: activeItemLabel === t("Layout.Sidebar.settings"),
      },
      {
        icon: <QuestionAnswerIcon />,
        label: t("Layout.Sidebar.askAnyQuestion"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.askAnyQuestion")),
        isActive: activeItemLabel === t("Layout.Sidebar.askAnyQuestion"),
      },
    ],
  };

  const containerStyle: CSSProperties = {
    zIndex: 2,
    position: "fixed",
    top: 0,
    left: 0,
  };

  const footerStyles = useThemeStyles<SxProps>((theme) => ({
    paddingBottom: theme.spacing(10)
  }));

  const sideBarBackground = useThemeStyles((theme) => theme.palette.background.default);

  return (
    <Sidebar collapsed={isCollapsed} style={containerStyle} backgroundColor={sideBarBackground}>
      <Stack justifyContent={"space-between"} height={"100vh"}>
        <Stack gap={1}>
          {isCollapsed ? <CollapsedSideBarUserCard /> : <ExpandSideBarUserCard />}
          <SideBarSection listItems={sections.sidebar} />
        </Stack>
        <Stack sx={footerStyles}>
          <SideBarSection listItems={sections.footer} />
        </Stack>
      </Stack>
    </Sidebar>
  );
}
