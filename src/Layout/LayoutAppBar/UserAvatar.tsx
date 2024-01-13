import React, { Fragment, useState } from "react";

import Avatar from "@/components/Avatar";
import { useAuthContext } from "@/context/AuthContext";
import useUserDetail from "@/context/UserDetail.context";

import AppearanceMenu from "./AppearanceMenu";
import TranslationMenu from "./TranslationMenu";
import UserMenu from "./UserMenu";

export default function UserAvatar() {
  const { imageUrl } = useUserDetail();
  const { handleOnLogout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [appearanceMenuAnchorEl, setAppearanceMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [translationMenuAnchorEl, setTranslationMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleOnMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnAppearanceMenuClose = () => {
    setAnchorEl(appearanceMenuAnchorEl);
    setAppearanceMenuAnchorEl(null);
  };

  const handleOnAppearance = () => {
    setAppearanceMenuAnchorEl(anchorEl);
  };

  const handleOnTranslationMenuClose = () => {
    setAnchorEl(translationMenuAnchorEl);
    setTranslationMenuAnchorEl(null);
  };

  const handleOnTranslation = () => {
    setTranslationMenuAnchorEl(anchorEl);
  };

  const handleOnSwitchAccount = () => {
    alert("handleOnSwitchAccount");
  };

  const handleOnSetting = () => {
    alert("handleOnSetting");
  };

  const handleOnShareFeedback = () => {
    alert("handleOnShareFeedback");
  };

  return (
    <Fragment>
      <Avatar src={imageUrl} onClick={handleOnMenuOpen} />
      <UserMenu
        anchorEl={anchorEl}
        isVisible={Boolean(anchorEl)}
        onClose={handleOnMenuClose}
        onSwitchAccount={handleOnSwitchAccount}
        onSetting={handleOnSetting}
        onLogout={handleOnLogout}
        onAppearance={handleOnAppearance}
        onTranslation={handleOnTranslation}
        onShareFeedback={handleOnShareFeedback}
        onClickProfile={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <AppearanceMenu anchorEl={appearanceMenuAnchorEl} isVisible={Boolean(appearanceMenuAnchorEl)} onClose={handleOnAppearanceMenuClose} />
      <TranslationMenu anchorEl={translationMenuAnchorEl} isVisible={Boolean(translationMenuAnchorEl)} onClose={handleOnTranslationMenuClose} />
    </Fragment>
  );
}
