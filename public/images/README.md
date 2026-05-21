# Image structure

Fotky su pripravene tak, aby sa dali doplnat bez zasahu do layoutu.

## Nazvy suborov

- `01.jpg` - hlavna fotka pre kartu a zaroven prva velka fotka v modale.
- `02.jpg` - druha fotka v poradi.
- `03.jpg` - tretia fotka v poradi.
- dalsie fotky rovnako pokracuju ako `04.jpg`, `05.jpg`...

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
