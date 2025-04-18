import type { StructureBuilder } from "sanity/desk"
import { BookIcon, HomeIcon, UserIcon } from "@sanity/icons"

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Homepage
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),

      // Blog posts
      S.listItem()
        .title("Blog Posts")
        .icon(BookIcon)
        .child(S.documentTypeList("post").title("All Posts").filter('_type == "post"')),

      // Authors
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("All Authors")),

      // Categories
      S.listItem()
        .title("Categories")
        .child(S.documentTypeList("category").title("All Categories")),

      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !["homepage", "post", "author", "category"].includes(listItem.getId() as string),
      ),
    ])
