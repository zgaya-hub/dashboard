import { Dialog } from "@/components/Dialog";
import { MovierMediaEnum } from "@/types/enum";
import { useGetSharelink, useGetImageByMediaId } from "../hooks";
import { VideoShareModalCard } from "@/components/Cards";
import Button from "@/components/Button";
import { Card, List, ListItem, SxProps } from "@mui/material";
import { LinkIcon } from "@/components/icons";
import { RedditIcon, FacebookIcon } from "../assets";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { Elevator } from "@/components/Tags";

interface VideoShareModalProps {
  mediaId: string;
  mediaType: MovierMediaEnum;
  isVisible: boolean;
  onClose: () => void;
}

export default function VideoShareModal({ mediaId, mediaType, isVisible, onClose }: VideoShareModalProps) {
  useGetSharelink({ MediaId: mediaId, MediaType: mediaType });
  useGetImageByMediaId({ MediaId: mediaId });

  const listStyle = useThemeStyles<SxProps>((theme) => ({
    flexDirection: "row",
    display: "flex",
    overflowX: "scroll",
    my: theme.spacing(2),
    p: theme.spacing(1),
  }));

  const dialogAction = (
    <>
      <Button onClick={onClose} variant="text">
        Skip
      </Button>
      <Button onClick={onClose} variant="contained" startIcon={<LinkIcon />}>
        Copy link
      </Button>
    </>
  );

  return (
    <Dialog isDraggable open={isVisible} onClose={onClose} headerText={"Share " + mediaType} dialogAction={dialogAction}>
      <VideoShareModalCard imageSrc={"http://res.cloudinary.com/dqcevzkt9/image/upload/v1704085540/efbd2aad-ab28-490a-8d93-7e84456c2e2e.jpg"} title={"Money heist"} runTime={1704257934852} releaseDate={1704257934852} />
      <List sx={listStyle}>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
        <ListItem>
          <RedditIcon />
        </ListItem>
        <ListItem>
          <FacebookIcon />
        </ListItem>
      </List>
    </Dialog>
  );
}
