import { Chip } from "@mui/material";
import { MediaStatusEnum } from "zgaya.hub-client-types/lib";
import { CancelCircleIcon, CheckCircleIcon, HourglassIcon, NewReleasesIcon, StopIcon } from "@/components/icons";

interface MovieStatusCellProps {
  status: MediaStatusEnum;
}

export default function MovieStatusCell({ status }: MovieStatusCellProps) {
  switch (status) {
    case MediaStatusEnum.IN_PRODUCTION:
      return <Chip color="success" label={status} icon={<HourglassIcon  />} />;

    case MediaStatusEnum.RELEASED:
      return <Chip color="primary" label={status} icon={<CheckCircleIcon solid />} />;

    case MediaStatusEnum.POST_PRODUCTION:
      return <Chip color="info" label={status} icon={<NewReleasesIcon solid />} />;

    case MediaStatusEnum.ON_HOLD:
      return <Chip label={status} icon={<StopIcon solid />} />;

    case MediaStatusEnum.CANCELED:
      return <Chip color="error" label={status} icon={<CancelCircleIcon solid />} />;
  }
}
