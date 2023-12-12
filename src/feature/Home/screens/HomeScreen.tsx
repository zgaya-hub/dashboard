import { LayoutAppBar } from "@/Layout/LayoutAppBar";
import { LayoutAppHeader } from "@/Layout/LayoutAppHeader";
import { LayoutSideBar } from "@/Layout/LayoutSideBar";
import Page from "@/components/Page";

export default function HomeScreen() {
  return (
    <Page>
      <LayoutAppBar />
      <LayoutAppHeader />
      <LayoutSideBar />
    </Page>
  );
}
