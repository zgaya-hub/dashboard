import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, CardActions, Hidden, Menu, MenuItem, Paper, Stack, SxProps, Toolbar, Typography } from "@mui/material";

import Button from "@/components/Button";
import { AddIcon, CachedIcon, DeleteIcon, EditIcon, MoreVertIcon, SearchIcon } from "@/components/icons";
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
    navigation.navigate("/upload/movie");
  };

  const actionMenu = (
    <Menu open={!!actionMenuEnchorEl} onClose={() => setActionMenuEnchorEl(null)} anchorEl={actionMenuEnchorEl} onClick={() => setActionMenuEnchorEl(null)}>
      <MenuItem onClick={seriesTableRef.current?.onRefresh}>
        <CachedIcon tooltip={t("Feature.Movie.MovieTableScreen.refetch")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleMovie}>
        <SearchIcon tooltip={t("Feature.Movie.MovieTableScreen.search")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleMovie}>
        <DeleteIcon tooltip={t("Feature.Movie.MovieTableScreen.deleteSelected")} color="error" />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onEditMultipleMovie}>
        <EditIcon tooltip={t("Feature.Movie.MovieTableScreen.editSelected")} color="primary" />
      </MenuItem>
    </Menu>
  );

  return (
    <Page isSuspense>
      <Box component={Paper} p={2}>
        <Stack direction={"row"} mb={1} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.Movie.MovieTableScreen.yourMovies")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
            <Hidden mdDown>
              <CachedIcon tooltip={t("Feature.Movie.MovieTableScreen.refetch")} iconButton onClick={seriesTableRef.current?.onRefresh} />
              <SearchIcon tooltip={t("Feature.Movie.MovieTableScreen.search")} iconButton onClick={seriesTableRef.current?.onSearchToogle} />
              <DeleteIcon tooltip={t("Feature.Movie.MovieTableScreen.deleteSelected")} color="error" iconButton onClick={() => seriesTableRef.current?.onDeleteMultipleMovie()} />
              <EditIcon tooltip={t("Feature.Movie.MovieTableScreen.editSelected")} color="primary" iconButton onClick={seriesTableRef.current?.onEditMultipleMovie} />
            </Hidden>
            <Hidden smDown>
              <Button onClick={handleOnCreateMovieClick}>{t("Feature.Movie.MovieTableScreen.uploadMovie")}</Button>
            </Hidden>
            <Hidden smUp>
              <AddIcon iconButtonProps={{ color: "primary" }} onClick={handleOnCreateMovieClick} tooltip={t("Feature.Movie.MovieTableScreen.createMovie")} />
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon onClick={(e) => setActionMenuEnchorEl(e.currentTarget)} />
              {actionMenu}
            </Hidden>
          </Stack>
        </Stack>
        <MovieTable ref={seriesTableRef} />
      </Box>
    </Page>
  );
}
