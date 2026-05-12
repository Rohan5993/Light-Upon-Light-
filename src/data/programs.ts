export interface Program {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  date: string;
  location: string;
  tag: string;
  img: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "community-health-awareness-fair",
    title: "Community Health Awareness Fair",
    desc: "A public event offering free health screenings and educational resources to encourage healthier lifestyles.",
    longDesc: "The Community Health Awareness Fair is our flagship wellness program. We partner with local healthcare providers to offer free blood pressure checks, BMI screenings, and nutritional counseling. Our mission is to make health information accessible to everyone, regardless of their background or economic status.",
    date: "May 08, 2030",
    location: "Montreal",
    tag: "Wellness",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hope-for-education-drive",
    title: "Hope for Education Drive",
    desc: "A fundraising and donation event providing school supplies and scholarships for underprivileged children.",
    longDesc: "Education is the foundation of a brighter future. Through the Hope for Education Drive, we collect essential school supplies, laptops, and funds for scholarships. Since our inception, we have helped over 500 students stay in school by easing the financial burden on their families.",
    date: "May 12, 2030",
    location: "Toronto",
    tag: "Youth Support",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "share-a-meal-food-drive",
    title: "Share a Meal Food Drive",
    desc: "A community food drive collecting non-perishable items and groceries for families facing food insecurity.",
    longDesc: "No one should go hungry. Our Share a Meal initiative organizes monthly food drives and operates a community kitchen. We focus on providing nutritious, high-quality ingredients and meals to those who need them most in our local communities.",
    date: "May 14, 2030",
    location: "Ottawa",
    tag: "Charity",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "digital-inclusion-workshop",
    title: "Digital Inclusion Workshop",
    desc: "Empowering seniors and low-income families with essential digital skills and hardware access.",
    longDesc: "In today's digital age, connectivity is a right, not a privilege. Our workshops teach seniors how to use modern technology to stay connected with their families, and provide students with the hardware they need to complete their studies.",
    date: "June 02, 2030",
    location: "Vancouver",
    tag: "Technology",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "senior-care-outreach",
    title: "Senior Care Outreach",
    desc: "Providing companionship and essential care services to elderly community members living alone.",
    longDesc: "Loneliness is a significant issue for our aging population. Our Senior Care Outreach program connects volunteers with seniors for regular visits, help with light chores, and most importantly, meaningful companionship.",
    date: "June 15, 2030",
    location: "Calgary",
    tag: "Social Care",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "clean-water-initiative",
    title: "Clean Water Initiative",
    desc: "Developing sustainable water filtration systems for remote communities facing water scarcity.",
    longDesc: "Access to clean water is a fundamental human rights. We work with engineers and local leaders to implement sustainable, easy-to-maintain water filtration systems in regions where clean water is scarce or contaminated.",
    date: "July 10, 2030",
    location: "Global",
    tag: "Sustainability",
    img: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800"
  }
];
