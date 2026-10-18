"use client";

import { useEffect, useState, type CSSProperties } from "react";
import CategoryBanner from "@/components/CategoryBanner";
import RentalItems, { FOLDED_CATEGORIES, rentalCategoryCover, type RentalCategory } from "@/components/Gallery";
import ServiceItems, {
  CUSTOM_SERVICES,
  GUEST_SERVICES,
  serviceCover,
  type ServiceItem,
} from "@/components/Services";

type Block =
  | { type: "rental"; category: RentalCategory }
  | { type: "service"; items: ServiceItem[] };

type InventoryCategory = {
  id: string;
  title: string;
  lead: string;
  blocks: Block[];
  coverSrc: string;
  // Old deep-link ids that should open this category.
  aliases?: string[];
};

const SERVICES_BY_ID = new Map(
  [...CUSTOM_SERVICES, ...GUEST_SERVICES]
    .flatMap((item) => [item, ...(item.variants ?? [])])
    .map((item) => [item.id, item] as const),
);

function rentalBlock(id: string): Block {
  const category = FOLDED_CATEGORIES.find((item) => item.id === id);
  if (!category) throw new Error(`Unknown rental category: ${id}`);
  return { type: "rental", category };
}

function serviceBlock(ids: string[]): Block {
  return {
    type: "service",
    items: ids.map((id) => {
      const item = SERVICES_BY_ID.get(id);
      if (!item) throw new Error(`Unknown service: ${id}`);
      return item;
    }),
  };
}

function fromRental(id: string, title?: string, aliases?: string[]): InventoryCategory {
  const block = rentalBlock(id);
  if (block.type !== "rental") throw new Error("unreachable");
  const { category } = block;
  return {
    id: category.id,
    title: title ?? category.title,
    lead: category.lead,
    blocks: [block],
    coverSrc: rentalCategoryCover(category).src,
    aliases,
  };
}

function fromServices(
  id: string,
  title: string,
  lead: string,
  ids: string[],
  aliases?: string[],
  coverId?: string,
): InventoryCategory {
  const block = serviceBlock(ids);
  if (block.type !== "service") throw new Error("unreachable");
  const coverItem = (coverId && block.items.find((item) => item.id === coverId)) || block.items[0];
  return { id, title, lead, blocks: [block], coverSrc: serviceCover(coverItem).src, aliases };
}

// One ordered list for /inventar/: rental categories and add-on services side by side.
const INVENTORY_CATEGORIES: InventoryCategory[] = [
  fromServices(
    "inventar-uvitacie-prvky",
    "Uvítacie prvky",
    "Uvítacia tabuľa, uvítací banner, zrkadlá a rôzne druhy zasadacieho poriadku.",
    [
      "zasadaci-poriadok-v-obraze",
      "uvitacia-tabula",
      "zasadaci-poriadok-visiaci",
      "uvitacia-latka",
      "uvitacie-zrkadlo",
      "zrkadlo-s-menami-a-textom",
      "zasadaci-poriadok-luxury",
      "uvitacia-latka-s-fotkami",
    ],
    ["doplnky-na-mieru"],
    "uvitacia-latka",
  ),
  fromRental("prenajom-stojany-zrkadla"),
  fromRental("prenajom-vazy-svietniky"),
  fromRental("prenajom-kvetinova-vyzdoba"),
  fromServices(
    "inventar-tlacoviny",
    "Tlačoviny",
    "Pozvánky, menovky, menu s menovkou, balík tlačovín, kniha hostí a box na obálky.",
    ["pozvanky", "menovky", "menu-s-menovkou", "balik-tlacovin", "kniha-hosti", "box-na-obalky"],
  ),
  fromServices(
    "inventar-vyzdoba-stola",
    "Výzdoba stola",
    "Servítky a prstenec Diamond.",
    ["servitky", "prstenec-diamond"],
  ),
  fromServices(
    "inventar-vyzdoba-priestoru",
    "Výzdoba priestoru",
    "Strom na plátne, náramky, vejáre, okuliare, omaľovánky a cigar bar.",
    ["strom-na-platne", "naramky", "vejare", "okuliare", "omalovanky", "cigar-bar"],
    ["doplnky-pre-hosti"],
  ),
  fromServices(
    "inventar-darceky-pre-hosti",
    "Darčeky pre hostí",
    "Mini medík domáci a mini fľaštičky.",
    ["domaci-med", "flasticky"],
  ),
  fromRental("prenajom-ostatne", undefined, ["prenajom-detsky-kutik"]),
];

// Accent-insensitive, so both #doplnky-pre-hosti and #doplnky-pre-hostí work.
function normalizeHash(hash: string) {
  let value = hash.replace(/^#/, "");
  try {
    value = decodeURIComponent(value);
  } catch {
    // keep the raw value
  }
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function findCategoryByHash(hash: string) {
  const id = normalizeHash(hash);
  return INVENTORY_CATEGORIES.find((category) => category.id === id || category.aliases?.includes(id));
}

export default function Inventory() {
  const [openCats, setOpenCats] = useState<string[]>([]);

  // Deep links (#prenajom-..., #inventar-..., old #doplnky-...) open the matching category and scroll to it.
  useEffect(() => {
    const openFromHash = () => {
      const category = findCategoryByHash(window.location.hash);
      if (!category) return;
      const { id } = category;
      setOpenCats((current) => (current.includes(id) ? current : [...current, id]));
      window.requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.querySelector(".inv-cat-cover")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("popstate", openFromHash);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("popstate", openFromHash);
    };
  }, []);

  function toggleCategory(id: string) {
    setOpenCats((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <section id="galeria">
      <div className="rental-bg-lines" />
      <div className="rental-glow" />
      <div className="rental-stage reveal reveal-d2">
        <h2 className="inv-intro reveal">
          Vyberte si inventár pre kompletnú výzdobu <em>alebo prenájom jednotlivých dekorácií</em>
        </h2>
        <div className="inv-cats">
          {INVENTORY_CATEGORIES.map((category, index) => {
            const pair = Math.floor(index / 2);
            const layout = {
              "--inv-col": (index % 2) + 1,
              "--inv-cover-row": pair * 3 + 1,
              "--inv-panel-row": pair * 3 + 2 + (index % 2),
            } as CSSProperties;
            return (
              <CategoryBanner
                key={category.id}
                id={category.id}
                title={category.title}
                lead={category.lead}
                coverSrc={category.coverSrc}
                isOpen={openCats.includes(category.id)}
                onToggle={() => toggleCategory(category.id)}
                layout={layout}
              >
                {category.blocks.map((block, blockIndex) => (
                  <div className="inv-cat-block" key={blockIndex}>
                    {block.type === "rental" ? (
                      <RentalItems category={block.category} />
                    ) : (
                      <ServiceItems items={block.items} eyebrow={category.title} afterSelect="stay" />
                    )}
                  </div>
                ))}
              </CategoryBanner>
            );
          })}
        </div>
      </div>
    </section>
  );
}
