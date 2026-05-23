export type ImageAsset = {
  src: string;
  alt: string;
};

const IMAGE_VERSION = "2026-05-23-01";
export const FALLBACK_IMAGE = "/images/gallery/placeholder.png";

export const GALLERY_IMAGES: ImageAsset[] = [
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Svadobná výzdoba" },
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Detail výzdoby" },
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Svadobný stôl" },
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Srdcový stojan" },
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Výzdoba obradu" },
  { src: withImageVersion(FALLBACK_IMAGE), alt: "Kvety a ikebany" },
];

export function packageImage(packageId: string, label: string): ImageAsset {
  return numberedCollectionFirst(
    numberedCollection(`/images/packages/balik-${packageId}`, label, PACKAGE_IMAGE_COUNTS[packageId] ?? 0),
    label
  );
}

export function packageDetailImages(packageId: string, label: string): ImageAsset[] {
  return numberedCollectionOrFallback(
    numberedCollection(`/images/packages/balik-${packageId}`, label, PACKAGE_IMAGE_COUNTS[packageId] ?? 0),
    label
  );
}

export function serviceImage(category: "Doplnky na mieru" | "Doplnky pre hostí", serviceId: string, label: string): ImageAsset {
  return numberedCollectionFirst(serviceImages(category, serviceId, label), label);
}

export function serviceDetailImages(category: "Doplnky na mieru" | "Doplnky pre hostí", serviceId: string, label: string): ImageAsset[] {
  return numberedCollectionOrFallback(serviceImages(category, serviceId, label), label);
}

export function rentalImage(categoryId: string, offerId: string, label: string): ImageAsset {
  return numberedCollectionFirst(rentalImages(categoryId, offerId, label), label);
}

export function rentalDetailImages(categoryId: string, offerId: string, label: string): ImageAsset[] {
  return numberedCollectionOrFallback(rentalImages(categoryId, offerId, label), label);
}

const PACKAGE_IMAGE_COUNTS: Record<string, number> = {
  s: 0,
  m: 0,
  l: 0,
};

const SERVICE_IMAGE_COUNTS: Record<string, number> = {
  "doplnky-na-mieru:pozvanky": 4,
  "doplnky-na-mieru:menovky": 4,
  "doplnky-na-mieru:balik-tlacovin": 8,
  "doplnky-na-mieru:servitky": 2,
  "doplnky-na-mieru:kniha-hosti": 1,
  "doplnky-na-mieru:box-na-obalky": 2,
  "doplnky-na-mieru:strom-na-platne": 2,
  "doplnky-na-mieru:uvitacia-tabula": 3,
  "doplnky-na-mieru:uvitacia-latka": 1,
  "doplnky-pre-hosti:cigar-bar": 2,
  "doplnky-pre-hosti:detske-balicky": 2,
  "doplnky-pre-hosti:okuliare": 1,
  "doplnky-pre-hosti:omalovanky": 2,
  "doplnky-pre-hosti:papucky": 2,
  "doplnky-pre-hosti:vejare": 1,
  "doplnky-pre-hosti:flasticky": 1,
};

const RENTAL_IMAGE_COUNTS: Record<string, number> = {
  "kvetinova-vyzdoba:ikebana-na-stoly": 2,
  "kvetinova-vyzdoba:ikebana-na-stoly-s-vazami-okolo": 2,
  "kvetinova-vyzdoba:mala-ikebana": 1,
  "kvetinova-vyzdoba:dlha-ikebana": 2,
  "stojany-zrkadla:ovalny-stojan": 1,
  "stojany-zrkadla:srdcovy-stojan": 4,
  "stojany-zrkadla:stojace-tyce-s-balonmi": 1,
  "stojany-zrkadla:zrkadlo-s-menami-a-textom": 2,
  "ostatne:capovacie-stanice": 3,
  "ostatne:drevene-boxy": 2,
  "ostatne:lampase": 3,
  "vazy-svietniky:vysoke-svietniky": 1,
  "vazy-svietniky:uzke-metrove-svietniky": 1,
};

function serviceCategoryFolder(category: "Doplnky na mieru" | "Doplnky pre hostí") {
  return category === "Doplnky na mieru" ? "doplnky-na-mieru" : "doplnky-pre-hosti";
}

function rentalCategoryFolder(categoryId: string) {
  return categoryId.replace(/^prenajom-/, "");
}

function serviceImages(category: "Doplnky na mieru" | "Doplnky pre hostí", serviceId: string, label: string) {
  const folder = serviceCategoryFolder(category);
  return numberedCollection(
    `/images/services/${folder}/${serviceId}`,
    label,
    SERVICE_IMAGE_COUNTS[`${folder}:${serviceId}`] ?? 0
  );
}

function rentalImages(categoryId: string, offerId: string, label: string) {
  const folder = rentalCategoryFolder(categoryId);
  return numberedCollection(
    `/images/rental/${folder}/${offerId}`,
    label,
    RENTAL_IMAGE_COUNTS[`${folder}:${offerId}`] ?? 0
  );
}

function numberedCollection(basePath: string, label: string, count: number): ImageAsset[] {
  return Array.from({ length: count }, (_, index) => ({
    src: withImageVersion(`${basePath}/${String(index + 1).padStart(2, "0")}.jpg`),
    alt: index === 0 ? label : `${label} - foto ${index + 1}`,
  }));
}

function numberedCollectionFirst(images: ImageAsset[], label: string): ImageAsset {
  return images[0] ?? { src: FALLBACK_IMAGE, alt: label };
}

function numberedCollectionOrFallback(images: ImageAsset[], label: string): ImageAsset[] {
  return images.length ? images : [{ src: FALLBACK_IMAGE, alt: label }];
}

function withImageVersion(path: string) {
  return `${path}?v=${IMAGE_VERSION}`;
}
