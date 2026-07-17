import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import RevealController from "@/components/RevealController";
import VfStory, { type VfChapter } from "@/components/VfStory";

export const metadata: Metadata = {
  title: "V & F — Veronika a Filip | Vevsdesign",
  description: "Náš príbeh v skratke — Veronika a Filip.",
  robots: { index: false, follow: false },
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Načíta obrázky z priečinka public/images/vf/<folder> pri builde. */
function loadImages(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "vf", folder);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }
  const images = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "sk"));
  const visibleImages =
    images.length > 1 ? images.filter((file) => !file.toLowerCase().startsWith("placeholder.")) : images;

  return visibleImages
    .map((file) => `/images/vf/${folder}/${file}`);
}

const CHAPTER_META: Array<Omit<VfChapter, "images"> & { folder: string }> = [
  {
    folder: "01-ako-sme-sa-spoznali",
    label: "Kapitola 01",
    title: "Ako to celé začalo",
    text:
      "Nič veľkolepé, žiadne ohňostroje — len dvaja ľudia, ktorí sa v správnej chvíli ocitli na správnom mieste. " +
      "Vraj náhoda. My tomu radšej hovoríme najlepšie rozhodnutie, aké sme spolu nespravili úmyselne.",
    alt: "Veronika a Filip — ako sme sa spoznali",
  },
  {
    folder: "02-prva-dovolenka",
    label: "Kapitola 02",
    title: "Prvá spoločná dovolenka",
    text:
      "Test kompatibility na vysokej úrovni po troch rokoch: jedna mapa a jeden skrytý plán. " +
      "Prežili sme to, zasnúbili sme sa a odvtedy vieme, že tých dovoleniek a zážitkov bude ešte veľa.",
    alt: "Veronika a Filip na prvej spoločnej dovolenke",
  },
  {
    folder: "03-prichod-syna",
    label: "Kapitola 03",
    title: "Náš najväčší poklad",
    text:
      "Potom prišiel on — malý šéf, ktorý nám prevrátil život naruby a naučil nás, čo je skutočná láska (a čo je skutočný nedostatok spánku). " +
      "Odvtedy sme tím troch a ten najdôležitejší z nás má najmenšie topánky.",
    alt: "Príchod nášho syna",
  },
  {
    folder: "04-svadba",
    label: "Kapitola 04",
    title: "A ideme ďalej",
    text:
      "Dnes to celé spečaťujeme — a vy ste toho súčasťou. Ďakujeme, že ste tu s nami. " +
      "Bez vás by to bola len pekná párty; s vami je to náš deň.",
    alt: "Veronika a Filip — svadba",
  },
];

export default function VfPage() {
  const heroImages = loadImages("hero");
  const chapters: VfChapter[] = CHAPTER_META.map(({ folder, ...meta }) => ({
    ...meta,
    images: loadImages(folder),
  }));

  return (
    <>
      <RevealController />
      <BackgroundCanvas />
      <VfStory heroImages={heroImages} chapters={chapters} />
    </>
  );
}
