export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  htmlContent?: string; // WordPress HTML content support
  highlights: string[];
  category: "Architecture" | "Interior Design" | "Luxury Living" | "Sustainable Design" | "Tech & Urban";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  bentoSpan?: "col-span-1" | "col-span-1 lg:col-span-2";
  tags: string[];
  views: number;
  likes: number;
}

export type LayoutMode = "bento" | "grid" | "list";
export type SortOption = "newest" | "popular" | "readTime";

export const CATEGORIES = [
  "All",
  "Architecture",
  "Interior Design",
  "Luxury Living",
  "Sustainable Design",
  "Tech & Urban"
] as const;

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "evolution-of-minimalist-villas-2026",
    title: "The Evolution of Minimalist Modernist Villas in 2026",
    subtitle: "How modern architectural geometry is balancing pure aesthetics with functional climate resiliency.",
    excerpt: "Modernist villa design is undergoing a structural renaissance. Today's high-end luxury residences prioritize seamless indoor-outdoor transitions, cantilevered structural spans, and intelligent thermal envelopes.",
    content: [
      "In contemporary residential architecture, minimalism is no longer merely an aesthetic philosophy—it is an engineering discipline. Today's discerning homeowners seek spaces that radiate quiet luxury while maintaining peak thermal efficiency and structural integrity.",
      "The use of ultra-slim sightline glazing, post-tensioned slab cantilevers, and hidden architectural drainage allows modern villas to appear almost weightless against surrounding landscapes.",
      "At Pentahouse, our design language centers around volumetric harmony—where monolithic concrete panels interact seamlessly with warm timber cladding and custom bronze acoustic frames."
    ],
    htmlContent: `
      <p>In contemporary residential architecture, minimalism is no longer merely an aesthetic philosophy—it is an engineering discipline. Today's discerning homeowners seek spaces that radiate quiet luxury while maintaining peak thermal efficiency and structural integrity.</p>
      <h2>Volumetric Engineering & Cantilevered Spans</h2>
      <p>The use of ultra-slim sightline glazing, post-tensioned slab cantilevers, and hidden architectural drainage allows modern villas to appear almost weightless against surrounding landscapes.</p>
      <blockquote>"True architectural luxury lies not in ornamentation, but in the effortless resolution of spatial volume and natural light."</blockquote>
      <p>At Pentahouse, our design language centers around volumetric harmony—where monolithic concrete panels interact seamlessly with warm timber cladding and custom bronze acoustic frames.</p>
    `,
    highlights: [
      "Zero-threshold floor-to-ceiling glass wall integration",
      "Thermally broken aluminum and bronze structural frames",
      "Hidden ambient lighting channels built into raw concrete soffits",
      "Custom solar micro-shading louvers tuned to seasonal sun paths"
    ],
    category: "Architecture",
    author: {
      name: "Ar. Vikramaditya Sen",
      role: "Principal Design Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Sep 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    bentoSpan: "col-span-1 lg:col-span-2",
    tags: ["Minimalism", "Luxury Villa", "Cantilever"],
    views: 1420,
    likes: 184
  },
  {
    id: "blog-2",
    slug: "biophilic-architecture-high-rise-ecosystems",
    title: "Biophilic Architecture: Merging High-Rise Luxury with Ecosystems",
    subtitle: "Integrating vertical gardens, natural airflow corridors, and living water features inside high-density towers.",
    excerpt: "Biophilic design has moved beyond indoor plants into structural integration. Discover how vertical facades are improving indoor air purity.",
    content: [
      "Urban high-rises are transforming into living, breathing ecosystems. Biophilic architecture fuses organic botanical life directly into structural concrete and steel facades.",
      "By incorporating engineered hydroponic planters and automated drip irrigation, sky gardens act as natural acoustic buffers and insulation layers against city noise and thermal heat gain.",
      "Pentahouse incorporates bio-centric design principles across all urban projects, creating tranquility hubs inside bustling metropolitan centers."
    ],
    htmlContent: `
      <p>Urban high-rises are transforming into living, breathing ecosystems. Biophilic architecture fuses organic botanical life directly into structural concrete and steel facades.</p>
      <h2>Sky Gardens & Micro-Climate Control</h2>
      <p>By incorporating engineered hydroponic planters and automated drip irrigation, sky gardens act as natural acoustic buffers and insulation layers against city noise and thermal heat gain.</p>
      <p>Pentahouse incorporates bio-centric design principles across all urban projects, creating tranquility hubs inside bustling metropolitan centers.</p>
    `,
    highlights: [
      "Automated sensor-driven drip irrigation systems",
      "Native drought-tolerant flora selected for high-altitude wind resistance",
      "Natural indoor cascade waterfalls functioning as acoustic white noise buffers"
    ],
    category: "Sustainable Design",
    author: {
      name: "Sophia Martinez",
      role: "Head of Sustainable Architecture",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    date: "Sep 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1",
    tags: ["Biophilic", "Sky Garden", "Sustainability"],
    views: 980,
    likes: 142
  },
  {
    id: "blog-3",
    slug: "acoustic-engineering-open-plan-penthouses",
    title: "Acoustic Engineering in Open-Plan Penthouse Interiors",
    subtitle: "Eliminating resonance and echo in multi-level open glass and marble living spaces.",
    excerpt: "Open-plan penthouse designs featuring double-height ceilings and marble flooring present acoustic challenges. Learn how dampening creates tranquility.",
    content: [
      "Double-height living rooms with expansive glass expanses often suffer from unpleasant sound reflection. Traditional remedies—heavy curtains and thick carpets—frequently compromise clean modern aesthetics.",
      "Our architectural team utilizes micro-perforated wood ceiling panels and sound-absorbent acoustic plaster that preserves smooth visually seamless surfaces while absorbing up to 85% of ambient echo.",
      "Custom upholstered feature walls and floating baffle systems conceal advanced soundproofing layers behind premium Italian suede and brushed brass trims."
    ],
    htmlContent: `
      <p>Double-height living rooms with expansive glass expanses often suffer from unpleasant sound reflection. Traditional remedies—heavy curtains and thick carpets—frequently compromise clean modern aesthetics.</p>
      <h2>Micro-Perforated Acoustic Panels</h2>
      <p>Our architectural team utilizes micro-perforated wood ceiling panels and sound-absorbent acoustic plaster that preserves smooth visually seamless surfaces while absorbing up to 85% of ambient echo.</p>
      <p>Custom upholstered feature walls and floating baffle systems conceal advanced soundproofing layers behind premium Italian suede and brushed brass trims.</p>
    `,
    highlights: [
      "Micro-perforated wood soffits with NRC acoustic ratings above 0.85",
      "Concealed acoustic plaster systems with zero visible seams",
      "Vibration-dampened subflooring under heavy marble and hardwood tiles"
    ],
    category: "Interior Design",
    author: {
      name: "Rohan Kapoor",
      role: "Senior Interior Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "Sep 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1",
    tags: ["Acoustics", "Penthouse", "Interior Design"],
    views: 750,
    likes: 96
  },
  {
    id: "blog-4",
    slug: "smart-luxury-ai-home-automation",
    title: "Smart Luxury: AI Integration & Invisible Home Automation",
    subtitle: "The next generation of smart homes replaces visible touch panels with ambient AI response networks.",
    excerpt: "The modern luxury home automation paradigm has shifted from intrusive touchscreens to zero-touch ambient intelligence.",
    content: [
      "Visible wall-mounted touchscreens are fast becoming relics of the early smart-home era. The new benchmark for luxury automation is total invisibility.",
      "Integrated environmental sensors measure occupant presence, ambient daylight intensity, solar heat gain, and circadian rhythm cycles to automatically adjust motorized louvers, mood lighting, and HVAC systems.",
      "With voice and gesture interface nodes recessed seamlessly into millwork, home control feels entirely effortless."
    ],
    htmlContent: `
      <p>Visible wall-mounted touchscreens are fast becoming relics of the early smart-home era. The new benchmark for luxury automation is total invisibility.</p>
      <h2>Ambient Intelligence & Circadian Lighting</h2>
      <p>Integrated environmental sensors measure occupant presence, ambient daylight intensity, solar heat gain, and circadian rhythm cycles to automatically adjust motorized louvers, mood lighting, and HVAC systems.</p>
      <p>With voice and gesture interface nodes recessed seamlessly into millwork, home control feels entirely effortless.</p>
    `,
    highlights: [
      "Circadian spectrum LED lighting systems synchronized to real-time sun angle",
      "Predictive HVAC climate zoning with sub-degree temperature precision",
      "Invisible acoustic speakers embedded directly behind drywall and plaster"
    ],
    category: "Tech & Urban",
    author: {
      name: "Kabir Mehta",
      role: "Smart Infrastructure Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    date: "Sep 05, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1 lg:col-span-2",
    tags: ["Smart Home", "AI Living", "Invisible Tech"],
    views: 1120,
    likes: 165
  },
  {
    id: "blog-5",
    slug: "sculptural-staircases-contemporary-mansions",
    title: "Sculptural Staircases: Focal Jewels of Contemporary Mansions",
    subtitle: "Engineering helical and floating steel stairs that elevate architectural storytelling.",
    excerpt: "A staircase is no longer just a structural transition; in luxury mansions, it serves as the centerpiece sculptural artwork of the home.",
    content: [
      "Helical, spiral, and floating cantilever staircases represent the pinnacle of architectural structural engineering.",
      "By combining concealed internal steel spines with glass balustrades and hand-carved solid oak treads, our architects craft staircases that appear to float effortlessly through vertical voids.",
      "Integrated micro-LED light channels under every tread illuminate structural contours at night, casting dynamic geometric shadows across raw travertine walls."
    ],
    highlights: [
      "Hidden cantilever steel anchors engineered into reinforced core walls",
      "Curved structural glass balustrades with zero visible metallic fasteners",
      "Precision-milled hardwood and stone treads with hand-rubbed oil finishes"
    ],
    category: "Luxury Living",
    author: {
      name: "Ananya Deshmukh",
      role: "Lead Concept Designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    date: "Aug 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1",
    tags: ["Sculptural", "Staircase", "Luxury Mansion"],
    views: 1340,
    likes: 210
  },
  {
    id: "blog-6",
    slug: "natural-stone-brushed-metal-palettes-2026",
    title: "Natural Stone & Brushed Metal: Material Palettes of 2026",
    subtitle: "Exploring tactile contrast between raw quartzite, textured travertines, and champagne gold accents.",
    excerpt: "Material selection dictates emotional resonance. Explore how tactile contrasts between stone and metallurgy create timeless sophistication.",
    content: [
      "The interior design landscape of 2026 is moving away from high-gloss lacquers toward organic, tactile surfaces that age gracefully with time.",
      "Fluted travertines, book-matched Patagonian quartzites, and aged liquid bronze metal panels bring rich tactile depth to executive suites and luxury residential living zones.",
      "We emphasize material authenticity—allowing natural veining, subtle patinas, and handcrafted textures to take center stage."
    ],
    highlights: [
      "Book-matched natural quartzite feature slabs with integrated backlighting",
      "Hand-brushed champagne gold and gunmetal PVD finishes",
      "Honed and fluted stone cladding for tactile sensory engagement"
    ],
    category: "Interior Design",
    author: {
      name: "Rohan Kapoor",
      role: "Senior Interior Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "Aug 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1",
    tags: ["Materials", "Marble & Stone", "Interior Trends"],
    views: 890,
    likes: 118
  },
  {
    id: "blog-7",
    slug: "net-zero-carbon-construction-future-estates",
    title: "Net-Zero Carbon Construction: Future of High-End Estates",
    subtitle: "How low-carbon concrete, mass timber, and solar roof systems achieve luxury without compromise.",
    excerpt: "Luxury and environmental responsibility are no longer mutually exclusive. Learn how net-zero engineering delivers extraordinary results.",
    content: [
      "Constructing net-zero luxury estates requires holistic material lifecycle planning from foundation layout to rooftop solar harvesting.",
      "By specifying geopolymer ultra-low carbon concrete and engineered cross-laminated mass timber (CLT), carbon footprints are cut dramatically during construction.",
      "Integrated rooftop solar solar-glass shingles combined with high-capacity battery storage allow our villas to operate off-grid continuously while supplying power back to regional grids."
    ],
    highlights: [
      "Geopolymer green concrete reducing embodied carbon emissions by 65%",
      "BIPV (Building Integrated Photovoltaics) seamless solar roof tiles",
      "Geothermal heat-exchange HVAC networks for year-round climate regulation"
    ],
    category: "Sustainable Design",
    author: {
      name: "Sophia Martinez",
      role: "Head of Sustainable Architecture",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    date: "Aug 14, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1",
    tags: ["Net-Zero", "Mass Timber", "Green Building"],
    views: 1050,
    likes: 154
  },
  {
    id: "blog-8",
    slug: "micro-climate-landscaping-private-courtyards",
    title: "Mastering Micro-Climate Landscaping for Private Courtyards",
    subtitle: "Designing enclosed courtyards with passive cooling breezes, shade canopies, and water features.",
    excerpt: "Enclosed courtyard design provides privacy, acoustic insulation, and natural micro-climate control in modern luxury residences.",
    content: [
      "Courtyards are the serene heart of modern residential architecture. When designed with strategic orientation, they generate natural stack-effect ventilation that draws cool air through living areas.",
      "Perforated stone screens (jaalis) and water reflecting pools cool incoming summer breezes through evaporative cooling.",
      "Our landscaping architects blend sculptural olive trees and water channels to foster private sanctuaries within urban domains."
    ],
    highlights: [
      "Stack-effect thermal chimneys for natural ventilation",
      "Evaporative cooling water basins engineered into main courtyard entryways",
      "Perforated stone screens optimizing light diffraction and air movement"
    ],
    category: "Architecture",
    author: {
      name: "Ar. Vikramaditya Sen",
      role: "Principal Design Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "Aug 02, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    bentoSpan: "col-span-1 lg:col-span-2",
    tags: ["Courtyard", "Micro-climate", "Passive Cooling"],
    views: 1210,
    likes: 177
  }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return MOCK_BLOGS.find(b => b.slug === slug || b.id === slug);
}
