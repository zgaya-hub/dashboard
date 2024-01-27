import { Chip } from "@mui/material";
import { MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { CancelCircleIcon, CheckCircleIcon, HourglassIcon, NewReleasesIcon, StopIcon } from "@/components/icons";

interface MovieStatusChipProps {
  status: MediaStatusEnum;
}

export default function MovieStatusChip({ status }: MovieStatusChipProps) {
  switch (status) {
    case MediaStatusEnum.IN_PRODUCTION:
      return <Chip variant="outlined" size="small" color="success" label={status} icon={<HourglassIcon fontSize="inherit"  />} />;

    case MediaStatusEnum.RELEASED:
      return <Chip variant="outlined" size="small" color="primary" label={status} icon={<CheckCircleIcon fontSize="inherit" solid />} />;

    case MediaStatusEnum.POST_PRODUCTION:
      return <Chip variant="outlined" size="small" color="info" label={status} icon={<NewReleasesIcon fontSize="inherit" solid />} />;

    case MediaStatusEnum.ON_HOLD:
      return <Chip variant="outlined" size="small" label={status} icon={<StopIcon fontSize="inherit" solid />} />;

    case MediaStatusEnum.CANCELED:
      return <Chip variant="outlined" size="small" color="error" label={status} icon={<CancelCircleIcon fontSize="inherit" solid />} />;
  }
}
