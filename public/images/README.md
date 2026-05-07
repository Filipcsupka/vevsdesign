# Image structure

Fotky su pripravene tak, aby sa dali doplnat bez zasahu do layoutu.

## Nazvy suborov

- `cover.webp` - hlavna fotka pre kartu.
- `detail-01.webp` - prva fotka v detailnom modale.
- `detail-02.webp` - druha fotka v detailnom modale.

Ak subor este neexistuje, web automaticky pouzije `gallery/placeholder.png`.

## Struktura

```text
images/
  hero/
  packages/
    balik-s/
    balik-m/
    balik-l/
  services/
    doplnky-na-mieru/
      pozvanky/
      menovky/
      balik-tlacovin/
      servitky/
      kniha-hosti/
      box-na-obalky/
      strom-na-platne/
      uvitacia-tabula/
      uvitacia-latka/
    doplnky-pre-hosti/
      cigar-bar/
      detske-balicky/
      omalovanky/
      vejare/
      papucky/
      okuliare/
      domaci-med/
      flasticky/
  rental/
    kvetinova-vyzdoba/
    detsky-kutik/
    stojany-zrkadla/
    vazy-svietniky/
    ostatne/
  gallery/
```
