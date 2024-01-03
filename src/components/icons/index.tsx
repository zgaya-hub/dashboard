import React, { MouseEvent } from "react";
import { CircularProgress, IconButton, IconButtonProps, ListItemIcon, SvgIconProps, TooltipProps } from "@mui/material";
import { default as MuiAddIcon } from "@mui/icons-material/AddOutlined";
import { default as MuiBrightness4Icon } from "@mui/icons-material/Brightness4Outlined";
import { default as MuiChevronRightIcon } from "@mui/icons-material/ChevronRightOutlined";
import { default as MuiChevronLeftIcon } from "@mui/icons-material/ChevronLeftOutlined";
import { default as MuiComputerIcon } from "@mui/icons-material/ComputerOutlined";
import { default as MuiFeedbackIcon } from "@mui/icons-material/FeedbackOutlined";
import { default as FileUploadIcon } from "@mui/icons-material/FileUploadOutlined";
import { default as InsertLinkIcon } from "@mui/icons-material/InsertLinkOutlined";
import { default as MuiLightModeIcon } from "@mui/icons-material/LightModeOutlined";
import { default as MuiLogoutIcon } from "@mui/icons-material/LogoutOutlined";
import { default as MuiMenuOpenIcon } from "@mui/icons-material/MenuOpenOutlined";
import { default as MuiNightsStayIcon } from "@mui/icons-material/NightsStayOutlined";
import { default as MuiQuestionAnswerIcon } from "@mui/icons-material/QuestionAnswerOutlined";
import {default as MuiFacebookIcon} from '@mui/icons-material/Facebook';
import { default as MuiAirplanemodeActiveIcon } from "@mui/icons-material/AirplanemodeActiveOutlined";
import { default as MuiDeleteIcon } from "@mui/icons-material/DeleteOutlined";
import { default as MuiOpenInNewIcon } from "@mui/icons-material/OpenInNewOutlined";
import { default as MuiRefreshIcon } from "@mui/icons-material/RefreshOutlined";
import { default as MuiPreviewIcon } from "@mui/icons-material/PreviewOutlined";
import { default as MuiEditIcon } from "@mui/icons-material/EditOutlined";
import { default as MuiSelectAll } from "@mui/icons-material/SelectAllOutlined";
import { default as MuiSearchIcon } from "@mui/icons-material/SearchOutlined";
import { default as MuiSettingsInputvideoIcon } from "@mui/icons-material/SettingsInputSvideoOutlined";
import { default as MuiSlideshowIcon } from "@mui/icons-material/SlideshowOutlined";
import { default as MuiSpaceDashboardIcon } from "@mui/icons-material/SpaceDashboardOutlined";
import { default as MuiErrorIcon } from "@mui/icons-material/ErrorOutlined";
import { default as MuiArrowDropDownIcon } from "@mui/icons-material/ArrowDropDownOutlined";
import { default as MuiFileUploadIcon } from "@mui/icons-material/FileUploadOutlined";
import { default as MuiSwitchAccountIcon } from "@mui/icons-material/SwitchAccountOutlined";
import { default as MuiTimelineIcon } from "@mui/icons-material/TimelineOutlined";
import { default as MuiStreetviewIcon } from "@mui/icons-material/StreetviewOutlined";
import { default as MuiSaveIcon } from "@mui/icons-material/SaveOutlined";
import { default as MuiTranslateIcon } from "@mui/icons-material/TranslateOutlined";
import { default as MuiCancelIcon } from "@mui/icons-material/CancelOutlined";
import { default as MuiVideoLibraryIcon } from "@mui/icons-material/VideoLibraryOutlined";
import { default as MuiClearIcon } from "@mui/icons-material/ClearOutlined";
import { default as MuiFastForwardIcon } from "@mui/icons-material/FastForwardOutlined";
import { default as MuiPlayArrowIcon } from "@mui/icons-material/PlayArrowOutlined";
import { default as MuiFastRewindIcon } from "@mui/icons-material/FastRewindOutlined";
import { default as MuiCachedIcon } from "@mui/icons-material/CachedOutlined";
import { default as MuiRadioButtonUncheckedIcon } from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { default as MuiLibraryAddCheckIcon } from "@mui/icons-material/LibraryAddCheckOutlined";
import { default as MuiMoreVertIcon } from "@mui/icons-material/MoreVertOutlined";
import { default as MuiRadioButtonCheckedIcon } from "@mui/icons-material/RadioButtonCheckedOutlined";
import { default as MuiCheckBoxIcon } from "@mui/icons-material/CheckBoxOutlined";
import { default as MuiSignalCellularAlt1BarIcon } from "@mui/icons-material/SignalCellularAlt1BarOutlined";
import { default as MuiAttachFileIcon } from "@mui/icons-material/AttachFileOutlined";
import { default as MuiDoneIcon } from "@mui/icons-material/DoneOutlined";
import { default as MuiAddCircleIcon } from "@mui/icons-material/AddCircleOutlined";
import { default as MuiDetails } from "@mui/icons-material/DetailsOutlined";
import {default as MuiEventIcon} from '@mui/icons-material/Event';
import { default as MuiInfodIcon } from "@mui/icons-material/InfoOutlined";
import Tooltip from "../Tooltip";

interface IconWrapperProps extends SvgIconProps {
  onClick?: (event: MouseEvent) => void;
  iconButton?: boolean;
  disableRipple?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipProps["placement"];
  isListIcon?: boolean;
  iconButtonProps?: IconButtonProps;
  loading?: boolean;
  disabled?: boolean;
}

const withIconWrapper = (WrappedIcon: React.ComponentType<IconWrapperProps>) => {
  return ({ onClick, disableRipple, isListIcon, tooltip, tooltipPlacement, iconButton, iconButtonProps, loading, disabled, sx, ...restProps }: IconWrapperProps) => {
    const renderIcon = () => <WrappedIcon {...restProps} />;

    if (isListIcon) {
      return <ListItemIcon sx={sx}>{renderIcon()}</ListItemIcon>;
    }

    if (onClick || iconButton) {
      return (
        <IconButton disableRipple={disableRipple} sx={sx} disabled={loading || disabled} onClick={onClick} color="inherit" {...iconButtonProps}>
          <Tooltip title={tooltip} placement={tooltipPlacement}>
            {loading ? <CircularProgress size={25} /> : renderIcon()}
          </Tooltip>
        </IconButton>
      );
    }

    return (
      <Tooltip title={tooltip} placement={tooltipPlacement} sx={sx}>
        {renderIcon()}
      </Tooltip>
    );
  };
};

export const AddIcon = withIconWrapper(MuiAddIcon);
export const MenuOpenIcon = withIconWrapper(MuiMenuOpenIcon);
export const SearchIcon = withIconWrapper(MuiSearchIcon);
export const MoonSunIcon = withIconWrapper(MuiBrightness4Icon);
export const DashboardIcon = withIconWrapper(MuiSpaceDashboardIcon);
export const AnalyticsIcon = withIconWrapper(MuiTimelineIcon);
export const PlaySquareIcon = withIconWrapper(MuiSlideshowIcon);
export const PlayDoubleIcon = withIconWrapper(MuiVideoLibraryIcon);
export const LinkIcon = withIconWrapper(InsertLinkIcon);
export const SettingIcon = withIconWrapper(MuiSettingsInputvideoIcon);
export const QuestionAnswerIcon = withIconWrapper(MuiQuestionAnswerIcon);
export const UploadIcon = withIconWrapper(FileUploadIcon);
export const SwitchAccountIcon = withIconWrapper(MuiSwitchAccountIcon);
export const LogoutIcon = withIconWrapper(MuiLogoutIcon);
export const MoonIcon = withIconWrapper(MuiNightsStayIcon);
export const FeedbackIcon = withIconWrapper(MuiFeedbackIcon);
export const ChevronRightIcon = withIconWrapper(MuiChevronRightIcon);
export const ChevronLeftIcon = withIconWrapper(MuiChevronLeftIcon);
export const LightModeIcon = withIconWrapper(MuiLightModeIcon);
export const LaptopIcon = withIconWrapper(MuiComputerIcon);
export const SolidUploadIcon = withIconWrapper(MuiFileUploadIcon);
export const AirplaneIcon = withIconWrapper(MuiAirplanemodeActiveIcon);
export const ClearIcon = withIconWrapper(MuiClearIcon);
export const TranslateIcon = withIconWrapper(MuiTranslateIcon);
export const FastForwardIcon = withIconWrapper(MuiFastForwardIcon);
export const FastRewindIcon = withIconWrapper(MuiFastRewindIcon);
export const PlayArrowIcon = withIconWrapper(MuiPlayArrowIcon);
export const CachedIcon = withIconWrapper(MuiCachedIcon);
export const RadioButtonUncheckedIcon = withIconWrapper(MuiRadioButtonUncheckedIcon);
export const RadioButtonCheckedIcon = withIconWrapper(MuiRadioButtonCheckedIcon);
export const MoreVertIcon = withIconWrapper(MuiMoreVertIcon);
export const ErrorIcon = withIconWrapper(MuiErrorIcon);
export const SaveIcon = withIconWrapper(MuiSaveIcon);
export const DeleteIcon = withIconWrapper(MuiDeleteIcon);
export const EditIcon = withIconWrapper(MuiEditIcon);
export const SelectAllIcon = withIconWrapper(MuiSelectAll);
export const SignalBarIcon = withIconWrapper(MuiSignalCellularAlt1BarIcon);
export const DoneIcon = withIconWrapper(MuiDoneIcon);
export const CaretDownIcon = withIconWrapper(MuiArrowDropDownIcon);
export const ClearCircleIcon = withIconWrapper(MuiCancelIcon);
export const StreetViewIcon = withIconWrapper(MuiStreetviewIcon);
export const AttachFileIcon = withIconWrapper(MuiAttachFileIcon);
export const CheckBoxIcon = withIconWrapper(MuiCheckBoxIcon);
export const RefreshIcon = withIconWrapper(MuiRefreshIcon);
export const OpenTabIcon = withIconWrapper(MuiOpenInNewIcon);
export const PreviewIcon = withIconWrapper(MuiPreviewIcon);
export const MultiCheckIcon = withIconWrapper(MuiLibraryAddCheckIcon);
export const AddCircleIcon = withIconWrapper(MuiAddCircleIcon);
export const DetailsIcon = withIconWrapper(MuiDetails);
export const InfoIcon = withIconWrapper(MuiInfodIcon);
export const EventIcon = withIconWrapper(MuiEventIcon);
