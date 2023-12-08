import React, { useState } from "react";
import { Container, SxProps } from "@mui/material";
import { VideoUploadSectionEnum } from "../enum";
import EpisodeUploadSection from "./EpisodeUploadSection";
import MovieUploadSection from "./MovieUploadSection";
import TrailerUploadSection from "./TrailerUploadSection";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Tab, Tabs } from "@/components/Tabs";
import Divider from "@/components/Divider";
import { Dialog } from "@/components/Dialog";
import { MovierMediaEnum } from "@/types/enum";

interface VideoUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
  defaultSection: VideoUploadSectionEnum;
  onVideoDrop: (video: File, mediaType: MovierMediaEnum) => void;
  isLoading: boolean;
}

export default function VideoUploadModal({ defaultSection, isVisible, onClose, onVideoDrop, isLoading }: VideoUploadModalProps) {
  const [section, setSection] = useState(defaultSection);

  const handleChange = (_: React.SyntheticEvent, newValue: VideoUploadSectionEnum) => {
    setSection(newValue);
  };

  const dialogBoxStyle = useThemeStyles<SxProps>((theme) => ({
    height: 'fit-content',
    ".MuiDialog-paperWidthXl": {
      width: "100%",
    },
    "& .MuiDialog-paperWidthXl": {
      background: theme.palette.background.default,
    },
  }));

  const renderSection = () => {
    switch (section) {
      case VideoUploadSectionEnum.EPISODE:
        return <EpisodeUploadSection onVideoDrop={onVideoDrop} isLoading={isLoading} />;
      case VideoUploadSectionEnum.MOVIE:
        return <MovieUploadSection onVideoDrop={onVideoDrop} isLoading={isLoading} />;
      case VideoUploadSectionEnum.TRAILER:
        return <TrailerUploadSection onVideoDrop={onVideoDrop} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <Dialog maxWidth="xl" sx={dialogBoxStyle} open={isVisible} headerText="Upload Videos" onClose={onClose} outareaClose={false}>
      <Divider />
      <Tabs value={section} onChange={handleChange} centered>
        <Tab sx={tabStyle} label="Episode" value={VideoUploadSectionEnum.EPISODE} />
        <Tab sx={tabStyle} label="Movie" value={VideoUploadSectionEnum.MOVIE} />
        <Tab sx={tabStyle} label="Trailer" value={VideoUploadSectionEnum.TRAILER} />
      </Tabs>
      <Container>{renderSection()}</Container>
    </Dialog>
  );
}

const tabStyle: SxProps = {
  flex: 1,
};
