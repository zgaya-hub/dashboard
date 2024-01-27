import { useState } from "react";
import { useGetSeasonBySeriesId } from "../hooks";
import { Box, CardHeader, List, ListItem, Paper, SxProps, Card, Accordion, AccordionSummary } from "@mui/material";
import { ErrorCard, ImagePlusTitleCard, ImagePlusTitleCardSkeleton } from "@/components/Cards";
import { SearchInput } from "@/components/Form";
import { SearchIcon, CachedIcon, AddIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";

interface SeasonCardListProps {
  seriesId: string;
}

export default function SeasonCardList({ seriesId }: SeasonCardListProps) {
  const { t } = useTranslation();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

  const { data, error, isLoading, refetch } = useGetSeasonBySeriesId({ SeriesId: seriesId });

  const handleOnToggleSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);
  };

  const cardHeaderStyle: SxProps = {};

  const listStyle: SxProps = {
    flexDirection: "row",
    display: "flex",
    overflowX: "scroll",
  };

  const cineastSkeletonList = (
    <List sx={listStyle}>
      {["", "", ""].map(() => (
        <ListItem>
          <ImagePlusTitleCardSkeleton />
        </ListItem>
      ))}
    </List>
  );

  if (error) {
    return <ErrorCard errorMessage={error.message} action={<CachedIcon onClick={refetch} />} />;
  }

  const cineastList = (
    <List sx={listStyle}>
      {data?.map((item) => {
        return (
          <ListItem>
            <ImagePlusTitleCard thumbnail="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692249960i/195789506.jpg" title={item.fullName} />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Card>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography>Expanded by default</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
        </AccordionDetails>
      </Accordion>
      <CardHeader title={t("Feature.Series.CineastContainer.title")} sx={cardHeaderStyle} action={[<SearchIcon onClick={handleOnToggleSearchInput} />, <AddIcon onClick={() => window.open("/quick/cineast-create", "_blank", "width=500,height=800")} />, <CachedIcon onClick={refetch} />]} />
      {isSearchInputVisible ? <SearchInput placeholder={t("Feature.Series.CineastContainer.search")} autoFocus onClose={handleOnToggleSearchInput} /> : null}
      {isLoading ? cineastSkeletonList : cineastList}
    </Card>
  );
}
