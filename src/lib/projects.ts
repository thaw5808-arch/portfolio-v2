export type Shot = { src: string; alt: string };

export type Project = {
  name: string;
  url: string;
  /** Large image on the left of the card. */
  main: Shot;
  /** Two stacked images on the right. */
  side: [Shot, Shot];
};

/** Personal projects, in the order they appear on the page. */
export const PROJECTS: Project[] = [
  {
    name: "ADORÉ",
    url: "https://adore-chi.vercel.app",
    main: { src: "/img/adore-intro-3.jpg", alt: "ADORÉ website intro screen" },
    side: [
      { src: "/img/adore-intro-1.jpg", alt: "ADORÉ opening screen" },
      { src: "/img/adore-intro-4.jpg", alt: "ADORÉ collection screen" },
    ],
  },
  {
    name: "Serpent",
    url: "https://serpent-zeta.vercel.app",
    main: { src: "/img/serpent.jpg", alt: "Serpent home page: Know the snake, know the risk" },
    side: [
      { src: "/img/serpent-2.jpg", alt: "Serpent snake identification and how it works section" },
      { src: "/img/serpent-3.jpg", alt: "Serpent species reference list" },
    ],
  },
  {
    name: "MarineRescue",
    url: "https://marinerescue-five.vercel.app",
    main: { src: "/img/marinerescue.jpg", alt: "MarineRescue home page: Report it, don't move it" },
    side: [
      { src: "/img/marinerescue-2.jpg", alt: "MarineRescue report steps and safety guidance" },
      { src: "/img/marinerescue-3.jpg", alt: "MarineRescue animal picker on the report page" },
    ],
  },
  {
    name: "Vesper",
    url: "https://luxe-fullstack-gamma.vercel.app",
    main: { src: "/img/vesper.jpg", alt: "Vesper store home page: Objects made to outlast trend" },
    side: [
      { src: "/img/vesper-2.jpg", alt: "Vesper tailoring collection banner" },
      { src: "/img/vesper-3.jpg", alt: "Vesper craft story and new season products" },
    ],
  },
  {
    name: "Bendux",
    url: "https://bendux-fullstack.vercel.app",
    main: { src: "/img/bendux.jpg", alt: "Bendux store home page hero" },
    side: [
      { src: "/img/bendux-2.jpg", alt: "Bendux featured product section" },
      { src: "/img/bendux-3.jpg", alt: "Bendux flash sale product grid" },
    ],
  },
];

/** Gallery screenshots, keyed by project. */
export const GALLERY = {
  marinerescue: { src: "/img/marinerescue.jpg", alt: "MarineRescue website" },
  adore: { src: "/img/adore.jpg", alt: "ADORÉ website" },
  serpent: { src: "/img/serpent.jpg", alt: "Serpent website" },
  vesper: { src: "/img/vesper.jpg", alt: "Vesper website" },
  bendux: { src: "/img/bendux.jpg", alt: "Bendux website" },
} as const;

export const EMAIL = "timwinchester16@gmail.com";
