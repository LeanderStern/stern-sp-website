import { GalleryImageMetadata } from '../interfaces/gallery-image-metadata';

const metadata: Omit<GalleryImageMetadata, 'id'>[] = [
    {
        path: 'assets/ago.jpg',
        title: 'home-page.image-gallery.ago.title',
        description: 'home-page.image-gallery.ago.description',
    },
    {
        path: 'assets/firedog.jpg',
        title: 'home-page.image-gallery.firedog.title',
        description: 'home-page.image-gallery.firedog.description',
    },
    {
        path: 'assets/ghost-pack.jpg',
        title: 'home-page.image-gallery.ghost-pack.title',
        description: 'home-page.image-gallery.ghost-pack.description',
    },
    {
        path: 'assets/heart-attack.jpg',
        title: 'home-page.image-gallery.heart-attack.title',
        description: 'home-page.image-gallery.heart-attack.description',
    },
    {
        path: 'assets/impact.jpg',
        title: 'home-page.image-gallery.impact.title',
        description: 'home-page.image-gallery.impact.title',
    },
    {
        path: 'assets/past-descendant.jpg',
        title: 'home-page.image-gallery.past-descendant.title',
        description: 'home-page.image-gallery.past-descendant.description',
    },
    {
        path: 'assets/someones-gotta-do-it.jpg',
        title: 'home-page.image-gallery.someones-gotta-do-it.title',
        description: 'home-page.image-gallery.someones-gotta-do-it.description',
    },
]

export const GALLERY_IMAGE_METADATA: GalleryImageMetadata[] = metadata.map((item, index) => ({
    ...item,
    id: index++,
}));
