import { StructureBuilder } from 'sanity/structure-builder'
import { CogIcon } from '@sanity/icons'
import { WebPreview, JsonView } from "./previews";


// -------------------------------
// Structure Definition
// -------------------------------
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Singleton item
      S.listItem()
        .title('Site Integrations')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('integrations')
            .schemaType('integrations')
            .documentId('singleton-integrations')
        ),

      // Default list items excluding integration documents
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['integrations', 'sanityIntegration', 'vercelIntegration', 'githubIntegration'].includes(
            listItem.getId() || ''
          )
      ),
    ])

// -------------------------------
// Default Document Node Config
// -------------------------------
export const getDefaultDocumentNode = (S: StructureBuilder, { schemaType }: { schemaType: string }) => {
  // Conditionally return different views based on schema type
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view.component(WebPreview).title('Web'),
    ])
  }

  return S.document().views([
    S.view.form(),
    S.view.component(JsonView).title('JSON'),
  ])
}

export default structure
