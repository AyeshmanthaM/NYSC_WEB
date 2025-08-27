import { Request, Response } from 'express';
import { directorsService } from '@/services/directors.service';
import { asyncHandler } from '@/middleware/error.middleware';

// Get Chairman Information
export const getChairman = asyncHandler(async (req: Request, res: Response) => {
  const chairman = await directorsService.getChairman(true);

  if (!chairman) {
    res.status(404).json({
      success: false,
      error: 'Chairman information not found',
      message: 'Chairman information not found'
    });
    return;
  }

  // Format response according to API spec
  const formattedChairman = {
    name: chairman.name,
    title: chairman.title,
    description: chairman.description,
    image: chairman.image || '/images/board/chairman.jpg',
    contact: {
      email: chairman.email,
      phone: chairman.phone,
      linkedin: chairman.linkedin || '#'
    },
    tenure: chairman.tenure,
    qualifications: chairman.qualifications || [],
    achievements: chairman.achievements || [],
    vision: chairman.vision,
    keyInitiatives: chairman.keyInitiatives || []
  };

  res.json({
    success: true,
    data: formattedChairman
  });
});

// Get Board Members
export const getBoardMembers = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getBoardMembers(undefined, true);

  const formattedMembers = result.members.map((member: any, index: number) => ({
    id: index + 1,
    name: member.name,
    position: member.position,
    description: member.description,
    image: member.image || `/images/board/member${index + 1}.jpg`,
    contact: {
      email: member.email,
      phone: member.phone,
      linkedin: member.linkedin || '#'
    },
    badge: member.badge || 'Member'
  }));

  res.json({
    success: true,
    data: {
      boardMembers: formattedMembers,
      governance: {
        monthlyMeetings: "Regular board meetings held on the first Tuesday of each month",
        strategicPlanning: "Annual strategic review and five-year development planning",
        publicEngagement: "Quarterly stakeholder meetings and community consultations"
      }
    }
  });
});

// Get Directors
export const getDirectors = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getDirectors(undefined, true);

  const formattedDirectors = result.directors.map((director: any, index: number) => ({
    id: index + 1,
    name: director.name,
    position: director.position,
    department: director.department,
    description: director.description,
    image: director.image || `/images/directors/director${index + 1}.jpg`,
    contact: {
      email: director.email,
      phone: director.phone,
      linkedin: director.linkedin || '#'
    },
    specialization: director.specialization,
    experience: director.experience,
    achievements: director.achievements || []
  }));

  // Group by department for stats
  const departmentStats = formattedDirectors.reduce((acc: any[], director: any) => {
    const existing = acc.find(d => d.department === director.department);
    if (existing) {
      existing.programs += 7;
    } else {
      acc.push({
        department: director.department,
        programs: 35,
        beneficiaries: "50,000+"
      });
    }
    return acc;
  }, []);

  res.json({
    success: true,
    data: {
      directors: formattedDirectors,
      departmentStats,
      leadership: {
        philosophy: {
          strategicVision: "Long-term planning with clear objectives and measurable outcomes for youth development",
          excellenceCommitment: "Pursuing highest standards in all programs and services delivered to Sri Lankan youth",
          nationalReach: "Ensuring equitable access to opportunities across all provinces and communities"
        }
      }
    }
  });
});

// Get Deputy Directors
export const getDeputyDirectors = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getDeputyDirectors(undefined, true);

  const formattedDeputyDirectors = result.deputyDirectors.map((deputy: any, index: number) => ({
    id: index + 1,
    name: deputy.name,
    position: deputy.position,
    department: deputy.department,
    description: deputy.description,
    contact: {
      email: deputy.email,
      phone: deputy.phone
    },
    specialization: deputy.specialization,
    provinces: deputy.provinces || []
  }));

  // Group deputies by department function
  const departmentGroups = [
    {
      title: "Program Delivery",
      count: 4,
      departments: ["Programs", "Sports", "Cultural", "Training"]
    },
    {
      title: "Support Services",
      count: 4,
      departments: ["Administration", "Finance", "IT", "Human Resources"]
    },
    {
      title: "Strategic Functions",
      count: 4,
      departments: ["International", "Research", "Public Relations", "Quality"]
    }
  ];

  res.json({
    success: true,
    data: {
      deputyDirectors: formattedDeputyDirectors,
      departmentGroups,
      organizationStats: {
        totalDeputies: result.total,
        departments: 10,
        provincesCovered: 9,
        combinedExperience: "180+"
      }
    }
  });
});

// Get Assistant Directors
export const getAssistantDirectors = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getAssistantDirectors(undefined, true);

  const formattedAssistants = result.assistantDirectors.map((assistant: any, index: number) => ({
    id: index + 1,
    name: assistant.name,
    position: assistant.position,
    department: assistant.department,
    region: assistant.region || "Western Province",
    specialization: assistant.specialization,
    contact: {
      email: assistant.email,
      phone: assistant.phone
    }
  }));

  // Group by department
  const departmentGroups = formattedAssistants.reduce((acc: any, assistant: any) => {
    if (!acc[assistant.department]) {
      acc[assistant.department] = [];
    }
    acc[assistant.department].push(assistant);
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      assistantDirectors: formattedAssistants,
      departmentGroups,
      operationalStats: {
        totalAssistants: result.total,
        departments: 10,
        regionalCoverage: 9,
        dailyOperations: "100+"
      },
      framework: {
        dailyOperations: "Managing day-to-day activities and ensuring smooth program delivery",
        qualityDelivery: "Ensuring high standards in all services provided to youth participants",
        continuousImprovement: "Implementing feedback and innovation for enhanced program effectiveness",
        teamCoordination: "Leading teams and coordinating with other departments for integrated service delivery"
      }
    }
  });
});

// Get Provincial Directors
export const getProvincialDirectors = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getProvincialDirectors(undefined, true);

  const formattedProvincialDirectors = result.provincialDirectors.map((director: any, index: number) => ({
    id: index + 1,
    name: director.name,
    position: director.position,
    province: director.province,
    headquarters: director.headquarters,
    districts: director.districts || [],
    population: director.population,
    centers: director.centers,
    description: director.description,
    contact: {
      email: director.email,
      phone: director.phone
    },
    achievements: director.achievements || []
  }));

  res.json({
    success: true,
    data: {
      provincialDirectors: formattedProvincialDirectors,
      provinceStats: {
        provincialDirectors: result.total,
        districtsCovered: 25,
        youthCenters: "240+",
        youthServed: "500K+"
      },
      framework: {
        regionalAdaptation: "Tailoring programs to meet specific regional needs and cultural contexts",
        communityEngagement: "Building strong partnerships with local communities and stakeholders",
        performanceExcellence: "Achieving consistent results through effective management and innovation",
        impactMeasurement: "Monitoring and evaluating program effectiveness for continuous improvement"
      }
    }
  });
});

// Get Provincial Assistants
export const getProvincialAssistants = asyncHandler(async (req: Request, res: Response) => {
  const result = await directorsService.getProvincialAssistants(undefined, true);

  const formattedAssistants = result.provincialAssistants.map((assistant: any, index: number) => ({
    id: index + 1,
    name: assistant.name,
    position: assistant.position,
    province: assistant.province,
    district: assistant.district,
    headquarters: assistant.headquarters,
    population: assistant.population,
    centers: assistant.centers,
    contact: {
      email: assistant.email,
      phone: assistant.phone
    },
    specialization: assistant.specialization
  }));

  // Group by province
  const provinceGroups = formattedAssistants.reduce((acc: any, assistant: any) => {
    if (!acc[assistant.province]) {
      acc[assistant.province] = [];
    }
    acc[assistant.province].push(assistant);
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      provincialAssistants: formattedAssistants,
      provinceGroups,
      districtStats: {
        districtDirectors: result.total,
        allDistricts: 25,
        serviceCenters: "240+",
        directBeneficiaries: "250K+"
      },
      operationsFramework: {
        localPresence: "Direct community engagement through district-level leadership and local partnerships",
        responsiveService: "Quick response to local needs and immediate support for youth development initiatives",
        targetedPrograms: "Specialized programs designed to meet specific district characteristics and opportunities",
        impactMonitoring: "Real-time tracking of program effectiveness and continuous improvement at district level"
      }
    }
  });
});

// Get Directors Overview
export const getDirectorsOverview = asyncHandler(async (req: Request, res: Response) => {
  const overview = await directorsService.getOverview();

  res.json({
    success: true,
    data: overview
  });
});