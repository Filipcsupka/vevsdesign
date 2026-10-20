# Animation dependencies

The hero uses `gsap` 3.15.0 and `@gsap/react` 2.1.2, installed from public npm and pinned by `package-lock.json`. Both use the [GSAP standard no-charge license](https://gsap.com/standard-license). Keep the license and copyright notices shipped with the packages. Commercial website use is covered; the license restricts competing visual animation builders.

Implementation references: [React integration and cleanup](https://gsap.com/resources/React/), [timelines](https://gsap.com/docs/v3/GSAP/gsap.timeline()/), and [responsive/reduced-motion setup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/). The hero uses three existing headline lines rather than runtime text splitting.

The item photo carousel and enlarged viewer use project code, CSS scroll snapping and the native HTML dialog. No React Bits source, graphics runtime or smooth-scroll dependency is bundled.
