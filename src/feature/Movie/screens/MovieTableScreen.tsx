import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Hidden, Menu, MenuItem, Stack, SxProps, Typography } from "@mui/material";

import Button from "@/components/Button";
import { AddIcon, CachedIcon, DeleteIcon, EditIcon, MoreVertIcon, SaveIcon, SearchIcon } from "@/components/icons";
import Page from "@/components/Page";
import useNavigation from "@/navigation/useNavigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";

import { MovieTable, MovieTableRefInterface } from "../components";

export default function MovieTableScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const seriesTableRef = useRef<MovieTableRefInterface>(null);
  const [actionMenuEnchorEl, setActionMenuEnchorEl] = useState<HTMLElement | null>(null);

  const handleOnCreateMovieClick = () => {
    navigation.navigate("/series/create");
  };

  const cardStyle = useThemeStyles<SxProps>(theme => ({
    padding: theme.spacing(4),
  }));

  const actionMenu = (
    <Menu open={!!actionMenuEnchorEl} onClose={() => setActionMenuEnchorEl(null)} anchorEl={actionMenuEnchorEl} onClick={() => setActionMenuEnchorEl(null)}>
      <MenuItem onClick={seriesTableRef.current?.onRefresh}>
        <CachedIcon tooltip={t("Feature.Movie.MovieScreen.refetch")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleMovie}>
        <SearchIcon tooltip={t("Feature.Movie.MovieScreen.search")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleMovie}>
        <DeleteIcon tooltip={t("Feature.Movie.MovieScreen.deleteSelected")} color="error" />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onEditMultipleMovie}>
        <EditIcon tooltip={t("Feature.Movie.MovieScreen.editSelected")} color="primary" />
      </MenuItem>
    </Menu>
  );

  return (
    <Page isSuspense>
      <Card sx={cardStyle}>
        <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.Movie.MovieScreen.manageMovie")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"}>
            <Hidden mdDown>
              <CachedIcon tooltip={t("Feature.Movie.MovieScreen.refetch")} iconButton onClick={seriesTableRef.current?.onRefresh} />
              <SearchIcon tooltip={t("Feature.Movie.MovieScreen.search")} iconButton onClick={seriesTableRef.current?.onSearchToogle} />
              <DeleteIcon tooltip={t("Feature.Movie.MovieScreen.deleteSelected")} color="error" iconButton onClick={seriesTableRef.current?.onDeleteMultipleMovie} />
              <EditIcon tooltip={t("Feature.Movie.MovieScreen.editSelected")} color="primary" iconButton onClick={seriesTableRef.current?.onEditMultipleMovie} />
            </Hidden>
            <Hidden smDown>
              <Button onClick={handleOnCreateMovieClick}>{t("Feature.Movie.MovieScreen.createMovie")}</Button>
            </Hidden>
            <Hidden smUp>
              <AddIcon iconButtonProps={{ color: "primary" }} onClick={handleOnCreateMovieClick} tooltip={t("Feature.Movie.MovieScreen.createMovie")} />
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon onClick={e => setActionMenuEnchorEl(e.currentTarget)} />
              {actionMenu}
            </Hidden>
          </Stack>
        </Stack>
        <MovieTable ref={seriesTableRef} />
        <Stack direction={"row"} justifyContent={"end"} mt={2} gap={1}>
          <Button variant="text">{t("Feature.Movie.MovieScreen.cancel")}</Button>
          <Button endIcon={<SaveIcon />} variant="contained">
            {t("Feature.Movie.MovieScreen.save")}
          </Button>
        </Stack>
      </Card>
    </Page>
  );
}
