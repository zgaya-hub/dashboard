import { Stack, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import SidebarItem, { SidebarItemProps } from "./SideBarItem";
import { CollapsedSideBarUserCard, ExpandSideBarUserCard } from "./SideBarUserCard";
import { AnalyticsIcon, DashboardIcon, LinkIcon, PlayDoubleIcon, PlaySquareIcon, QuestionAnswerIcon, SettingIcon, UploadIcon } from "@/components/icons";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { CSSProperties, useState } from "react";
import useNavigation from "@/navigation/use-navigation";

interface SideBarSectionProps {
  listItems: SidebarItemProps[];
}

function SideBarSection({ listItems }: SideBarSectionProps) {
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

export default function LayoutSideBar() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [activeItemLabel, setActiveItemLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const sections: { sidebar: SidebarItemProps[]; footer: SidebarItemProps[] } = {
    sidebar: [
      {
        icon: <DashboardIcon />,
        label: t("Layout.Sidebar.dashboard"),
        onClick: () => {
          setActiveItemLabel(t("Layout.Sidebar.dashboard"));
          navigation.navigate("/home");
        },
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
        onClick: () => {
          navigation.navigate("/series-management");
          setActiveItemLabel(t("Layout.Sidebar.manageSeries"));
        },
        isActive: activeItemLabel === t("Layout.Sidebar.manageSeries"),
      },
      {
        icon: <LinkIcon />,
        label: t("Layout.Sidebar.socialLinking"),
        onClick: () => setActiveItemLabel(t("Layout.Sidebar.socialLinking")),
        isActive: activeItemLabel === t("Layout.Sidebar.socialLinking"),
      },
      {
        icon: <UploadIcon />,
        label: t("Layout.Sidebar.manageUpload"),
        onClick: () => {},
        isActive: activeItemLabel === t("Layout.Sidebar.manageUpload"),
        childrens: [
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadMovie"),
            onClick: () => {
              setActiveItemLabel(t("Layout.Sidebar.uploadMovie"));
              navigation.navigate("/video-upload/movie");
            },
            isActive: activeItemLabel === t("Layout.Sidebar.uploadMovie"),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadTrailer"),
            onClick: () => {
              setActiveItemLabel(t("Layout.Sidebar.uploadTrailer"));
              navigation.navigate("/video-upload/trailer");
            },
            isActive: activeItemLabel === t("Layout.Sidebar.uploadTrailer"),
          },
          {
            icon: <UploadIcon />,
            label: t("Layout.Sidebar.uploadEpisode"),
            onClick: () => {
              setActiveItemLabel(t("Layout.Sidebar.uploadEpisode"));
              navigation.navigate("/video-upload/episode");
            },
            isActive: activeItemLabel === t("Layout.Sidebar.uploadEpisode"),
          },
        ],
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
    paddingBottom: theme.spacing(12),
  }));

  const sideBarBackground = useThemeStyles((theme) => theme.palette.background.default);

  return (
    <Sidebar collapsed={!isHovered} style={containerStyle} backgroundColor={sideBarBackground} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Stack justifyContent={"space-between"} height={"100vh"}>
        <Stack gap={1}>
          {!isHovered ? <CollapsedSideBarUserCard /> : <ExpandSideBarUserCard />}
          <SideBarSection listItems={sections.sidebar} />
        </Stack>
        <Stack sx={footerStyles}>
          <SideBarSection listItems={sections.footer} />
        </Stack>
      </Stack>
    </Sidebar>
  );
}
