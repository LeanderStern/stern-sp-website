import { GalleryImageMetadata } from '../interfaces/gallery-image-metadata';

const metadata: Omit<GalleryImageMetadata, 'id'>[] = [
    {
        path: 'assets/ago.jpg',
        titleReference: 'home-page.image-gallery.ago.title',
        descriptionReference: 'home-page.image-gallery.ago.description',
    },
    {
        path: 'assets/firedog.jpg',
        titleReference: 'home-page.image-gallery.firedog.title',
        descriptionReference: 'home-page.image-gallery.firedog.description',
    },
    {
        path: 'assets/ghost-pack.jpg',
        titleReference: 'home-page.image-gallery.ghost-pack.title',
        descriptionReference: 'home-page.image-gallery.ghost-pack.description',
    },
    {
        path: 'assets/heart-attack.jpg',
        titleReference: 'home-page.image-gallery.heart-attack.title',
        descriptionReference: 'home-page.image-gallery.heart-attack.description',
    },
    {
        path: 'assets/impact.jpg',
        titleReference: 'home-page.image-gallery.impact.title',
        descriptionReference: 'home-page.image-gallery.impact.title',
    },
    {
        path: 'assets/past-descendant.jpg',
        titleReference: 'home-page.image-gallery.past-descendant.title',
        descriptionReference: 'home-page.image-gallery.past-descendant.description',
    },
    {
        path: 'assets/someones-gotta-do-it.jpg',
        titleReference: 'home-page.image-gallery.someones-gotta-do-it.title',
        descriptionReference: 'home-page.image-gallery.someones-gotta-do-it.description',
    },
]

export const GALLERY_IMAGE_METADATA: GalleryImageMetadata[] = metadata.map((item, index) => ({
    ...item,
    id: index++,
}));
