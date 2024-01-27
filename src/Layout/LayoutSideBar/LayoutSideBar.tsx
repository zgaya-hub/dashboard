import { Drawer, List, Stack, SxProps, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AnalyticsIcon, DashboardIcon, LinkIcon, PlayDoubleIcon, PlaySquareIcon, QuestionAnswerIcon, SettingIcon, UploadIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import useNavigation from "@/navigation/useNavigation";
import { SidebarItem, SidebarItemProps } from ".";
import { AuthenticatedRouteParams, useLocation } from "@/navigation";
import { useSidebarContext } from "@/context/SidebarContext";
import useTheme from "@/theme/Theme.context";

interface SidebarSectionProps {
  listItems: SidebarItemProps[];
}

function SidebarSection({ listItems }: Readonly<SidebarSectionProps>) {
  return (
    <Stack component={List} rowGap={1}>
      {listItems.map((item) => {
        return <SidebarItem key={item.label} label={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />;
      })}
    </Stack>
  );
}

export default function LayoutSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();
  const { isRootSidebarOpen, handleOnToggleRootSidebar } = useSidebarContext();
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [activeItem, setActiveItem] = useState<keyof AuthenticatedRouteParams>("/home");

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const sections: { sidebar: SidebarItemProps[]; footer: SidebarItemProps[] } = {
    sidebar: [
      {
        icon: <DashboardIcon />,
        label: t("Layout.Sidebar.home"),
        onClick: () => {
          navigation.navigate("/home");
        },
        isActive: activeItem.startsWith("/home"),
      },
      {
        icon: <AnalyticsIcon />,
        label: t("Layout.Sidebar.analytics"),
        onClick: () => {
          console.log("Analytics");
        },
        isActive: activeItem === t("Layout.Sidebar.analytics"),
      },
      {
        icon: <PlaySquareIcon />,
        label: t("Layout.Sidebar.movies"),
        onClick: () => {
          navigation.navigate("/movie");
        },
        isActive: activeItem.startsWith("/movie"),
      },
      {
        icon: <PlayDoubleIcon />,
        label: t("Layout.Sidebar.series"),
        onClick: () => {
          navigation.navigate("/series");
        },
        isActive: activeItem.startsWith("/series"),
      },
      {
        icon: <LinkIcon />,
        label: t("Layout.Sidebar.links"),
        onClick: () => alert(t("Layout.Sidebar.links")),
        isActive: activeItem === t("Layout.Sidebar.links"),
      },
      {
        icon: <UploadIcon />,
        label: t("Layout.Sidebar.uploads"),
        onClick: () => {},
        isActive: activeItem === t("Layout.Sidebar.uploads"),
        childrens: [
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.movie"),
            onClick: () => {
              navigation.navigate("/upload/movie");
            },
            isActive: activeItem.startsWith("/upload/movie"),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.trailer"),
            onClick: () => {
              navigation.navigate("/upload/trailer");
            },
            isActive: activeItem.startsWith("/upload/trailer"),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.episode"),
            onClick: () => {
              navigation.navigate("/upload/episode");
            },
            isActive: activeItem.startsWith("/upload/episode"),
          },
        ],
      },
    ],
    footer: [
      {
        icon: <SettingIcon />,
        label: t("Layout.Sidebar.settings"),
        onClick: () => alert(t("Layout.Sidebar.settings")),
        isActive: activeItem === t("Layout.Sidebar.settings"),
      },
      {
        icon: <QuestionAnswerIcon />,
        label: t("Layout.Sidebar.feedback"),
        onClick: () => alert(t("Layout.Sidebar.feedback")),
        isActive: activeItem === t("Layout.Sidebar.feedback"),
      },
    ],
  };

  const containerStyle: SxProps = {
    zIndex: 2,
    position: "fixed",
    top: 0,
    left: 0,
  };

  return (
    <Drawer variant={isSmallScreen ? "persistent" : "permanent"} sx={containerStyle} open={isRootSidebarOpen} onClose={handleOnToggleRootSidebar}>
      <Stack justifyContent={"space-between"} height={"100vh"}>
        <SidebarSection listItems={sections.sidebar} />
        <Stack pb={8}>
          <SidebarSection listItems={sections.footer} />
        </Stack>
      </Stack>
    </Drawer>
  );
}
