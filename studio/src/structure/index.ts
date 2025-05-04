import {StructureBuilder} from 'sanity/structure-builder'
import {CogIcon} from '@sanity/icons'

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
