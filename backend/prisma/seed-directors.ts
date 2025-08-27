import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const directorsSeedData = {
  chairman: {
    name: "Hon. Pavithra Wanniarachchi",
    title: "Chairman / Director General",
    description: "Visionary leader with over 25 years of experience in youth development and public administration. Former Cabinet Minister who has been instrumental in transforming youth services across Sri Lanka.",
    email: "chairman@nysc.lk",
    phone: "+94 11 234 5678",
    linkedin: "#",
    tenure: "2021 - Present",
    qualifications: [
      "Master of Public Administration - University of Colombo",
      "Bachelor of Arts - University of Peradeniya",
      "Diploma in Youth Development - International Youth Foundation"
    ],
    achievements: [
      "Established 50+ new youth centers across Sri Lanka",
      "Launched National Youth Skills Development Program",
      "Secured international partnerships with 10+ countries",
      "Increased youth employment by 35% through vocational programs"
    ],
    vision: "To create a vibrant ecosystem where every young person in Sri Lanka has access to opportunities for personal growth, skill development, and meaningful contribution to society.",
    keyInitiatives: [
      {
        title: "Digital Transformation",
        description: "Modernizing NYSC services through digital platforms and online training programs"
      },
      {
        title: "International Cooperation",
        description: "Building partnerships with global youth organizations for knowledge exchange"
      },
      {
        title: "Employment Generation",
        description: "Creating pathways from training to employment through industry partnerships"
      },
      {
        title: "Excellence Recognition",
        description: "Establishing comprehensive youth award system to celebrate achievements"
      }
    ],
    order: 1
  },
  boardMembers: [
    {
      name: "Hon. Pavithra Wanniarachchi",
      position: "Chairman",
      description: "Former Cabinet Minister with extensive experience in youth development and public administration.",
      email: "chairman@nysc.lk",
      phone: "+94 11 234 5678",
      linkedin: "#",
      badge: "Chairman",
      order: 1
    },
    {
      name: "Dr. Siripala Amarasinghe",
      position: "Board Member - Education Specialist",
      description: "Distinguished educator with 30 years of experience in higher education and youth development programs.",
      email: "siripala.a@nysc.lk",
      phone: "+94 11 234 5679",
      linkedin: "#",
      badge: "Member",
      order: 2
    },
    {
      name: "Mrs. Kumari Jayawardena",
      position: "Board Member - Finance & Administration",
      description: "Chartered accountant with expertise in financial management and organizational development.",
      email: "kumari.j@nysc.lk",
      phone: "+94 11 234 5680",
      linkedin: "#",
      badge: "Secretary",
      order: 3
    }
  ],
  directors: [
    {
      name: "Dr. Manjula Perera",
      position: "Director - Programs & Development",
      department: "Programs & Development",
      description: "Strategic leader overseeing all youth development programs, training initiatives, and capacity building projects across the nation.",
      email: "manjula.p@nysc.lk",
      phone: "+94 11 234 5690",
      linkedin: "#",
      specialization: "Youth Development",
      experience: "18 years",
      achievements: [
        "Developed National Youth Skills Framework",
        "Launched 25+ vocational training programs",
        "Established international partnerships"
      ],
      order: 1
    },
    {
      name: "Mr. Saman Rathnayake",
      position: "Director - Sports & Recreation",
      department: "Sports & Recreation",
      description: "Sports development expert focusing on youth sports programs, recreational activities, and competitive sports training.",
      email: "saman.r@nysc.lk",
      phone: "+94 11 234 5691",
      linkedin: "#",
      specialization: "Sports Development",
      experience: "15 years",
      achievements: [
        "Launched inter-provincial youth sports competitions",
        "Established 50+ sports training centers",
        "Developed youth coaching certification programs"
      ],
      order: 2
    }
  ],
  deputyDirectors: [
    {
      name: "Mrs. Chamari Jayasekara",
      position: "Deputy Director - Programs",
      department: "Programs & Development",
      description: "Program management specialist ensuring effective implementation of youth development initiatives across all provinces.",
      email: "chamari.j@nysc.lk",
      phone: "+94 11 234 5700",
      specialization: "Program Management",
      provinces: ["Western", "Central", "Southern"],
      order: 1
    },
    {
      name: "Mr. Roshan Fernando",
      position: "Deputy Director - Sports",
      department: "Sports & Recreation",
      description: "Sports administration expert overseeing regional sports programs and youth athlete development initiatives.",
      email: "roshan.f@nysc.lk",
      phone: "+94 11 234 5701",
      specialization: "Sports Administration",
      provinces: ["Northern", "Eastern", "North Central"],
      order: 2
    }
  ],
  assistantDirectors: [
    {
      name: "Ms. Ruvini Jayasinghe",
      position: "Assistant Director - Youth Programs",
      department: "Programs & Development",
      region: "Western Province",
      specialization: "Program Coordination",
      email: "ruvini.j@nysc.lk",
      phone: "+94 11 234 5720",
      order: 1
    },
    {
      name: "Mr. Thilina Wickramasinghe",
      position: "Assistant Director - Sports Training",
      department: "Sports & Recreation",
      region: "Central Province",
      specialization: "Sports Training",
      email: "thilina.w@nysc.lk",
      phone: "+94 11 234 5721",
      order: 2
    }
  ],
  provincialDirectors: [
    {
      name: "Mr. Ajith Ratnayake",
      position: "Provincial Director - Western Province",
      province: "Western",
      headquarters: "Colombo",
      districts: ["Colombo", "Gampaha", "Kalutara"],
      population: "5.8M",
      centers: 45,
      description: "Leading youth development initiatives in the most populous province with focus on urban challenges and opportunities.",
      email: "ajith.r@nysc.lk",
      phone: "+94 11 234 5750",
      achievements: [
        "Established 15 new youth centers",
        "90% employment rate for vocational graduates",
        "Launched digital skills programs"
      ],
      order: 1
    },
    {
      name: "Mrs. Nilanthi Silva",
      position: "Provincial Director - Central Province",
      province: "Central",
      headquarters: "Kandy",
      districts: ["Kandy", "Matale", "Nuwara Eliya"],
      population: "2.6M",
      centers: 28,
      description: "Developing youth programs tailored for the hill country region with emphasis on sustainable development and eco-tourism.",
      email: "nilanthi.s@nysc.lk",
      phone: "+94 81 234 5751",
      achievements: [
        "Launched eco-tourism youth programs",
        "Established hill country skill development centers",
        "Created youth entrepreneurship incubators"
      ],
      order: 2
    }
  ],
  provincialAssistants: [
    {
      name: "Ms. Rashika Perera",
      position: "Provincial Assistant Director",
      province: "Western",
      district: "Colombo",
      headquarters: "Colombo",
      population: "2.3M",
      centers: 18,
      email: "rashika.p@nysc.lk",
      phone: "+94 11 234 5800",
      specialization: "Urban Programs",
      order: 1
    },
    {
      name: "Mr. Kasun Bandara",
      position: "Provincial Assistant Director",
      province: "Central",
      district: "Kandy",
      headquarters: "Kandy",
      population: "1.4M",
      centers: 12,
      email: "kasun.b@nysc.lk",
      phone: "+94 81 234 5801",
      specialization: "Rural Development",
      order: 2
    }
  ]
};

async function seedDirectors() {
  try {
    console.log('🌱 Starting directors seed...');

    // Clear existing director data
    console.log('🗑️ Clearing existing director data...');
    await prisma.provincialAssistant.deleteMany();
    await prisma.provincialDirector.deleteMany();
    await prisma.assistantDirector.deleteMany();
    await prisma.deputyDirector.deleteMany();
    await prisma.director.deleteMany();
    await prisma.boardMember.deleteMany();
    await prisma.chairman.deleteMany();

    // Seed Chairman
    console.log('👑 Seeding Chairman...');
    await prisma.chairman.create({
      data: directorsSeedData.chairman
    });

    // Seed Board Members
    console.log('🏛️ Seeding Board Members...');
    for (const member of directorsSeedData.boardMembers) {
      await prisma.boardMember.create({
        data: member
      });
    }

    // Seed Directors
    console.log('👨‍💼 Seeding Directors...');
    for (const director of directorsSeedData.directors) {
      await prisma.director.create({
        data: director
      });
    }

    // Seed Deputy Directors
    console.log('👩‍💼 Seeding Deputy Directors...');
    for (const deputy of directorsSeedData.deputyDirectors) {
      await prisma.deputyDirector.create({
        data: deputy
      });
    }

    // Seed Assistant Directors
    console.log('🤝 Seeding Assistant Directors...');
    for (const assistant of directorsSeedData.assistantDirectors) {
      await prisma.assistantDirector.create({
        data: assistant
      });
    }

    // Seed Provincial Directors
    console.log('🏞️ Seeding Provincial Directors...');
    for (const provincial of directorsSeedData.provincialDirectors) {
      await prisma.provincialDirector.create({
        data: provincial
      });
    }

    // Seed Provincial Assistants
    console.log('🏘️ Seeding Provincial Assistants...');
    for (const assistant of directorsSeedData.provincialAssistants) {
      await prisma.provincialAssistant.create({
        data: assistant
      });
    }

    console.log('✅ Directors seed completed successfully!');
    
    // Display summary
    const counts = await Promise.all([
      prisma.chairman.count(),
      prisma.boardMember.count(),
      prisma.director.count(),
      prisma.deputyDirector.count(),
      prisma.assistantDirector.count(),
      prisma.provincialDirector.count(),
      prisma.provincialAssistant.count()
    ]);

    console.log('\n📊 Directors Database Summary:');
    console.log(`👑 Chairman: ${counts[0]}`);
    console.log(`🏛️ Board Members: ${counts[1]}`);
    console.log(`👨‍💼 Directors: ${counts[2]}`);
    console.log(`👩‍💼 Deputy Directors: ${counts[3]}`);
    console.log(`🤝 Assistant Directors: ${counts[4]}`);
    console.log(`🏞️ Provincial Directors: ${counts[5]}`);
    console.log(`🏘️ Provincial Assistants: ${counts[6]}`);
    console.log(`📈 Total Leadership: ${counts.reduce((a, b) => a + b, 0)}`);

  } catch (error) {
    console.error('❌ Error seeding directors:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDirectors()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDirectors };