import { lazy, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Paper } from "@mui/material";

import useNavigation from "@/navigation/useNavigation";
import { lazily } from "react-lazily";
import { SeriesTableRefInterface } from "../components";
import Page from "@/components/Page";

const { SeriesTable } = lazily(() => import("../components"));
const { AddIcon, CachedIcon, DeleteIcon, EditIcon, MoreVertIcon, SearchIcon } = lazily(() => import("@/components/icons"));
const Button = lazy(() => import("@/components/Button"));
const { Hidden, Menu, MenuItem, Stack, Typography } = lazily(() => import("@mui/material"));

export default function SeriesTableScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const seriesTableRef = useRef<SeriesTableRefInterface>(null);
  const [actionMenuEnchorEl, setActionMenuEnchorEl] = useState<HTMLElement | null>(null);

  const handleOnCreateSeriesClick = () => {
    navigation.navigate("/series/create");
  };

  const actionMenu = (
    <Menu open={!!actionMenuEnchorEl} onClose={() => setActionMenuEnchorEl(null)} anchorEl={actionMenuEnchorEl} onClick={() => setActionMenuEnchorEl(null)}>
      <MenuItem onClick={seriesTableRef.current?.onRefresh}>
        <CachedIcon tooltip={t("Feature.Series.SeriesTableScreen.refetch")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleSeries}>
        <SearchIcon tooltip={t("Feature.Series.SeriesTableScreen.search")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleSeries}>
        <DeleteIcon tooltip={t("Feature.Series.SeriesTableScreen.deleteSelected")} color="error" />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onEditMultipleSeries}>
        <EditIcon tooltip={t("Feature.Series.SeriesTableScreen.editSelected")} color="primary" />
      </MenuItem>
    </Menu>
  );

  return (
    <Page isSuspense>
      <Box component={Paper} p={2}>
        <Stack direction={"row"} mb={1} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.Series.SeriesTableScreen.manageSeries")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"}>
            <Hidden mdDown>
              <CachedIcon tooltip={t("Feature.Series.SeriesTableScreen.refetch")} iconButton onClick={seriesTableRef.current?.onRefresh} />
              <SearchIcon tooltip={t("Feature.Series.SeriesTableScreen.search")} iconButton onClick={seriesTableRef.current?.onSearchToogle} />
              <DeleteIcon tooltip={t("Feature.Series.SeriesTableScreen.deleteSelected")} color="error" iconButton onClick={() => seriesTableRef.current?.onDeleteMultipleSeries()} />
              <EditIcon tooltip={t("Feature.Series.SeriesTableScreen.editSelected")} color="primary" iconButton onClick={seriesTableRef.current?.onEditMultipleSeries} />
            </Hidden>
            <Hidden smDown>
              <Button onClick={handleOnCreateSeriesClick}>{t("Feature.Series.SeriesTableScreen.createSeries")}</Button>
            </Hidden>
            <Hidden smUp>
              <AddIcon iconButtonProps={{ color: "primary" }} onClick={handleOnCreateSeriesClick} tooltip={t("Feature.Series.SeriesTableScreen.createSeries")} />
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon onClick={(e) => setActionMenuEnchorEl(e.currentTarget)} />
              {actionMenu}
            </Hidden>
          </Stack>
        </Stack>
        <SeriesTable ref={seriesTableRef} />
      </Box>
    </Page>
  );
}
