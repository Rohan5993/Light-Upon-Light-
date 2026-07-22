import { siteImages } from "../assets/siteImages";

export interface ProgramCta {
  label: string;
  to: string;
  external?: boolean;
}

export interface Program {
  id: string;
  title: string;
  headline: string;
  desc: string;
  paragraphs: string[];
  date: string;
  location: string;
  tag: string;
  img: string;
  gallery: string[];
  ctaPrimary: ProgramCta;
  ctaSecondary: ProgramCta;
}

export const PROGRAMS: Program[] = [
  {
    id: "enlighten",
    title: "Enlighten",
    headline: "A More Inclusive World Starts in the Classroom.",
    desc: "Most students grow up without ever learning about differently-abled people. Enlighten replaces uncertainty with understanding, helping the next generation build empathy, respect, and inclusion from an early age.",
    paragraphs: [
      "As a child, Light Upon Light's Founder & CEO, Ronahi Zebari, spent years hoping that one day someone would roll or walk through her classroom door and teach her classmates about differently-abled people. Every time the classroom door opened, she wondered if that day had finally come. She waited throughout elementary school, then middle school, believing someone would help her classmates understand people like her. But no one ever did. By the time she reached high school, that hope had quietly faded. Years later, Ronahi created Enlighten so today's students would receive the education she once wished existed. Today, she is the person rolling through those classroom doors that she so desperately needed when she was a little girl.",
      "Most students grow up without a single meaningful conversation about what it means to be differently-abled. Nobody teaches them the right language. Nobody helps them understand why someone uses a wheelchair or communicates differently. So they fill that gap with uncertainty, and uncertainty turns into distance. They are not trying to exclude anyone. They simply were never given the tools to include. Enlighten exists to change that before those patterns have a chance to take root.",
      "We bring Enlighten directly into schools. Enlighten is an in-school educational program that helps primary and secondary students develop empathy, inclusion, and awareness toward differently-abled individuals. Delivered through interactive, age-appropriate lessons on Canva and presented on classroom screens, students learn who differently-abled people are, why they are differently-abled, and the respectful terms to use when referring to differently-abled individuals. The lesson emphasizes the inner parts of us, our hearts and minds, and how we are often remembered for how we made someone feel rather than how we looked. It highlights the importance of kindness, understanding, empathy, and human connection.",
      "At the end of the lesson, students complete a simple one-page reflection worksheet that encourages them to think about what they learned and how they can help create a more inclusive community. They are then invited to interact with both electric and manual wheelchairs by touching, pushing, and sitting in them. This hands-on experience builds familiarity, reduces stigma, and fosters a more positive understanding of mobility aids and the people who use them. Before students leave the classroom, every student receives a small token of participation, such as a Light Upon Light sticker or a treat. They also take home a \"Dear Parent or Guardian\" letter. The letter explains what their child learned that day, our hope that the conversation extends beyond the classroom and continues at home, and provides parents and guardians with guidance on how to approach the topic with dignity and respect, rather than through pity and sympathy. It also shares more about our organization and its mission.",
      "The impact of one honest classroom conversation reaches further than most people realize. A student who learns to understand, respect, and include a differently-abled classmate today has the power to improve the lives of differently-abled people tomorrow. Those students become the coworkers who advocate, the employers who hire, the teachers who include, the healthcare professionals who provide equitable care, and the leaders who create communities where differently-abled people are valued, respected, and included. Every lesson has the potential to shape a future where differently-abled individuals experience greater dignity, opportunity, and belonging. Enlighten is how we help build that future, one classroom, one conversation, and one generation at a time.",
    ],
    date: "In-school sessions",
    location: "Greater Seattle Area",
    tag: "Education",
    img: siteImages.programEnlighten,
    gallery: [
      siteImages.programEnlighten2,
      siteImages.programEnlighten3,
    ],
    ctaPrimary: {
      label: "Bring Enlighten to Your School",
      to: "mailto:lightuponlight1408@gmail.com?subject=Bring%20Enlighten%20to%20Our%20School",
      external: true,
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
  {
    id: "big-light-little-light",
    title: "Big Light, Little Light",
    headline: "No One Guides Like Someone Who Has Lived It.",
    desc: "Many differently-abled individuals grow up without ever meeting someone who truly understands their journey. Big Light, Little Light connects younger differently-abled individuals (Little Lights) with more experienced mentors (Big Lights), creating the guidance, connection, and belonging that only lived experience can provide.",
    paragraphs: [
      "Our founder and CEO Ronahi did not meet another differently-abled person who truly understood her life until she was 21. Before that moment, she spent years explaining herself to people who cared but could not fully understand. When that connection finally happened, everything changed. Not because anything else in her life had shifted, but because for the first time she was not alone in it. Big Light, Little Light exists so that no differently-abled individual has to wait years for that feeling.",
      "Here is how it works. We carefully match Big Lights, older differently-abled individuals who serve as mentors, with Little Lights, younger differently-abled individuals. Each mentor and mentee pair stays connected through regular text messages and FaceTime calls while participating in our monthly program together. Everyone comes together for one virtual session and one in-person community session each month. Our virtual sessions are held on the second Monday of every month, while our in-person sessions take place on the last Monday afternoon of each month. In addition to our monthly sessions, we also organize group outings to the zoo, the beach, the movie theater, the mall, the grocery store, and other places throughout the community. These aren't formal meetings, they're opportunities to build real moments of connection, confidence, identity, and belonging over time.",
      "What makes this program unlike anything else is its foundation. It is not built on sympathy or clinical support. It is built on genuine shared experience. A Big Light does not have to search for the right words because they have lived the same reality. That kind of understanding cannot be trained or taught. It can only come from someone who has been there. And when a Little Light finds that person, something shifts in how they see themselves and what they believe is possible for their life.",
    ],
    date: "2nd & last Monday monthly",
    location: "Virtual + In Person",
    tag: "Mentorship",
    img: siteImages.programBigLightLittleLight,
    gallery: [
      siteImages.programBigLightLittleLight2,
      siteImages.programBigLightLittleLight3,
    ],
    ctaPrimary: {
      label: "Become a Mentor",
      to: "/volunteer",
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
  {
    id: "light-desserts",
    title: "Light Desserts",
    headline: "A Kitchen Built With Everyone in Mind.",
    desc: "Many differently-abled individuals are denied the opportunity to experience the kitchen, not because they lack the ability, but because of the assumptions others make. Light Desserts creates a fully accessible space where everyone has the opportunity to develop independence, strengthen practical life skills, and experience one of life's most ordinary yet meaningful human experiences.",
    paragraphs: [
      "As a child, Light Upon Light's Founder & CEO, Ronahi Zebari, was rarely allowed in the kitchen. Because of her disability, the people around her believed it was too dangerous. They assumed she simply could not bake or cook safely, and often felt it was unnecessary for her to try when someone else could do it for her instead. Those assumptions took away more than the opportunity to bake, they took away her independence and the natural human experience of being in the kitchen. While others gathered around the counter with their families, learned recipes passed down through generations, and experienced the joy of creating something with their own hands, Ronahi was left watching from the sidelines. They turned one of life's simplest, most ordinary experiences into something she was made to believe was never meant for her.",
      "As she grew older, Ronahi decided to challenge those assumptions for herself. She stepped into the kitchen, adapted where necessary, and began baking independently. What she discovered changed everything. She had always been capable. The barrier had never been her different ability, it had been the assumptions others made about what she could or could not do. Her experience is one shared by countless differently-abled individuals who are discouraged from learning everyday life skills, not because they lack the ability, but because society too often mistakes disability for inability. Others face an additional barrier: kitchens that are not designed to be accessible, making an everyday activity unnecessarily difficult or completely out of reach.",
      "Determined that no one else should be denied that experience, Ronahi made it her mission to ensure that differently-abled individuals have the opportunity to be in the kitchen and experience the joy of baking for themselves. Light Desserts uses a fully accessible kitchen to create a welcoming, inclusive space where participants can build confidence, develop practical life skills, and experience the independence that so many have been denied. Adults ages 18 and older meet on the first Thursday of every month from 1:00 PM to 4:00 PM, while youth ages 8–17 meet on the third Thursday of every month from 5:30 PM to 7:00 PM. Every participant is hands-on from the moment they arrive, preparing ingredients, measuring, mixing, baking, decorating, and completing recipes that are thoughtfully designed to be approachable and adaptable to a wide range of abilities. Throughout each session, Light Upon Light team members work alongside participants, providing hands-on assistance whenever it is needed. Whether that means helping measure ingredients, stabilize mixing bowls, reach ingredients or equipment, pour, stir, or assist with other baking tasks, our team is there to ensure that every participant can actively take part in the experience while fostering as much independence as possible. No one watches from the sidelines because everyone belongs in the kitchen. Participants leave with more than a dessert, they leave with greater confidence, a stronger sense of independence, and the realization that they are capable. Most importantly, they leave having reclaimed the simple, everyday human experience of being in the kitchen, an experience that should never have been denied to them. Because every person deserves the opportunity to create, to learn, and to belong in the kitchen.",
    ],
    date: "1st & 3rd Thursday monthly",
    location: "Accessible Kitchen",
    tag: "Life Skills",
    img: siteImages.programLightDesserts,
    gallery: [
      siteImages.programLightDesserts2,
      siteImages.programLightDesserts3,
    ],
    ctaPrimary: {
      label: "Volunteer With Us",
      to: "/volunteer",
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
  {
    id: "signs-of-our-light",
    title: "Signs of Our Light",
    headline: "Real Accessibility Is Lived. Not Checked Off a List.",
    desc: "Many spaces are considered accessible without ever being evaluated by the people who rely on accessibility every day. Signs of Our Light empowers differently-abled individuals to identify real-world barriers and help create spaces that are truly accessible for everyone.",
    paragraphs: [
      "Most spaces that call themselves accessible were assessed by people who have never needed accessibility. A checklist was completed, a ramp was installed, a box was ticked, and the space was cleared. But when a differently-abled person actually tries to use that space, they find the ramp too steep to navigate, the accessible entrance around the back and far from everything else, the bathroom technically compliant but practically unusable. Compliance and genuine accessibility are two very different things. Signs of Our Light exists to bridge that gap.",
      "Here is how it works. Our team visits public spaces, businesses, schools, and community organizations alongside differently-abled participants who navigate the space in real time. They move through entrances, pathways, restrooms, seating areas, and services and identify the barriers that no paper assessment would ever catch. We evaluate physical accessibility, navigation, facility layout, the usability of spaces and amenities, and the overall experience of moving through an environment as a differently-abled individual. Every assessment is conducted through the lens of lived experience, helping businesses and organizations identify barriers that may otherwise go unnoticed. Following each assessment, businesses and organizations receive a comprehensive report with clear, practical, and actionable recommendations to improve accessibility. For those seeking additional support, Light Upon Light can partner with them to implement accessibility improvements, helping transform recommendations into real, meaningful changes that create more welcoming and inclusive spaces for everyone.",
      "What makes this program powerful is who is leading it. Differently-abled participants are not just contributors here. They are the experts. Their lived experience is the most accurate measurement tool available, and the changes that follow their assessments are real. Signs of Our Light turns accessibility from a legal requirement into a lived reality. And it gives differently-abled individuals the powerful experience of being the ones who drive change rather than the ones waiting for it.",
    ],
    date: "By appointment",
    location: "Community Spaces",
    tag: "Accessibility",
    img: siteImages.programSignsOfOurLight,
    gallery: [
      siteImages.programSignsOfOurLight2,
      siteImages.programSignsOfOurLight3,
    ],
    ctaPrimary: {
      label: "Partner With Us",
      to: "mailto:lightuponlight1408@gmail.com?subject=Partner%20With%20Signs%20of%20Our%20Light",
      external: true,
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
  {
    id: "sending-light-abroad",
    title: "Sending Light Abroad",
    headline: "When Someone Loses Access to Their Legs, They Lose Access to the World.",
    desc: "For many differently-abled individuals, a mobility aid isn't just equipment, it's their legs. Sending Light Abroad restores freedom, independence, and access to everyday life by delivering refurbished mobility aids to underserved communities around the world.",
    paragraphs: [
      "In many parts of the world, even a basic wheelchair is completely out of reach. Without one, a differently-abled individual cannot get to school, cannot get to work, and in many cases cannot even leave their home. They watch birthdays, weddings, classrooms, careers, and everyday life continue without them, not because they are incapable, but because they do not have the one thing that makes all of it possible. A wheelchair is not a luxury. It is not a convenience. It is a vital necessity. For many, it is their legs. Without it, their world can become confined to four walls while life carries on just beyond their reach. This is not about ability or ambition. It is about access and necessity, two things that should never depend on where a person is born.",
      "Sending Light Abroad works through a clear and careful process. We collect donated mobility aids, including wheelchairs, walkers, crutches, and canes, refurbish each one to make sure it is safe and fully functional, and deliver them to differently-abled individuals in underserved communities worldwide through a trusted network of local nonprofit partners. These partners know their communities. They identify the individuals with the greatest need and ensure every item reaches the right person with the right support around it. When resources allow, we also help cover hospital and medical expenses and connect recipients with local care resources.",
      "A mobility aid is far more than a piece of equipment. For many differently-abled individuals, it is their legs. It is their freedom. It is their independence. It is the only way they can leave their home, attend school, go to work, receive medical care, visit loved ones, and participate in the everyday moments of life that so many people take for granted. Without it, many remain confined to a single place, watching the world continue without them. What some people see as \"just a wheelchair,\" \"just a walker,\" or \"just a pair of crutches\" is, for someone else, a vital necessity. It is the difference between isolation and connection, dependence and independence, surviving and truly living. Those are not small things. They are everything. We believe accessibility should never be determined by geography. Every differently-abled individual, no matter where they live, deserves the opportunity to move through the world freely and on their own terms.",
    ],
    date: "Ongoing",
    location: "Global",
    tag: "Mobility Aid",
    img: siteImages.programSendingLightAbroad,
    gallery: [
      siteImages.programSendingLightAbroad2,
      siteImages.programSendingLightAbroad3,
    ],
    ctaPrimary: {
      label: "Donate a Mobility Aid",
      to: "mailto:lightuponlight1408@gmail.com?subject=Donate%20a%20Mobility%20Aid",
      external: true,
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
  {
    id: "meet-our-light",
    title: "Meet Our Light",
    headline: "More Than a Donation. A Personal Connection.",
    desc: "Giving is most meaningful when it creates human connection. Meet Our Light brings supporters face-to-face with the people behind our mission, transforming every donation into something deeply personal.",
    paragraphs: [
      "Many people genuinely want to give back, but life often gets in the way. Busy schedules, banking preferences, or simply finding the time can make donating more difficult than it should be. That's why Light Upon Light created our personalized in-person donation pickup service. We make giving simple by coming directly to you, allowing you to support our mission without having to take extra time out of your day. Whether you choose to give online or through an in-person pickup, every donation helps create meaningful change in the lives of differently-abled individuals.",
      "What makes this experience truly special is the personal connection it creates. Whenever possible, one of our differently-abled participants joins a trained, background-checked Light Upon Light team member during the pickup. Instead of simply handing your donation to a stranger, you'll have the opportunity to meet someone whose life is being impacted by the work you are supporting. It's a chance to share a conversation, hear part of their story, and see firsthand the people behind our mission. Every donation is securely logged, tracked, and stewarded with complete transparency, and you'll receive a donation receipt along with updates showing the impact of your generosity.",
      "Scheduling a pickup is quick and convenient. Simply choose a day and time that works best for you, and a Light Upon Light team member and, when available, one of our differently-abled participants will come directly to you. More than simply collecting a donation, we're there to personally thank you for believing in our mission. Your generosity is more than a financial gift, it is an investment in greater advocacy, accessibility, education, and equality for differently-abled individuals. Because the most meaningful generosity isn't just about giving. It's about human connection.",
    ],
    date: "By appointment",
    location: "Greater Seattle Area",
    tag: "Donor Experience",
    img: siteImages.programMeetOurLight,
    gallery: [
      siteImages.programMeetOurLight2,
      siteImages.programMeetOurLight3,
    ],
    ctaPrimary: {
      label: "Schedule a Pickup",
      to: "mailto:lightuponlight1408@gmail.com?subject=Schedule%20a%20Donation%20Pickup",
      external: true,
    },
    ctaSecondary: {
      label: "Donate to This Program",
      to: "/donate",
    },
  },
];
