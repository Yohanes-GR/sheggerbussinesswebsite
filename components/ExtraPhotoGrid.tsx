import { ImageFrame } from "@/components/ImageFrame";
import type { RelatedPhoto } from "@/lib/relatedMedia";
import type { ContentNode } from "@/lib/data";

export function extraPhotosFor(node: ContentNode): RelatedPhoto[] {
  const photos: RelatedPhoto[] = [];
  if (node.image) photos.push({ src: node.image, alt: node.title });
  for (const src of node.gallery ?? []) {
    if (src && src !== node.image) photos.push({ src, alt: node.title });
  }
  return photos;
}

export function ExtraPhotoGrid({
  images,
  title = "Photos",
}: {
  images: RelatedPhoto[];
  title?: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
      <h2 className="text-2xl font-semibold text-brand">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((photo) => (
          <ImageFrame
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="h-56 rounded-xl sm:h-72"
          />
        ))}
      </div>
    </section>
  );
}
