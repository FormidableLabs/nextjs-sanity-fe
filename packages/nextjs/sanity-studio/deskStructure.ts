import type { StructureResolver } from "sanity/lib/exports/desk";
import { MdSettings } from "react-icons/md";

export const customStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Settings").icon(MdSettings).child(S.document().schemaType("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !["variant", "siteSettings"].includes(listItem.getId() || "")),
    ]);
