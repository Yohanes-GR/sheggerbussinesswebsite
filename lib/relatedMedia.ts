import type { ContentNode, Division } from "@/lib/data";
import type { Project } from "@/lib/types";

export type RelatedPhoto = { src: string; alt: string };

function uniquePhotos(items: RelatedPhoto[]): RelatedPhoto[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.src || seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

function collectNodePhotos(nodes: ContentNode[] | undefined, photos: RelatedPhoto[]) {
  for (const node of nodes ?? []) {
    if (node.image) photos.push({ src: node.image, alt: node.title });
    collectNodePhotos(node.children, photos);
  }
}

export function relatedPhotosForDivision(
  division: Division,
  projects: Project[],
): RelatedPhoto[] {
  const photos: RelatedPhoto[] = [];
  if (division.image) photos.push({ src: division.image, alt: division.title });
  collectNodePhotos(division.children, photos);
  for (const project of projects) {
    if (project.division === division.slug && project.image) {
      photos.push({ src: project.image, alt: project.title });
    }
  }
  return uniquePhotos(photos);
}

export function relatedPhotosForService(
  service: ContentNode & { divisionSlug: string; title: string },
  siblings: ContentNode[],
  projects: Project[],
): RelatedPhoto[] {
  const photos: RelatedPhoto[] = [];
  if (service.image) photos.push({ src: service.image, alt: service.title });
  collectNodePhotos(service.children, photos);
  for (const sibling of siblings) {
    if (sibling.slug !== service.slug && sibling.image) {
      photos.push({ src: sibling.image, alt: sibling.title });
    }
  }
  for (const project of projects) {
    if (project.division === service.divisionSlug && project.image) {
      photos.push({ src: project.image, alt: project.title });
    }
  }
  return uniquePhotos(photos);
}
