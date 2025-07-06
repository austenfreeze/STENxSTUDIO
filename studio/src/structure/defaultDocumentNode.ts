import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'
import type { SanityDocument } from 'sanity'

// --- Helper: Get the Preview URL Origin ---
// This function robustly determines the URL for the preview pane.
function getPreviewUrlOrigin(): string {
  // 1. Get the URL from the environment variables.
  //    This is the modern, recommended approach.
  const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL;

  // 2. Check if the environment variable is set.
  if (!previewUrl) {
    // Provide a clear error message for developers to prevent runtime issues.
    console.warn(
      'The SANITY_STUDIO_PREVIEW_URL environment variable is not set. ' +
      'Preview functionality will be limited. Please add it to your .env file(s).'
    );
    // Fallback to the current window's origin if the env var is missing.
    // This is less reliable but provides a graceful fallback.
    return window.location.origin;
  }

  // 3. Return the URL from the environment variable.
  return previewUrl;
}


// --- Helper: Resolve the Preview Path ---
// This function determines the specific path for a document (e.g., /posts/my-post).
function resolvePreviewPath(doc: SanityDocument): string {
  const slug = doc?.slug?.current;

  // If a document has no slug, it can't have a unique page, so we preview the homepage.
  if (!slug) {
    return '/';
  }

  // Build the path based on the document's type.
  switch (doc._type) {
    case 'post':
      return `/posts/${slug}`;
    case 'page':
      return `/${slug}`;
    // Add more cases here for other document types you want to preview.
    default:
      // A helpful warning in the console for unhandled types.
      console.warn(`No preview path configured for document type: "${doc._type}". Falling back to root.`);
      return '/';
  }
}


// --- Main Export: The Default Document Node Resolver ---
// This is imported into your sanity.config.ts to activate the preview.
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Define which document types you want to have the preview pane enabled for.
  const previewableSchemaTypes = ['post', 'page']; // e.g., ['post', 'page', 'product']

  if (previewableSchemaTypes.includes(schemaType)) {
    return S.document().views([
      // The default "form" view where you edit content.
      S.view.form(),
      
      // The custom "preview" view we are creating.
      S.view
        .component(Iframe)
        .options({
          // This is the most advanced and recommended URL configuration object.
          url: {
            // The base URL of your front-end application.
            // E.g., 'http://localhost:3000' or 'https://www.your-site.com'
            origin: getPreviewUrlOrigin(),
            
            // A function to resolve the relative path of the preview.
            preview: (doc: SanityDocument) => resolvePreviewPath(doc),
            
            // The API route in your front-end that enables draft mode.
            // This is a standard for Next.js.
            draftMode: '/api/draft',
          },
          // Show the full preview URL in the pane's header for clarity.
          showDisplayUrl: true,
          
          // Add a "Reload" button to the pane for manual refreshes.
          reload: {
            button: true,
          },
          
          // Optional: Pass attributes to the underlying <iframe> element.
          attributes: {
            allow: 'fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            referrerPolicy: 'strict-origin-when-cross-origin',
          },
        })
        .title('Live Preview'),
    ]);
  }

  // For all other schema types, just return the default form view.
  return S.document().views([S.view.form()]);
};