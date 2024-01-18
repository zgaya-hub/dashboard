import { useState } from "react";
import { SimpleCineastCard, SimpleCineastCardSkeleton } from "@/components/Cards";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, List, ListItem, SxProps } from "@mui/material";
import { useGetCineastsBySeriesId } from "../hooks/queryHooks";
import { SearchIcon, CachedIcon, AddIcon } from "@/components/icons";
import { SearchInput } from "@/components/Form";
import { ErrorCard } from "@/components/Cards";

interface CineastContainerProps {
  seriesId: string;
}

export default function CineastContainer({ seriesId }: CineastContainerProps) {
  const { t } = useTranslation();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const { data, error, refetch, isLoading } = useGetCineastsBySeriesId({ SeriesId: seriesId });

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
          <SimpleCineastCardSkeleton />
        </ListItem>
      ))}
    </List>
  );

  if (error) {
    return <ErrorCard errorMessage={error.message} action={<CachedIcon onClick={refetch} />}  />
  }

  const cineastList = (
    <List sx={listStyle}>
      {data?.map((item) => {
        return (
          <ListItem>
            <SimpleCineastCard imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692249960i/195789506.jpg" name={item.fullName} profession={item.profession} />
          </ListItem>
        );
      })}
    </List>
  );

  

  return (
    <Card>
      <CardHeader title={t("Feature.Series.CineastContainer.title")} sx={cardHeaderStyle} action={[<SearchIcon onClick={handleOnToggleSearchInput} />, <AddIcon onClick={() => window.open("/quick/cineast-create", "_blank", "width=500,height=800")} />, <CachedIcon onClick={refetch} />]} />
      {isSearchInputVisible ? <SearchInput placeholder={t("Feature.Series.CineastContainer.search")} autoFocus onClose={handleOnToggleSearchInput} /> : null}
      {isLoading ? cineastSkeletonList : cineastList}
    </Card>
  );
}

// error ? <ErrorIcon color="error" tooltip={error.message} iconButton /> : null