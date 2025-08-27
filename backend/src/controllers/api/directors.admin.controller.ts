import { Request, Response } from 'express';
import { directorsService, PaginationParams } from '@/services/directors.service';
import { asyncHandler } from '@/middleware/error.middleware';
import { activityService } from '@/services/activity.service';
import { AuthRequest } from '@/types/express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// Helper function to extract pagination params from request
const getPaginationParams = (req: Request): PaginationParams => {
  return {
    page: parseInt(req.query.page as string) || 1,
    limit: Math.min(parseInt(req.query.limit as string) || 10, 50),
    search: req.query.search as string,
    status: (req.query.status as 'active' | 'inactive' | 'all') || 'all',
    sort: req.query.sort as string,
    order: (req.query.order as 'asc' | 'desc') || 'asc'
  };
};

// Chairman Management
export const getChairman = asyncHandler(async (req: AuthRequest, res: Response) => {
  const chairman = await directorsService.getChairman(false);

  if (!chairman) {
    res.status(404).json({
      success: false,
      error: 'Chairman information not found',
      message: 'Chairman information not found'
    });
    return;
  }

  res.json({
    success: true,
    data: chairman
  });
});

export const updateChairman = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const chairman = await directorsService.updateChairman(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'CHAIRMAN', chairman.id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: chairman,
    message: 'Chairman information updated successfully'
  });
});

// Board Members Management
export const getBoardMembers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getBoardMembers(params, false);

  res.json({
    success: true,
    data: result.members,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getBoardMemberById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const member = await directorsService.getBoardMemberById(id);

  if (!member) {
    res.status(404).json({
      success: false,
      error: 'Board member not found',
      message: 'Board member not found'
    });
    return;
  }

  res.json({
    success: true,
    data: member
  });
});

export const createBoardMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const member = await directorsService.createBoardMember(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'BOARD_MEMBER', member.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: member,
    message: 'Board member created successfully'
  });
});

export const updateBoardMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const member = await directorsService.updateBoardMember(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'BOARD_MEMBER', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: member,
    message: 'Board member updated successfully'
  });
});

export const deleteBoardMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteBoardMember(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'BOARD_MEMBER', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Board member deleted successfully'
  });
});

// Directors Management
export const getDirectors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getDirectors(params, false);

  res.json({
    success: true,
    data: result.directors,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getDirectorById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const director = await directorsService.getDirectorById(id);

  if (!director) {
    res.status(404).json({
      success: false,
      error: 'Director not found',
      message: 'Director not found'
    });
    return;
  }

  res.json({
    success: true,
    data: director
  });
});

export const createDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const director = await directorsService.createDirector(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'DIRECTOR', director.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: director,
    message: 'Director created successfully'
  });
});

export const updateDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const director = await directorsService.updateDirector(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'DIRECTOR', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: director,
    message: 'Director updated successfully'
  });
});

export const deleteDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteDirector(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'DIRECTOR', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Director deleted successfully'
  });
});

// Deputy Directors Management
export const getDeputyDirectors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getDeputyDirectors(params, false);

  res.json({
    success: true,
    data: result.deputyDirectors,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getDeputyDirectorById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const deputy = await directorsService.getDeputyDirectorById(id);

  if (!deputy) {
    res.status(404).json({
      success: false,
      error: 'Deputy Director not found',
      message: 'Deputy Director not found'
    });
    return;
  }

  res.json({
    success: true,
    data: deputy
  });
});

export const createDeputyDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const deputy = await directorsService.createDeputyDirector(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'DEPUTY_DIRECTOR', deputy.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: deputy,
    message: 'Deputy Director created successfully'
  });
});

export const updateDeputyDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const deputy = await directorsService.updateDeputyDirector(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'DEPUTY_DIRECTOR', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: deputy,
    message: 'Deputy Director updated successfully'
  });
});

export const deleteDeputyDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteDeputyDirector(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'DEPUTY_DIRECTOR', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Deputy Director deleted successfully'
  });
});

// Assistant Directors Management
export const getAssistantDirectors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getAssistantDirectors(params, false);

  res.json({
    success: true,
    data: result.assistantDirectors,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getAssistantDirectorById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const assistant = await directorsService.getAssistantDirectorById(id);

  if (!assistant) {
    res.status(404).json({
      success: false,
      error: 'Assistant Director not found',
      message: 'Assistant Director not found'
    });
    return;
  }

  res.json({
    success: true,
    data: assistant
  });
});

export const createAssistantDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const assistant = await directorsService.createAssistantDirector(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'ASSISTANT_DIRECTOR', assistant.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: assistant,
    message: 'Assistant Director created successfully'
  });
});

export const updateAssistantDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const assistant = await directorsService.updateAssistantDirector(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'ASSISTANT_DIRECTOR', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: assistant,
    message: 'Assistant Director updated successfully'
  });
});

export const deleteAssistantDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteAssistantDirector(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'ASSISTANT_DIRECTOR', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Assistant Director deleted successfully'
  });
});

// Provincial Directors Management
export const getProvincialDirectors = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getProvincialDirectors(params, false);

  res.json({
    success: true,
    data: result.provincialDirectors,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getProvincialDirectorById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const provincial = await directorsService.getProvincialDirectorById(id);

  if (!provincial) {
    res.status(404).json({
      success: false,
      error: 'Provincial Director not found',
      message: 'Provincial Director not found'
    });
    return;
  }

  res.json({
    success: true,
    data: provincial
  });
});

export const createProvincialDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const provincial = await directorsService.createProvincialDirector(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'PROVINCIAL_DIRECTOR', provincial.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: provincial,
    message: 'Provincial Director created successfully'
  });
});

export const updateProvincialDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const provincial = await directorsService.updateProvincialDirector(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'PROVINCIAL_DIRECTOR', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: provincial,
    message: 'Provincial Director updated successfully'
  });
});

export const deleteProvincialDirector = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteProvincialDirector(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'PROVINCIAL_DIRECTOR', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Provincial Director deleted successfully'
  });
});

// Provincial Assistant Directors Management
export const getProvincialAssistants = asyncHandler(async (req: AuthRequest, res: Response) => {
  const params = getPaginationParams(req);
  const result = await directorsService.getProvincialAssistants(params, false);

  res.json({
    success: true,
    data: result.provincialAssistants,
    pagination: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      pages: result.totalPages
    }
  });
});

export const getProvincialAssistantById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const assistant = await directorsService.getProvincialAssistantById(id);

  if (!assistant) {
    res.status(404).json({
      success: false,
      error: 'Provincial Assistant not found',
      message: 'Provincial Assistant not found'
    });
    return;
  }

  res.json({
    success: true,
    data: assistant
  });
});

export const createProvincialAssistant = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  const assistant = await directorsService.createProvincialAssistant(req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'CREATE', 'PROVINCIAL_ASSISTANT', assistant.id, {
    data: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.status(201).json({
    success: true,
    data: assistant,
    message: 'Provincial Assistant created successfully'
  });
});

export const updateProvincialAssistant = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedBy = req.user?.email || 'system';
  const assistant = await directorsService.updateProvincialAssistant(id, req.body, updatedBy);

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', 'PROVINCIAL_ASSISTANT', id, {
    changes: req.body
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    data: assistant,
    message: 'Provincial Assistant updated successfully'
  });
});

export const deleteProvincialAssistant = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await directorsService.deleteProvincialAssistant(id);

  // Log activity
  await activityService.log(req.user!.id, 'DELETE', 'PROVINCIAL_ASSISTANT', id);

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Provincial Assistant deleted successfully'
  });
});

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public', 'images', 'directors');
    await fs.mkdir(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `director-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  }
});

// Upload Director Image
export const uploadDirectorImage: any[] = [
  upload.single('image'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No image file provided',
        message: 'Please upload an image file'
      });
      return;
    }

    const { type, id } = req.params;
    const imageUrl = `/images/directors/${req.file.filename}`;
    const updatedBy = req.user?.email || 'system';

    // Update the appropriate director type with the new image URL
    let result;
    switch (type) {
      case 'chairman':
        result = await directorsService.updateChairman({ image: imageUrl }, updatedBy);
        break;
      case 'board-member':
        result = await directorsService.updateBoardMember(id, { image: imageUrl }, updatedBy);
        break;
      case 'director':
        result = await directorsService.updateDirector(id, { image: imageUrl }, updatedBy);
        break;
      case 'deputy-director':
        result = await directorsService.updateDeputyDirector(id, { image: imageUrl }, updatedBy);
        break;
      case 'provincial-director':
        result = await directorsService.updateProvincialDirector(id, { image: imageUrl }, updatedBy);
        break;
      default:
        res.status(400).json({
          success: false,
          error: 'Invalid director type',
          message: 'Invalid director type specified'
        });
        return;
    }

    // Log activity
    await activityService.log(req.user!.id, 'UPDATE', type.toUpperCase(), id || 'chairman', {
      action: 'image_upload',
      imageUrl
    });

    // Clear cache
    await directorsService.clearCache();

    res.json({
      success: true,
      data: { imageUrl },
      message: 'Image uploaded successfully'
    });
  })
];

// Delete Director Image
export const deleteDirectorImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type, id } = req.params;
  const updatedBy = req.user?.email || 'system';

  // Update the appropriate director type to remove the image
  let result;
  switch (type) {
    case 'chairman':
      result = await directorsService.updateChairman({ image: undefined }, updatedBy);
      break;
    case 'board-member':
      result = await directorsService.updateBoardMember(id, { image: undefined }, updatedBy);
      break;
    case 'director':
      result = await directorsService.updateDirector(id, { image: undefined }, updatedBy);
      break;
    case 'deputy-director':
      result = await directorsService.updateDeputyDirector(id, { image: undefined }, updatedBy);
      break;
    case 'provincial-director':
      result = await directorsService.updateProvincialDirector(id, { image: undefined }, updatedBy);
      break;
    default:
      res.status(400).json({
        success: false,
        error: 'Invalid director type',
        message: 'Invalid director type specified'
      });
      return;
  }

  // Log activity
  await activityService.log(req.user!.id, 'UPDATE', type.toUpperCase(), id || 'chairman', {
    action: 'image_delete'
  });

  // Clear cache
  await directorsService.clearCache();

  res.json({
    success: true,
    message: 'Image deleted successfully'
  });
});

// Directors Overview
export const getDirectorsOverview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const overview = await directorsService.getOverview();

  res.json({
    success: true,
    data: overview
  });
});