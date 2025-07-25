// root/nextjs-app/sanity/presentation/resolve.ts

import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

import { SanityDocument } from 'sanity'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {



    // Defines live preview locations for 'post' documents

    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc: SanityDocument) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),



    // Defines live preview locations for 'page' documents

    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc: SanityDocument) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/${doc?.slug}`,
          },
          // You could add an index page link here if you have one
        ],
      }),
    }),



    // Defines live preview locations for 'project' documents

    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc: SanityDocument) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Project',
            href: `/projects/${doc?.slug}`,
          },
        ],
      }),
    }),




    // This provides a default for any schemas not explicitly handled

    default: defineLocations({
      resolve: () => ({
        locations: [
          {
            title: 'Website Root',
            href: '/',
          },
        ],
      }),
    }),
  },
}