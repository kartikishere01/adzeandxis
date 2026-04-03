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
    slug: "residence-01",
    title: "RESIDENCE 01",
    description: "A monolithic structure carved from concrete, emphasizing light and shadow in an arid landscape.",
    conceptText: "The primary design intent was to establish a dialogue between the harsh exterior environment and a serene, protected interior. By utilizing raw concrete boards, the structure absorbs the changing light of the day, creating dramatic geometric shadows that act as a natural sundial.",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    metadata: {
      year: "2023",
      location: "Desert Hot Springs, CA",
      typology: "Residential"
    },
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687931-cebf10cb8cb3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "the-brutal-pavilion",
    title: "THE BRUTAL PAVILION",
    description: "An exhibition space exploring weight and levitation through brutalist forms.",
    conceptText: "Challenging the perception of weight, this pavilion appears to float above its minimal glass casing. The heavily textured concrete ceiling presses downward, yet the expansive ground floor retains an ephemeral lightness, blurring the boundary between structure and atmosphere.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      year: "2022",
      location: "Berlin, Germany",
      typology: "Cultural"
    },
    gallery: [
      "https://images.unsplash.com/photo-1506509653066-6b21588cffac?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888086825-9a84393dfeb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2027&auto=format&fit=crop"
    ]
  },
  {
    slug: "alpine-retreat",
    title: "ALPINE RETREAT",
    description: "A dark-timber sanctuary nested within a snowy mountain ridge.",
    conceptText: "Conceived as a visual void against the blinding white snow, the retreat uses charred cedar (Shou Sugi Ban) for its exterior. Inside, the space is intimate and warm, framing exact moments of the surrounding peaks through deeply recessed fenestrations.",
    heroImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      year: "2024",
      location: "Swiss Alps",
      typology: "Hospitality"
    },
    gallery: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2134&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1987&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528909514045-2f427f7f8f60?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    slug: "gallery-minimal",
    title: "GALLERY MINIMAL",
    description: "A perfectly proportioned void dedicated to contemporary art.",
    conceptText: "The architecture exists purely to serve the art. By eliminating all visible hardware, baseboards, and standard fixtures, the space achieves a museum-quality muteness. Natural light is diffused through structural skylights, casting an even, unshadowed glow throughout the day.",
    heroImage: "https://images.unsplash.com/photo-1576402010887-8c4d284ddb54?q=80&w=2070&auto=format&fit=crop",
    metadata: {
      year: "2021",
      location: "Tokyo, Japan",
      typology: "Commercial"
    },
    gallery: [
      "https://images.unsplash.com/photo-1507000868848-bc6c7ca41a27?q=80&w=2081&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533038590840-1c7908b98163?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570716618451-b84e3d31fcbb?q=80&w=2070&auto=format&fit=crop"
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
    image: "/blog_01_light.png",
    date: "April 1, 2026",
    author: "Editorial Team"
  },
  {
    slug: "brass-structures",
    title: "The Return of Geometric Brass",
    excerpt: "Why highly detailed brass repeating structures are making a strong comeback against charcoal backdrops.",
    content: "Warm metals against dark, absorbing materials create an unmistakable tension. In recent installations, the geometric repetition of brass forms over deeply shadowed charcoal backgrounds captures the imagination. This contrast brings warmth and architectural precision to otherwise vast voids. The rhythmic structure of the brass catching light serves not only a functional purpose but commands a presence within the room, elevating the material syntax of the spaces we build.",
    image: "/blog_02_structure.png",
    date: "March 20, 2026",
    author: "Studio Director"
  },
  {
    slug: "designing-the-void",
    title: "Designing the Void",
    excerpt: "How extremely minimal modern interiors use negative space to elevate human experience.",
    content: "An empty gallery room glowing with muted overcast light is not simply 'empty'. It is a deliberate volume of curated negative space. By pulling back, we allow the occupant's mind to expand into the architecture. Concrete flooring and pale ash walls provide an acoustic and visual resting place, ensuring that the void itself becomes the focal point. It is in these silent gaps that true architectural resonance occurs.",
    image: "/blog_03_interior.png",
    date: "February 12, 2026",
    author: "Editorial Team"
  }
];
