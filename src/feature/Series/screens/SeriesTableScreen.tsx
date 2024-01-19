import { lazy, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SxProps } from "@mui/material";

import useNavigation from "@/navigation/useNavigation";
import useThemeStyles from "@/theme/hooks/useThemeStyles";
import { lazily } from "react-lazily";
import { SeriesTableRefInterface } from "../components";
import Page from "@/components/Page";

const { SeriesTable } = lazily(() => import("../components"));
const { AddIcon, CachedIcon, DeleteIcon, EditIcon, MoreVertIcon, SaveIcon, SearchIcon } = lazily(() => import("@/components/icons"));
const Button = lazy(() => import("@/components/Button"));
const { Card, Hidden, Menu, MenuItem, Stack, Typography } = lazily(() => import("@mui/material"));

export default function SeriesTableScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const seriesTableRef = useRef<SeriesTableRefInterface>(null);
  const [actionMenuEnchorEl, setActionMenuEnchorEl] = useState<HTMLElement | null>(null);

  const handleOnCreateSeriesClick = () => {
    navigation.navigate("/series/create");
  };

  const cardStyle = useThemeStyles<SxProps>((theme) => ({
    padding: theme.spacing(4),
  }));

  const actionMenu = (
    <Menu open={!!actionMenuEnchorEl} onClose={() => setActionMenuEnchorEl(null)} anchorEl={actionMenuEnchorEl} onClick={() => setActionMenuEnchorEl(null)}>
      <MenuItem onClick={seriesTableRef.current?.onRefresh}>
        <CachedIcon tooltip={t("Feature.Series.SeriesScreen.refetch")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleSeries}>
        <SearchIcon tooltip={t("Feature.Series.SeriesScreen.search")} />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onDeleteMultipleSeries}>
        <DeleteIcon tooltip={t("Feature.Series.SeriesScreen.deleteSelected")} color="error" />
      </MenuItem>
      <MenuItem onClick={seriesTableRef.current?.onEditMultipleSeries}>
        <EditIcon tooltip={t("Feature.Series.SeriesScreen.editSelected")} color="primary" />
      </MenuItem>
    </Menu>
  );

  return (
    <Page isSuspense>
      <Card sx={cardStyle}>
        <Stack direction={"row"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h5">{t("Feature.Series.SeriesScreen.manageSeries")}</Typography>
          <Stack gap={1} direction={"row"} alignItems={"center"}>
            <Hidden mdDown>
              <CachedIcon tooltip={t("Feature.Series.SeriesScreen.refetch")} iconButton onClick={seriesTableRef.current?.onRefresh} />
              <SearchIcon tooltip={t("Feature.Series.SeriesScreen.search")} iconButton onClick={seriesTableRef.current?.onSearchToogle} />
              <DeleteIcon tooltip={t("Feature.Series.SeriesScreen.deleteSelected")} color="error" iconButton onClick={seriesTableRef.current?.onDeleteMultipleSeries} />
              <EditIcon tooltip={t("Feature.Series.SeriesScreen.editSelected")} color="primary" iconButton onClick={seriesTableRef.current?.onEditMultipleSeries} />
            </Hidden>
            <Hidden smDown>
              <Button onClick={handleOnCreateSeriesClick}>{t("Feature.Series.SeriesScreen.createSeries")}</Button>
            </Hidden>
            <Hidden smUp>
              <AddIcon iconButtonProps={{ color: "primary" }} onClick={handleOnCreateSeriesClick} tooltip={t("Feature.Series.SeriesScreen.createSeries")} />
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon onClick={(e) => setActionMenuEnchorEl(e.currentTarget)} />
              {actionMenu}
            </Hidden>
          </Stack>
        </Stack>
        <SeriesTable ref={seriesTableRef} />
      </Card>
    </Page>
  );
}
