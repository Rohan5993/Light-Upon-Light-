export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  contentSeed: string;
  isFeatured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "lasting-impact",
    title: "Why Community-Led Charity Creates Lasting Impact",
    excerpt: "Discover how community-driven initiatives foster deeper engagement, build lasting trust, and create sustainable impact that continues to benefit...",
    date: "MARCH 8, 2030",
    category: "YOUTH SUPPORT",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    contentSeed: "Community-led change lasts because people are not treated like recipients. They become co-builders, decision makers, and long-term stewards of the work.",
    isFeatured: true
  },
  {
    id: "power-of-charity",
    title: "The Power of Community-Led Charity",
    excerpt: "How community-driven initiatives build trust, ownership, and long-term resilience in neighborhoods that need support most.",
    date: "MARCH 1, 2030",
    category: "COMMUNITY IMPACT",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400",
    contentSeed: "When residents shape programs, charity moves from short-term aid to local capacity building that keeps helping people long after an event ends."
  },
  {
    id: "clean-up-event",
    title: "Inside a Charity Clean-Up Event",
    excerpt: "A behind-the-scenes look at the teamwork, logistics, and joy that turn one clean-up day into lasting community pride.",
    date: "FEBRUARY 8, 2030",
    category: "ENVIRONMENT",
    image: "https://images.unsplash.com/photo-1559027615-cd26714e91cf?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Clean-up events are not just about trash collection. They are public moments of shared responsibility, neighborhood dignity, and visible progress."
  },
  {
    id: "volunteering-transforms",
    title: "How Volunteering Transforms Lives",
    excerpt: "Discover how giving your time not only helps others but reshapes confidence, empathy, and purpose for volunteers too.",
    date: "FEBRUARY 4, 2030",
    category: "VOLUNTEERS",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Volunteering changes two stories at once: the story of the person receiving support and the story of the person offering their time."
  },
  {
    id: "youth-mentorship-results",
    title: "Youth Mentorship That Builds Confidence",
    excerpt: "What happens when young people are matched with mentors who listen first, guide consistently, and model possibility.",
    date: "JANUARY 25, 2030",
    category: "MENTORSHIP",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Mentorship works best when it creates trust, routine, and practical steps that young people can act on immediately."
  },
  {
    id: "food-drive-lessons",
    title: "What We Learned From Our Latest Food Drive",
    excerpt: "From sourcing to delivery, key lessons that helped us serve more families with better coordination and care.",
    date: "JANUARY 17, 2030",
    category: "FOOD SECURITY",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Food drives succeed when logistics and dignity are planned together so families receive support that is reliable, respectful, and nutritious."
  },
  {
    id: "donor-transparency-guide",
    title: "Why Donor Transparency Strengthens Trust",
    excerpt: "Clear reporting is not just admin work. It is how communities and supporters stay aligned around real impact.",
    date: "JANUARY 6, 2030",
    category: "TRANSPARENCY",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Transparency creates confidence because donors can see what changed, how resources were used, and what remains to be done."
  },
  {
    id: "digital-inclusion-workshop",
    title: "Digital Inclusion as a Pathway to Opportunity",
    excerpt: "Our workshop model helps participants move from basic access to practical confidence in school, work, and daily life.",
    date: "DECEMBER 28, 2029",
    category: "DIGITAL ACCESS",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Digital inclusion means more than devices. It means skills, support, and confidence to use technology for meaningful progress."
  },
  {
    id: "women-leadership-circle",
    title: "Inside the Women Leadership Circle",
    excerpt: "How peer support, practical coaching, and shared accountability help women lead with clarity and courage.",
    date: "DECEMBER 18, 2029",
    category: "LEADERSHIP",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Leadership circles create safe spaces for women to practice decision making, communication, and strategic confidence."
  },
  {
    id: "measuring-what-matters",
    title: "Measuring What Matters in Social Impact",
    excerpt: "Beyond vanity metrics: how we track outcomes that reflect real change for people and communities.",
    date: "DECEMBER 10, 2029",
    category: "IMPACT",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
    contentSeed: "Good measurement connects effort to outcomes so teams can improve quickly and communicate impact with honesty."
  }
];
