import { PrismaClient, Prisma } from '@prisma/client';
import { cacheService } from './cache.service';

const prisma = new PrismaClient();

// Cache TTL in seconds (15 minutes for public data)
const CACHE_TTL = 900;

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface DirectorData {
  name: string;
  position: string;
  department?: string;
  description: string;
  email: string;
  phone: string;
  image?: string;
  linkedin?: string;
  specialization?: string;
  experience?: string;
  achievements?: any[];
  provinces?: string[];
  region?: string;
  province?: string;
  district?: string;
  headquarters?: string;
  population?: string;
  centers?: number;
  districts?: string[];
  qualifications?: any[];
  vision?: string;
  keyInitiatives?: any[];
  tenure?: string;
  title?: string;
  badge?: string;
  order?: number;
}

class DirectorsService {
  // Chairman Operations
  async getChairman(isPublic: boolean = true) {
    const cacheKey = 'directors:chairman';
    
    if (isPublic) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const chairman = await prisma.chairman.findFirst({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });

    if (chairman && isPublic) {
      await cacheService.set(cacheKey, chairman, CACHE_TTL);
    }

    return chairman;
  }

  async createChairman(data: DirectorData, updatedBy: string) {
    // Validate required fields
    if (!data.name) {
      throw new Error('Chairman name is required');
    }
    if (!data.description) {
      throw new Error('Chairman description is required');
    }
    if (!data.email) {
      throw new Error('Chairman email is required');
    }
    if (!data.phone) {
      throw new Error('Chairman phone is required');
    }

    // Check if chairman already exists
    const existingChairman = await prisma.chairman.findFirst({
      where: { isActive: true }
    });

    if (existingChairman) {
      throw new Error('Chairman already exists. Use update method instead.');
    }

    const chairman = await prisma.chairman.create({
      data: {
        name: data.name,
        title: data.title || 'Chairman / Director General',
        description: data.description,
        email: data.email,
        phone: data.phone,
        image: data.image,
        linkedin: data.linkedin,
        tenure: data.tenure,
        qualifications: data.qualifications || [],
        achievements: data.achievements || [],
        vision: data.vision,
        keyInitiatives: data.keyInitiatives || [],
        updatedBy
      }
    });

    // Clear cache
    await this.clearCache();
    
    return chairman;
  }

  async updateChairman(data: Partial<DirectorData>, updatedBy: string) {
    const chairman = await prisma.chairman.findFirst({
      where: { isActive: true }
    });

    if (chairman) {
      // Update existing chairman
      return await prisma.chairman.update({
        where: { id: chairman.id },
        data: { ...data, updatedBy }
      });
    } else {
      // Create new chairman - ensure required fields are present
      if (!data.name) {
        throw new Error('Chairman name is required when creating a new chairman record');
      }
      if (!data.description) {
        throw new Error('Chairman description is required when creating a new chairman record');
      }
      if (!data.email) {
        throw new Error('Chairman email is required when creating a new chairman record');
      }
      if (!data.phone) {
        throw new Error('Chairman phone is required when creating a new chairman record');
      }

      return await prisma.chairman.create({
        data: {
          name: data.name,
          title: data.title || 'Chairman / Director General',
          description: data.description,
          email: data.email,
          phone: data.phone,
          image: data.image,
          linkedin: data.linkedin,
          tenure: data.tenure,
          qualifications: data.qualifications || [],
          achievements: data.achievements || [],
          vision: data.vision,
          keyInitiatives: data.keyInitiatives || [],
          updatedBy
        }
      });
    }
  }

  // Board Members Operations
  async getBoardMembers(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:board-members:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.BoardMemberWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } }
      ];
    }

    const [members, total] = await Promise.all([
      prisma.boardMember.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.boardMember.count({ where })
    ]);

    const result = {
      members,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getBoardMemberById(id: string) {
    return await prisma.boardMember.findUnique({
      where: { id }
    });
  }

  async createBoardMember(data: DirectorData, updatedBy: string) {
    return await prisma.boardMember.create({
      data: {
        name: data.name,
        position: data.position,
        description: data.description,
        email: data.email,
        phone: data.phone,
        image: data.image,
        linkedin: data.linkedin,
        badge: data.badge,
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateBoardMember(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.boardMember.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteBoardMember(id: string) {
    return await prisma.boardMember.delete({
      where: { id }
    });
  }

  // Directors Operations
  async getDirectors(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:directors:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.DirectorWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } },
        { department: { contains: params.search } }
      ];
    }

    const [directors, total] = await Promise.all([
      prisma.director.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.director.count({ where })
    ]);

    const result = {
      directors,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getDirectorById(id: string) {
    return await prisma.director.findUnique({
      where: { id }
    });
  }

  async createDirector(data: DirectorData, updatedBy: string) {
    return await prisma.director.create({
      data: {
        name: data.name,
        position: data.position,
        department: data.department!,
        description: data.description,
        email: data.email,
        phone: data.phone,
        image: data.image,
        linkedin: data.linkedin,
        specialization: data.specialization,
        experience: data.experience,
        achievements: data.achievements || [],
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateDirector(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.director.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteDirector(id: string) {
    return await prisma.director.delete({
      where: { id }
    });
  }

  // Deputy Directors Operations
  async getDeputyDirectors(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:deputy-directors:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.DeputyDirectorWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } },
        { department: { contains: params.search } }
      ];
    }

    const [deputyDirectors, total] = await Promise.all([
      prisma.deputyDirector.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.deputyDirector.count({ where })
    ]);

    const result = {
      deputyDirectors,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getDeputyDirectorById(id: string) {
    return await prisma.deputyDirector.findUnique({
      where: { id }
    });
  }

  async createDeputyDirector(data: DirectorData, updatedBy: string) {
    return await prisma.deputyDirector.create({
      data: {
        name: data.name,
        position: data.position,
        department: data.department!,
        description: data.description,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        specialization: data.specialization,
        provinces: data.provinces || [],
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateDeputyDirector(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.deputyDirector.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteDeputyDirector(id: string) {
    return await prisma.deputyDirector.delete({
      where: { id }
    });
  }

  // Assistant Directors Operations
  async getAssistantDirectors(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:assistant-directors:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.AssistantDirectorWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } },
        { department: { contains: params.search } }
      ];
    }

    const [assistantDirectors, total] = await Promise.all([
      prisma.assistantDirector.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.assistantDirector.count({ where })
    ]);

    const result = {
      assistantDirectors,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getAssistantDirectorById(id: string) {
    return await prisma.assistantDirector.findUnique({
      where: { id }
    });
  }

  async createAssistantDirector(data: DirectorData, updatedBy: string) {
    return await prisma.assistantDirector.create({
      data: {
        name: data.name,
        position: data.position,
        department: data.department!,
        region: data.region,
        specialization: data.specialization,
        email: data.email,
        phone: data.phone,
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateAssistantDirector(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.assistantDirector.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteAssistantDirector(id: string) {
    return await prisma.assistantDirector.delete({
      where: { id }
    });
  }

  // Provincial Directors Operations
  async getProvincialDirectors(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:provincial-directors:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.ProvincialDirectorWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } },
        { province: { contains: params.search } }
      ];
    }

    const [provincialDirectors, total] = await Promise.all([
      prisma.provincialDirector.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.provincialDirector.count({ where })
    ]);

    const result = {
      provincialDirectors,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getProvincialDirectorById(id: string) {
    return await prisma.provincialDirector.findUnique({
      where: { id }
    });
  }

  async createProvincialDirector(data: DirectorData, updatedBy: string) {
    return await prisma.provincialDirector.create({
      data: {
        name: data.name,
        position: data.position,
        province: data.province!,
        headquarters: data.headquarters,
        districts: data.districts || [],
        population: data.population,
        centers: data.centers,
        description: data.description,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        achievements: data.achievements || [],
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateProvincialDirector(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.provincialDirector.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteProvincialDirector(id: string) {
    return await prisma.provincialDirector.delete({
      where: { id }
    });
  }

  // Provincial Assistant Directors Operations
  async getProvincialAssistants(params?: PaginationParams, isPublic: boolean = true) {
    const cacheKey = `directors:provincial-assistants:${JSON.stringify(params)}`;
    
    if (isPublic && !params?.search) {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const where: Prisma.ProvincialAssistantWhereInput = {};
    
    if (params?.status !== 'all') {
      where.isActive = params?.status === 'active' || isPublic;
    }
    
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { position: { contains: params.search } },
        { province: { contains: params.search } },
        { district: { contains: params.search } }
      ];
    }

    const [provincialAssistants, total] = await Promise.all([
      prisma.provincialAssistant.findMany({
        where,
        orderBy: params?.sort 
          ? { [params.sort]: params.order || 'asc' }
          : { order: 'asc' },
        skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined,
        take: params?.limit
      }),
      prisma.provincialAssistant.count({ where })
    ]);

    const result = {
      provincialAssistants,
      total,
      page: params?.page || 1,
      limit: params?.limit || total,
      totalPages: params?.limit ? Math.ceil(total / params.limit) : 1
    };

    if (isPublic && !params?.search) {
      await cacheService.set(cacheKey, result, CACHE_TTL);
    }

    return result;
  }

  async getProvincialAssistantById(id: string) {
    return await prisma.provincialAssistant.findUnique({
      where: { id }
    });
  }

  async createProvincialAssistant(data: DirectorData, updatedBy: string) {
    return await prisma.provincialAssistant.create({
      data: {
        name: data.name,
        position: data.position,
        province: data.province!,
        district: data.district!,
        headquarters: data.headquarters,
        population: data.population,
        centers: data.centers,
        email: data.email,
        phone: data.phone,
        specialization: data.specialization,
        order: data.order || 0,
        updatedBy
      }
    });
  }

  async updateProvincialAssistant(id: string, data: Partial<DirectorData>, updatedBy: string) {
    return await prisma.provincialAssistant.update({
      where: { id },
      data: { ...data, updatedBy }
    });
  }

  async deleteProvincialAssistant(id: string) {
    return await prisma.provincialAssistant.delete({
      where: { id }
    });
  }

  // Get Overview Statistics
  async getOverview() {
    const cacheKey = 'directors:overview';
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    const [
      boardCount,
      chairmanCount,
      directorsCount,
      deputyCount,
      assistantCount,
      provincialCount,
      provincialAssistantCount
    ] = await Promise.all([
      prisma.boardMember.count({ where: { isActive: true } }),
      prisma.chairman.count({ where: { isActive: true } }),
      prisma.director.count({ where: { isActive: true } }),
      prisma.deputyDirector.count({ where: { isActive: true } }),
      prisma.assistantDirector.count({ where: { isActive: true } }),
      prisma.provincialDirector.count({ where: { isActive: true } }),
      prisma.provincialAssistant.count({ where: { isActive: true } })
    ]);

    const overview = {
      organizationStats: {
        totalLeadership: boardCount + chairmanCount + directorsCount + deputyCount + 
                        assistantCount + provincialCount + provincialAssistantCount,
        provinces: 9,
        districts: 25,
        combinedExperience: "500+"
      },
      hierarchy: {
        boardMembers: boardCount,
        chairman: chairmanCount,
        directors: directorsCount,
        deputyDirectors: deputyCount,
        assistantDirectors: assistantCount,
        provincialDirectors: provincialCount,
        provincialAssistants: provincialAssistantCount,
        totalLevels: 6
      },
      coverage: {
        nationalReach: true,
        provincialCoverage: "100%",
        districtCoverage: "100%",
        youthCenters: "240+",
        annualBeneficiaries: "500K+"
      },
      keyFunctions: [
        {
          level: "Board of Members",
          function: "Strategic Governance",
          description: "Policy direction and organizational oversight"
        },
        {
          level: "Chairman",
          function: "Executive Leadership",
          description: "Overall strategic direction and external relations"
        },
        {
          level: "Directors",
          function: "Departmental Leadership",
          description: "Program development and implementation oversight"
        },
        {
          level: "Deputy Directors",
          function: "Operational Management",
          description: "Day-to-day operations and program delivery"
        },
        {
          level: "Assistant Directors",
          function: "Program Coordination",
          description: "Direct program management and staff supervision"
        },
        {
          level: "Provincial Directors",
          function: "Regional Leadership",
          description: "Provincial program implementation and coordination"
        },
        {
          level: "Provincial Assistants",
          function: "District Operations",
          description: "Local service delivery and community engagement"
        }
      ]
    };

    await cacheService.set(cacheKey, overview, CACHE_TTL);
    return overview;
  }

  // Clear cache when data is modified
  async clearCache() {
    await cacheService.deletePattern('directors:*');
  }
}

export const directorsService = new DirectorsService();