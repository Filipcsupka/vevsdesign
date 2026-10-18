export type PackageId = "s" | "m" | "l";

export type PackageData = {
  id: PackageId;
  badge: string;
  name: string;
  price: string;
  unitPrice: number;
  items: string[];
  summary: string;
  featured?: boolean;
};

export const PACKAGES: PackageData[] = [
  {
    id: "s",
    summary: "Stoly, sviečky a uvítacie prvky v jemnom ladení.",
    badge: "Základný",
    name: "Balík S",
    price: "450 €",
    unitPrice: 450,
    items: [
      "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi)",
      "Sviečky a champagne svietniky pre každý stôl",
      "Menovky a servítky s vašimi iniciálkami",
      "Uvítacia tabuľa alebo 50x40cm uvítacie zrkadlo",
      "Zasadací poriadok A3 za sklom",
    ],
  },
  {
    id: "m",
    summary: "Stoly aj hlavný stôl, banner, zrkadlo a tlačoviny.",
    badge: "Najpredávanejší",
    name: "Balík M",
    price: "600 €",
    unitPrice: 600,
    featured: true,
    items: [
      "Výzdoba stolov (stredové ikebany alebo viacero váz so živými kvetmi)",
      "Sviečky a champagne svietniky pre každý stôl",
      "Menovky a servítky s vašimi iniciálkami",
      "Výzdoba hlavného stola (zahŕňajúca dlhú ikebanu a úzke svietniky so sviečkami)",
      "Uvítací banner s Vašim textom",
      "Zrkadlo s Vašim textom",
      "Balík tlačovín a 2x ikebana na stojanoch pri vchode",
    ],
  },
  {
    id: "l",
    summary: "Všetko z balíka M plus fotostena alebo srdcový stojan.",
    badge: "Premium",
    name: "Balík L",
    price: "750 €",
    unitPrice: 750,
    items: [
      "Kompletný balík M",
      "Fotostena 2x2m akákoľvek z nášho výberu alebo srdcový stojan",
      "Personalizované tabuľky do fotokútika",
      "Výzdoba priestoru malými ikebanami alebo inými požiadavkami",
    ],
  },
];
