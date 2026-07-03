import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  HomeIcon,
  EarthGlobeIcon,
  ImagesIcon,
  CalendarIcon,
  ImageIcon,
  UserIcon,
  DocumentIcon
} from '@sanity/icons'

// Singleton list
const SINGLETON_TYPES = ['siteSettings', 'homepage', 'contactSettings', 'seoSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SK Crown CMS')
    .items([
      // 1. Singletons at the top (direct access)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.listItem()
        .title('Homepage Settings')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage Settings')
        ),
      S.listItem()
        .title('Contact Settings')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('contactSettings')
            .documentId('contactSettings')
            .title('Contact Settings')
        ),
      S.listItem()
        .title('SEO Settings')
        .icon(EarthGlobeIcon)
        .child(
          S.document()
            .schemaType('seoSettings')
            .documentId('seoSettings')
            .title('SEO Settings')
        ),

      S.divider(),

      // 2. Logically Grouped Collections
      S.listItem()
        .title('Website')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Website Management')
            .items([
              S.documentTypeListItem('heroSlide').title('Hero Slides').icon(ImagesIcon),
            ])
        ),

      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Homepage Elements')
            .items([
              S.listItem()
                .title('Homepage Content')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepage')
                    .documentId('homepage')
                    .title('Homepage Content')
                ),
              S.documentTypeListItem('heroSlide').title('Hero Slides').icon(ImagesIcon),
            ])
        ),

      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.list()
            .title('Event Showcase')
            .items([
              S.documentTypeListItem('showcaseEvent').title('Showcase Events').icon(CalendarIcon),
            ])
        ),

      S.listItem()
        .title('Media')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Media Assets')
            .items([
              S.documentTypeListItem('galleryImage').title('Gallery Images').icon(ImageIcon),
            ])
        ),

      S.listItem()
        .title('Reviews')
        .icon(UserIcon)
        .child(
          S.list()
            .title('Customer Reviews')
            .items([
              S.documentTypeListItem('review').title('Reviews').icon(UserIcon),
            ])
        ),

      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('SEO Settings')
                .icon(EarthGlobeIcon)
                .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
              S.listItem()
                .title('Contact Settings')
                .icon(UserIcon)
                .child(S.document().schemaType('contactSettings').documentId('contactSettings')),
            ])
        ),

      S.divider(),

      // 3. Any fallback or remaining documents, excluding singletons to prevent duplication
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.includes(listItem.getId() as string)
      ),
    ])
