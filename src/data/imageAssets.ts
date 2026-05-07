export type ImageAsset = {
  src: string;
  alt: string;
};

export const FALLBACK_IMAGE = "/images/gallery/placeholder.png";

export const GALLERY_IMAGES: ImageAsset[] = [
  { src: "/images/gallery/01.webp", alt: "Svadobná výzdoba" },
  { src: "/images/gallery/02.webp", alt: "Detail výzdoby" },
  { src: "/images/gallery/03.webp", alt: "Svadobný stôl" },
  { src: "/images/gallery/04.webp", alt: "Srdcový stojan" },
  { src: "/images/gallery/05.webp", alt: "Výzdoba obradu" },
  { src: "/images/gallery/06.webp", alt: "Kvety a ikebany" },
];

export function packageImage(packageId: string, label: string): ImageAsset {
  return {
    src: `/images/packages/balik-${packageId}/cover.webp`,
    alt: label,
  };
}

export function packageDetailImages(packageId: string, label: string): ImageAsset[] {
  return [
    { src: `/images/packages/balik-${packageId}/detail-01.webp`, alt: `${label} - detail výzdoby` },
    { src: `/images/packages/balik-${packageId}/detail-02.webp`, alt: `${label} - ďalší detail` },
  ];
}

export function serviceImage(category: "Doplnky na mieru" | "Doplnky pre hostí", serviceId: string, label: string): ImageAsset {
  return {
    src: `/images/services/${serviceCategoryFolder(category)}/${serviceId}/cover.webp`,
    alt: label,
  };
}

export function serviceDetailImages(category: "Doplnky na mieru" | "Doplnky pre hostí", serviceId: string, label: string): ImageAsset[] {
  const folder = serviceCategoryFolder(category);
  return [
    { src: `/images/services/${folder}/${serviceId}/detail-01.webp`, alt: `${label} - ukážka` },
    { src: `/images/services/${folder}/${serviceId}/detail-02.webp`, alt: `${label} - detail` },
  ];
}

export function rentalImage(categoryId: string, offerId: string, label: string): ImageAsset {
  return {
    src: `/images/rental/${rentalCategoryFolder(categoryId)}/${offerId}/cover.webp`,
    alt: label,
  };
}

export function rentalDetailImages(categoryId: string, offerId: string, label: string): ImageAsset[] {
  const folder = rentalCategoryFolder(categoryId);
  return [
    { src: `/images/rental/${folder}/${offerId}/detail-01.webp`, alt: `${label} - ukážka prenájmu` },
    { src: `/images/rental/${folder}/${offerId}/detail-02.webp`, alt: `${label} - aranžmán` },
  ];
}

function serviceCategoryFolder(category: "Doplnky na mieru" | "Doplnky pre hostí") {
  return category === "Doplnky na mieru" ? "doplnky-na-mieru" : "doplnky-pre-hosti";
}

function rentalCategoryFolder(categoryId: string) {
  return categoryId.replace(/^prenajom-/, "");
}
