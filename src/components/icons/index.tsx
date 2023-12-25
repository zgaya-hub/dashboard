import React from "react";
import { IconButton, IconButtonProps, ListItemIcon, SvgIconProps, TooltipProps } from "@mui/material";
import { default as MuiAddIcon } from "@mui/icons-material/Add";
import { default as MuiBrightness4OutlinedIcon } from "@mui/icons-material/Brightness4Outlined";
import { default as MuiChevronRightOutlinedIcon } from "@mui/icons-material/ChevronRightOutlined";
import { default as MuiChevronLeftOutlinedIcon } from "@mui/icons-material/ChevronLeftOutlined";
import { default as MuiComputerOutlinedIcon } from "@mui/icons-material/ComputerOutlined";
import { default as MuiFeedbackOutlinedIcon } from "@mui/icons-material/FeedbackOutlined";
import { default as FileUploadOutlinedIcon } from "@mui/icons-material/FileUploadOutlined";
import { default as InsertLinkOutlinedIcon } from "@mui/icons-material/InsertLinkOutlined";
import { default as LightModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import { default as MuiLogoutOutlinedIcon } from "@mui/icons-material/LogoutOutlined";
import { default as MuiMenuOpenOutlinedIcon } from "@mui/icons-material/MenuOpenOutlined";
import { default as MuiNightsStayOutlinedIcon } from "@mui/icons-material/NightsStayOutlined";
import { default as QuestionAnswerOutlinedIcon } from "@mui/icons-material/QuestionAnswerOutlined";
import { default as MuiAirplanemodeActiveIcon } from "@mui/icons-material/AirplanemodeActive";
import { default as MuiDeleteIcon } from "@mui/icons-material/Delete";
import { default as MuiSearchIcon } from "@mui/icons-material/Search";
import { default as SettingsInputSvideoOutlinedIcon } from "@mui/icons-material/SettingsInputSvideoOutlined";
import { default as SlideshowOutlinedIcon } from "@mui/icons-material/SlideshowOutlined";
import { default as MuiSpaceDashboardOutlinedIcon } from "@mui/icons-material/SpaceDashboardOutlined";
import { default as MuiErrorOutlineIcon } from "@mui/icons-material/ErrorOutline";
import { default as MuiFileUploadIcon } from "@mui/icons-material/FileUpload";
import { default as MuiSwitchAccountIcon } from "@mui/icons-material/SwitchAccountOutlined";
import { default as MuiTimelineOutlinedIcon } from "@mui/icons-material/TimelineOutlined";
import { default as MuiSaveIcon } from "@mui/icons-material/Save";
import { default as MuiTranslateIcon } from "@mui/icons-material/Translate";
import { default as VideoLibraryOutlinedIcon } from "@mui/icons-material/VideoLibraryOutlined";
import { default as MuiClearOutlinedIcon } from "@mui/icons-material/ClearOutlined";
import { default as MuiFastForwardIcon } from "@mui/icons-material/FastForward";
import { default as MuiPlayArrowIcon } from "@mui/icons-material/PlayArrow";
import { default as MuiFastRewindIcon } from "@mui/icons-material/FastRewind";
import { default as MuiCachedIcon } from "@mui/icons-material/CachedOutlined";
import { default as MuiRadioButtonUncheckedIcon } from "@mui/icons-material/RadioButtonUnchecked";
import { default as MuiMoreVertIcon } from "@mui/icons-material/MoreVert";
import { default as MuiRadioButtonCheckedIcon } from "@mui/icons-material/RadioButtonChecked";
import Tooltip from "../Tooltip";
import { CircularProgress } from "../ProgressBars";

interface IconWrapperProps extends SvgIconProps {
  onClick?: () => void;
  disableRipple?: boolean;
  tooltip?: string; // Add a new prop for tooltip text
  tooltipPlacement?: TooltipProps["placement"]; // Placement prop for Tooltip component
  isListIcon?: boolean;
  iconButtonProps?: IconButtonProps;
  loading?: boolean;
}

const withIconWrapper = (WrappedIcon: React.ComponentType<IconWrapperProps>) => {
  return ({ onClick, disableRipple, isListIcon, tooltip, tooltipPlacement, iconButtonProps, loading, ...restProps }: IconWrapperProps) => {
    const renderIcon = () => <WrappedIcon {...restProps} />;

    if (isListIcon) {
      return <ListItemIcon>{renderIcon()}</ListItemIcon>;
    }
    if (onClick) {
      return (
        <Tooltip title={tooltip} placement={tooltipPlacement}>
          <IconButton disableRipple={disableRipple} disabled={loading} onClick={onClick} color="inherit" {...iconButtonProps}>
            {loading ? <CircularProgress size={25} /> : renderIcon()}
          </IconButton>
        </Tooltip>
      );
    }

    return renderIcon();
  };
};

export const AddIcon = withIconWrapper(MuiAddIcon);
export const MenuOpenIcon = withIconWrapper(MuiMenuOpenOutlinedIcon);
export const SearchIcon = withIconWrapper(MuiSearchIcon);
export const MoonSunIcon = withIconWrapper(MuiBrightness4OutlinedIcon);
export const DashboardIcon = withIconWrapper(MuiSpaceDashboardOutlinedIcon);
export const AnalyticsIcon = withIconWrapper(MuiTimelineOutlinedIcon);
export const PlaySquareIcon = withIconWrapper(SlideshowOutlinedIcon);
export const PlayDoubleIcon = withIconWrapper(VideoLibraryOutlinedIcon);
export const LinkIcon = withIconWrapper(InsertLinkOutlinedIcon);
export const SettingIcon = withIconWrapper(SettingsInputSvideoOutlinedIcon);
export const QuestionAnswerIcon = withIconWrapper(QuestionAnswerOutlinedIcon);
export const UploadIcon = withIconWrapper(FileUploadOutlinedIcon);
export const SwitchAccountIcon = withIconWrapper(MuiSwitchAccountIcon);
export const LogoutIcon = withIconWrapper(MuiLogoutOutlinedIcon);
export const MoonIcon = withIconWrapper(MuiNightsStayOutlinedIcon);
export const FeedbackIcon = withIconWrapper(MuiFeedbackOutlinedIcon);
export const ChevronRightIcon = withIconWrapper(MuiChevronRightOutlinedIcon);
export const ChevronLeftIcon = withIconWrapper(MuiChevronLeftOutlinedIcon);
export const LightModeIcon = withIconWrapper(LightModeOutlinedIcon);
export const LaptopIcon = withIconWrapper(MuiComputerOutlinedIcon);
export const SolidUploadIcon = withIconWrapper(MuiFileUploadIcon);
export const AirplaneIcon = withIconWrapper(MuiAirplanemodeActiveIcon);
export const ClearIcon = withIconWrapper(MuiClearOutlinedIcon);
export const TranslateIcon = withIconWrapper(MuiTranslateIcon);
export const FastForwardIcon = withIconWrapper(MuiFastForwardIcon);
export const FastRewindIcon = withIconWrapper(MuiFastRewindIcon);
export const PlayArrowIcon = withIconWrapper(MuiPlayArrowIcon);
export const CachedIcon = withIconWrapper(MuiCachedIcon);
export const RadioButtonUncheckedIcon = withIconWrapper(MuiRadioButtonUncheckedIcon);
export const RadioButtonCheckedIcon = withIconWrapper(MuiRadioButtonCheckedIcon);
export const MoreVertIcon = withIconWrapper(MuiMoreVertIcon);
export const ErrorIcon = withIconWrapper(MuiErrorOutlineIcon);
export const SaveIcon = withIconWrapper(MuiSaveIcon);
export const DeleteIcon = withIconWrapper(MuiDeleteIcon);
