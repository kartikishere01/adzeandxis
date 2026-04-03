export interface Project {
  slug: string;
  title: string;
  description: string;
  conceptText: string;
  heroImage: string;
  metadata: {
    year: string;
    location: string;
    typology: string;
  };
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "9-11-ice-cafe",
    title: "9-11 ICE CAFE",
    description: "A dynamic, high-contrast hospitality space defined by playful graphics and vibrant accents.",
    conceptText: "Designed to evoke sweet indulgence, the 9-11 Ice Cafe contrasts bright white terrazzo flooring with striking black and pink interventions. The custom drip-effect wall graphics and vividly colored counters create an immersive, highly curated aesthetic. Warm ambient lighting softens the bold geometry, inviting guests into a modern dessert oasis.",
    heroImage: "/projects/9-11-ice-cafe/image-1.JPG",
    metadata: {
      year: "2024",
      location: "Commercial",
      typology: "Hospitality"
    },
    gallery: [
      "/projects/9-11-ice-cafe/image-1.JPG",
      "/projects/9-11-ice-cafe/image-2.JPG",
      "/projects/9-11-ice-cafe/image-3.JPG"
    ]
  },
  {
    slug: "adze-axis-interior",
    title: "ADZE & AXIS RESIDENCE",
    description: "A sophisticated narrative of luxury living, intertwining warm wood veneers, classic marble, and curated statement lighting.",
    conceptText: "This high-end interior residential project redefines contemporary luxury. The design language marries rich, dark timber paneling with the cool elegance of natural stone and marble. Bespoke elements, such as the jewel-toned velvet bar seating and custom crystal chandeliers, create distinct focal points within the open-plan layout. Every texture, from the plush textiles in the master suite to the reflective surfaces in the dining area, has been meticulously selected to foster an atmosphere of refined comfort and cinematic grandeur.",
    heroImage: "/projects/adze-axis-interior/iamge-2.PNG",
    metadata: {
      year: "2024",
      location: "Private Residence",
      typology: "Interior Design"
    },
    gallery: [
      "/projects/adze-axis-interior/iamge-1.PNG",
      "/projects/adze-axis-interior/iamge-2.PNG",
      "/projects/adze-axis-interior/image-3.PNG",
      "/projects/adze-axis-interior/image-4.PNG"
    ]
  },
  {
    slug: "adze-axis-cafe",
    title: "ADZE & AXIS CAFE",
    description: "An organic, arched interior space marrying botanical elements with fluted textures and warm, ambient illumination.",
    conceptText: "Envisioned as an urban oasis, the Adze & Axis Cafe weaves nature directly into the architecture. Continuous ceiling arches soften the spatial boundaries, while hanging botanical installations bring life and a profound sense of calm to the interior. The material palette relies heavily on raw, tactile finishes—plastered walls, fluted timber counters, and woven rattan seating. The soft, diffuse lighting emphasizes the organic curves of the space, creating an environment that feels both sophisticated and inherently grounded.",
    heroImage: "/projects/Interior/image-2.jpg",
    metadata: {
      year: "2024",
      location: "Commercial",
      typology: "Interior & Hospitality"
    },
    gallery: [
      "/projects/Interior/image-1.jpg",
      "/projects/Interior/image-2.jpg",
      "/projects/Interior/image-3.jpg",
      "/projects/Interior/image-4.jpg"
    ]
  }
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export const newsroom: Article[] = [
  {
    slug: "light-and-shadow-in-minimalism",
    title: "Light & Shadow in Minimalism",
    excerpt: "Exploring the psychological impact of stark morning shadows across monolithic concrete structures.",
    content: "The balance of light and shadow is fundamental to minimalist architecture. When we strip away ornamentation, we rely on the pure geometry of light to define spaces. Morning shadows drawn across concrete surfaces create a dynamic dialogue between the permanent and the ephemeral. As the sun traverses the sky, these monolithic volumes fracture and reassemble visually, providing an ever-shifting psychological grounding for the inhabitants.",
    image: "/blog-1.png",
    date: "April 1, 2026",
    author: "Editorial Team"
  },
  {
    slug: "brass-structures",
    title: "The Return of Geometric Brass",
    excerpt: "Why highly detailed brass repeating structures are making a strong comeback against charcoal backdrops.",
    content: "Warm metals against dark, absorbing materials create an unmistakable tension. In recent installations, the geometric repetition of brass forms over deeply shadowed charcoal backgrounds captures the imagination. This contrast brings warmth and architectural precision to otherwise vast voids. The rhythmic structure of the brass catching light serves not only a functional purpose but commands a presence within the room, elevating the material syntax of the spaces we build.",
    image: "/blog-2.png",
    date: "March 20, 2026",
    author: "Studio Director"
  },
  {
    slug: "designing-the-void",
    title: "Designing the Void",
    excerpt: "How extremely minimal modern interiors use negative space to elevate human experience.",
    content: "An empty gallery room glowing with muted overcast light is not simply 'empty'. It is a deliberate volume of curated negative space. By pulling back, we allow the occupant's mind to expand into the architecture. Concrete flooring and pale ash walls provide an acoustic and visual resting place, ensuring that the void itself becomes the focal point. It is in these silent gaps that true architectural resonance occurs.",
    image: "/blog-3.png",
    date: "February 12, 2026",
    author: "Editorial Team"
  },
  {
    slug: "raw-materiality",
    title: "Embracing Raw Materiality",
    excerpt: "The aesthetic shift towards unfinished textures, exposed plaster, and raw terrazzo.",
    content: "There is a deep honesty in exposing the natural grain of materials. In modern structural design, the era of overly polished surfaces is fading, making way for raw, tactile environments. Exposed concrete, untampered wood grains, and organic plaster finishings root the architectural experience in nature. The imperfections of these materials are no longer seen as defects carefully hidden, but as the primary aesthetic focus of the room.",
    image: "/projects/Interior/image-1.jpg",
    date: "January 04, 2026",
    author: "Lead Designer"
  }
];
