import { ImageFrame } from "@/components/ImageFrame";
import type { RelatedPhoto } from "@/lib/relatedMedia";

export function RelatedPhotos({
  images,
  title = "Related work",
}: {
  images: RelatedPhoto[];
  title?: string;
}) {
  if (images.length === 0) return null;
  const [hero, ...rest] = images;

  return (
    <section>
      <ImageFrame src={hero.src} alt={hero.alt} className="h-[48vh] min-h-[240px] w-full sm:h-[58vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-transparent to-transparent" />
        <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
          {title}
        </p>
      </ImageFrame>
      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((photo) => (
            <ImageFrame
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="h-56 w-full sm:h-72"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">{photo.alt}</p>
            </ImageFrame>
          ))}
        </div>
      )}
    </section>
  );
}
