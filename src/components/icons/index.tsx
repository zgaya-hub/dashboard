import React from "react";
import { CircularProgress, IconButton, IconButtonProps, ListItemIcon, SvgIconProps, TooltipProps } from "@mui/material";
import { default as MuiAddIcon } from "@mui/icons-material/Add";
import { default as MuiBrightness4Icon } from "@mui/icons-material/Brightness4";
import { default as MuiChevronRightIcon } from "@mui/icons-material/ChevronRight";
import { default as MuiChevronLeftIcon } from "@mui/icons-material/ChevronLeft";
import { default as MuiComputerIcon } from "@mui/icons-material/Computer";
import { default as MuiFeedbackIcon } from "@mui/icons-material/Feedback";
import { default as FileUploadIcon } from "@mui/icons-material/FileUpload";
import { default as InsertLinkIcon } from "@mui/icons-material/InsertLink";
import { default as MuiLightModeIcon } from "@mui/icons-material/LightMode";
import { default as MuiLogoutIcon } from "@mui/icons-material/Logout";
import { default as MuiMenuOpenIcon } from "@mui/icons-material/MenuOpen";
import { default as MuiNightsStayIcon } from "@mui/icons-material/NightsStay";
import { default as MuiQuestionAnswerIcon } from "@mui/icons-material/QuestionAnswer";
import { default as MuiAirplanemodeActiveIcon } from "@mui/icons-material/AirplanemodeActive";
import { default as MuiDeleteIcon } from "@mui/icons-material/Delete";
import { default as MuiOpenInNewIcon } from "@mui/icons-material/OpenInNew";
import { default as MuiRefreshIcon } from "@mui/icons-material/Refresh";
import { default as MuiPreviewIcon } from "@mui/icons-material/Preview";
import { default as MuiEditIcon } from "@mui/icons-material/Edit";
import { default as MuiSelectAll } from "@mui/icons-material/SelectAll";
import { default as MuiSearchIcon } from "@mui/icons-material/Search";
import { default as MuiSettingsInputvideoIcon } from "@mui/icons-material/SettingsInputSvideo";
import { default as MuiSlideshowIcon } from "@mui/icons-material/Slideshow";
import { default as MuiSpaceDashboardIcon } from "@mui/icons-material/SpaceDashboard";
import { default as MuiErrorOutlineIcon } from "@mui/icons-material/Error";
import { default as MuiArrowDropDownIcon } from "@mui/icons-material/ArrowDropDown";
import { default as MuiFileUploadIcon } from "@mui/icons-material/FileUpload";
import { default as MuiSwitchAccountIcon } from "@mui/icons-material/SwitchAccount";
import { default as MuiTimelineIcon } from "@mui/icons-material/Timeline";
import { default as MuiStreetviewIcon } from "@mui/icons-material/Streetview";
import { default as MuiSaveIcon } from "@mui/icons-material/Save";
import { default as MuiTranslateIcon } from "@mui/icons-material/Translate";
import { default as MuiCancelIcon } from "@mui/icons-material/Cancel";
import { default as MuiVideoLibraryIcon } from "@mui/icons-material/VideoLibrary";
import { default as MuiClearIcon } from "@mui/icons-material/Clear";
import { default as MuiFastForwardIcon } from "@mui/icons-material/FastForward";
import { default as MuiPlayArrowIcon } from "@mui/icons-material/PlayArrow";
import { default as MuiFastRewindIcon } from "@mui/icons-material/FastRewind";
import { default as MuiCachedIcon } from "@mui/icons-material/Cached";
import { default as MuiRadioButtonUncheckedIcon } from "@mui/icons-material/RadioButtonUnchecked";
import { default as MuiLibraryAddCheckIcon } from "@mui/icons-material/LibraryAddCheck";
import { default as MuiMoreVertIcon } from "@mui/icons-material/MoreVert";
import { default as MuiRadioButtonCheckedIcon } from "@mui/icons-material/RadioButtonChecked";
import { default as MuiCheckBoxIcon } from "@mui/icons-material/CheckBox";
import { default as MuiSignalCellularAlt1BarIcon } from "@mui/icons-material/SignalCellularAlt1Bar";
import { default as MuiAttachFileIcon } from "@mui/icons-material/AttachFile";
import { default as MuiDoneIcon } from "@mui/icons-material/Done";
import { default as MuiAddCircleOutlineIcon } from "@mui/icons-material/AddCircleOutline";
import { default as MuiDetails } from "@mui/icons-material/Details";
import Tooltip from "../Tooltip";

interface IconWrapperProps extends SvgIconProps {
  onClick?: () => void;
  disableRipple?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipProps["placement"];
  isListIcon?: boolean;
  iconButtonProps?: IconButtonProps;
  loading?: boolean;
  disabled?: boolean;
}

const withIconWrapper = (WrappedIcon: React.ComponentType<IconWrapperProps>) => {
  return ({ onClick, disableRipple, isListIcon, tooltip, tooltipPlacement, iconButtonProps, loading, disabled, ...restProps }: IconWrapperProps) => {
    const renderIcon = () => <WrappedIcon {...restProps} />;

    if (isListIcon) {
      return <ListItemIcon>{renderIcon()}</ListItemIcon>;
    }
    if (onClick) {
      return (
        <Tooltip title={tooltip} placement={tooltipPlacement}>
          <IconButton disableRipple={disableRipple} disabled={loading || disabled} onClick={onClick} color="inherit" {...iconButtonProps}>
            {loading ? <CircularProgress size={25} /> : renderIcon()}
          </IconButton>
        </Tooltip>
      );
    }

    return renderIcon();
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
export const ErrorIcon = withIconWrapper(MuiErrorOutlineIcon);
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
export const AddCircleIcon = withIconWrapper(MuiAddCircleOutlineIcon);
export const DetailsIcon = withIconWrapper(MuiDetails);
