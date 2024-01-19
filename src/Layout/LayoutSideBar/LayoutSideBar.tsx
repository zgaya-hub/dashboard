import { Stack, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { AnalyticsIcon, DashboardIcon, LinkIcon, PlayDoubleIcon, PlaySquareIcon, QuestionAnswerIcon, SettingIcon, UploadIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CSSProperties, useEffect, useState } from "react";
import useNavigation from "@/navigation/useNavigation";
import SidebarItem, { SidebarItemProps } from "./SidebarItem";
import { CollapsedSidebarUserCard, ExpandSidebarUserCard } from "./SidebarUserCard";
import { AuthenticatedRouteParams, useLocation } from "@/navigation";

interface SidebarSectionProps {
  listItems: SidebarItemProps[];
}

function SidebarSection({ listItems }: SidebarSectionProps) {
  const subMenuSection = (item: SidebarItemProps) => {
    return (
      <SubMenu label={item.label} icon={item.icon}>
        {item.childrens?.map((item) => {
          if (item.childrens) {
            subMenuSection(item);
          }
          return <SidebarItem key={item.label} label={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />;
        })}
      </SubMenu>
    );
  };

  return (
    <Menu>
      {listItems.map((item) => {
        if (item.childrens) {
          return subMenuSection(item);
        }
        return <SidebarItem key={item.label} label={item.label} onClick={item.onClick} isActive={item.isActive} icon={item.icon} />;
      })}
    </Menu>
  );
}

export default function LayoutSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigation();
  const [activeItem, setActiveItem] = useState<keyof AuthenticatedRouteParams>("/home");
  const [isHovered] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const sections: { sidebar: SidebarItemProps[]; footer: SidebarItemProps[] } = {
    sidebar: [
      {
        icon: <DashboardIcon />,
        label: t("Layout.Sidebar.dashboard"),
        onClick: () => {
          navigation.navigate("/home");
        },
        isActive: activeItem.startsWith('/home'),
      },
      {
        icon: <AnalyticsIcon />,
        label: t("Layout.Sidebar.analytics"),
        onClick: () => {
          alert("Analytics");
        },
        isActive: activeItem === t("Layout.Sidebar.analytics"),
      },
      {
        icon: <PlaySquareIcon />,
        label: t("Layout.Sidebar.manageMovie"),
        onClick: () => {
          navigation.navigate("/movie");
        },
        isActive: activeItem === t("Layout.Sidebar.manageMovie"),
      },
      {
        icon: <PlayDoubleIcon />,
        label: t("Layout.Sidebar.manageSeries"),
        onClick: () => {
          navigation.navigate("/series");
        },
        isActive: activeItem.startsWith('/series'),
      },
      {
        icon: <LinkIcon />,
        label: t("Layout.Sidebar.socialLinking"),
        onClick: () => alert(t("Layout.Sidebar.socialLinking")),
        isActive: activeItem === t("Layout.Sidebar.socialLinking"),
      },
      {
        icon: <UploadIcon />,
        label: t("Layout.Sidebar.manageUpload"),
        onClick: () => {},
        isActive: activeItem === t("Layout.Sidebar.manageUpload"),
        childrens: [
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadMovie"),
            onClick: () => {
              navigation.navigate("/upload/movie");
            },
            isActive: activeItem.startsWith('/upload/movie'),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadTrailer"),
            onClick: () => {
              navigation.navigate("/upload/trailer");
            },
            isActive: activeItem.startsWith('/upload/trailer'),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadEpisode"),
            onClick: () => {
              navigation.navigate("/upload/episode");
            },
            isActive: activeItem.startsWith('/upload/episode'),
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
        label: t("Layout.Sidebar.askAnyQuestion"),
        onClick: () => alert(t("Layout.Sidebar.askAnyQuestion")),
        isActive: activeItem === t("Layout.Sidebar.askAnyQuestion"),
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
    paddingBottom: theme.spacing(12),
  }));

  const sideBarBackground = useThemeStyles((theme) => theme.palette.background.default);

  return (
    <Sidebar collapsed={!isHovered} style={containerStyle} backgroundColor={sideBarBackground}>
      <Stack justifyContent={"space-between"} height={"100vh"}>
        <Stack gap={1}>
          {!isHovered ? <CollapsedSidebarUserCard /> : <ExpandSidebarUserCard />}
          <SidebarSection listItems={sections.sidebar} />
        </Stack>
        <Stack sx={footerStyles}>
          <SidebarSection listItems={sections.footer} />
        </Stack>
      </Stack>
    </Sidebar>
  );
}
