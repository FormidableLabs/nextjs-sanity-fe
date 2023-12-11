import AboutPage from "app/migration/about";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "About",
  description: "About the Formidable Boulangerie project.",
};

export default async function Page() {
  return <AboutPage />;
}
