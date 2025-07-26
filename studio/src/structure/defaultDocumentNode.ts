// studio/src/structure/defaultDocumentNode.ts

import type { DefaultDocumentNodeResolver } from 'sanity/structure';
import { urlSearchParamPreviewPerspective } from '@sanity/preview-url-secret/constants';
import { Iframe, UrlResolver } from 'sanity-plugin-iframe-pane';
import { type SanityDocument } from 'sanity';

// Customise this function to show the correct URL based on the current document and the current studio perspective
const getPreviewUrl: UrlResolver = (doc, perspective) => {
  // Ensure the document has a slug before trying to build a URL with it.
  if (!doc?.slug?.current) {
    return `${window.location.host}`;
  }

  // Use the slug from the person document to construct the URL.
  // The perspective is passed as a query parameter for Visual Editing.
  return `${window.location.protocol}//${window.location.host}/${doc.slug.current}?${urlSearchParamPreviewPerspective}=${perspective.perspectiveStack}`;
};

// This is the function you will import into your sanity.config.tsx
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show the preview pane on the `person` schema type documents
  switch (schemaType) {
    case 'person':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: getPreviewUrl,
            // Pass the preview secret and token to the iframe
            // This is crucial for authentication in the preview environment
            reload: {
              button: true,
            },
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};