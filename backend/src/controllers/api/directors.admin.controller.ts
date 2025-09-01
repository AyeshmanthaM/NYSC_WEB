import { Request, Response } from 'express';
import { directorsService, PaginationParams } from '@/services/directors.service';
import { asyncHandler } from '@/middleware/error.middleware';
import { activityService } from '@/services/activity.service';
import { uploadService } from '@/services/upload.service';
import { AuthRequest } from '@/types/express';
import multer from 'multer';
import path from 'path';

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

export const createChairman = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updatedBy = req.user?.email || 'system';
  
  try {
    const chairman = await directorsService.createChairman(req.body, updatedBy);

    // Log activity
    await activityService.log(req.user!.id, 'CREATE', 'CHAIRMAN', chairman.id, {
      data: req.body
    });

    res.status(201).json({
      success: true,
      data: chairman,
      message: 'Chairman created successfully'
    });
  } catch (error) {
    if (error instanceof Error && (
      error.message.includes('required') || 
      error.message.includes('already exists')
    )) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: error.message
      });
      return;
    }
    throw error;
  }
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
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory so we can use upload service
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // Use env variable with fallback
  },
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
    const updatedBy = req.user?.email || 'system';

    try {
      // Upload file using upload service
      const uploadResult = await uploadService.uploadFile(req.file, {
        directory: 'directors',
        prefix: type,
        allowedTypes: ['jpg', 'jpeg', 'png', 'webp'],
        maxSize: 5 * 1024 * 1024 // 5MB for images
      });

      // Update the appropriate director type with the new image URL
      let result;
      switch (type) {
        case 'chairman':
          try {
            result = await directorsService.updateChairman({ image: uploadResult.url }, updatedBy);
          } catch (error) {
            if (error instanceof Error && error.message.includes('required when creating')) {
              res.status(400).json({
                success: false,
                error: 'Chairman record not found',
                message: 'Cannot upload image for chairman. Please create chairman profile first with basic information (name, description, email, phone).'
              });
              return;
            }
            throw error;
          }
          break;
        case 'board-member':
          result = await directorsService.updateBoardMember(id, { image: uploadResult.url }, updatedBy);
          break;
        case 'director':
          result = await directorsService.updateDirector(id, { image: uploadResult.url }, updatedBy);
          break;
        case 'deputy-director':
          result = await directorsService.updateDeputyDirector(id, { image: uploadResult.url }, updatedBy);
          break;
        case 'provincial-director':
          result = await directorsService.updateProvincialDirector(id, { image: uploadResult.url }, updatedBy);
          break;
        default:
          res.status(400).json({
            success: false,
            error: 'Invalid director type',
            message: 'Invalid director type specified'
          });
          return;
      }

      // Log activity with comprehensive upload details
      await activityService.log(req.user!.id, 'UPDATE', type.toUpperCase(), id || 'chairman', {
        action: 'image_upload',
        uploadDetails: {
          originalFilename: uploadResult.originalFilename,
          storedFilename: uploadResult.filename,
          imageUrl: uploadResult.url,
          fileSize: uploadResult.size,
          mimetype: uploadResult.mimetype,
          uploadedAt: uploadResult.uploadedAt
        }
      });

      // Clear cache
      await directorsService.clearCache();

      res.json({
        success: true,
        data: {
          imageUrl: uploadResult.url,
          originalFilename: uploadResult.originalFilename,
          filename: uploadResult.filename,
          size: uploadResult.size,
          uploadedAt: uploadResult.uploadedAt
        },
        message: 'Image uploaded successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Upload failed',
        message: error instanceof Error ? error.message : 'Unknown upload error'
      });
    }
  })
];

// Delete Director Image
export const deleteDirectorImage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type, id } = req.params;
  const updatedBy = req.user?.email || 'system';

  try {
    // First get the current image URL to delete the file
    let currentData;
    switch (type) {
      case 'chairman':
        currentData = await directorsService.getChairman(false);
        break;
      case 'board-member':
        currentData = await directorsService.getBoardMemberById(id);
        break;
      case 'director':
        currentData = await directorsService.getDirectorById(id);
        break;
      case 'deputy-director':
        currentData = await directorsService.getDeputyDirectorById(id);
        break;
      case 'provincial-director':
        currentData = await directorsService.getProvincialDirectorById(id);
        break;
      default:
        res.status(400).json({
          success: false,
          error: 'Invalid director type',
          message: 'Invalid director type specified'
        });
        return;
    }

    // Delete physical file if image exists
    let deletedFilePath: string | null = null;
    if (currentData && currentData.image) {
      try {
        // Extract file path from URL (assuming URL format is /uploads/directors/filename.ext)
        const urlPath = currentData.image;
        if (urlPath.startsWith('/uploads/')) {
          const filePath = urlPath.replace('/uploads/', 'uploads/');
          await uploadService.deleteFile(filePath);
          deletedFilePath = filePath;
        }
      } catch (deleteError) {
        // Log the error but don't fail the operation
        console.warn('Failed to delete physical file:', deleteError);
      }
    }

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
    }

    // Log activity
    await activityService.log(req.user!.id, 'UPDATE', type.toUpperCase(), id || 'chairman', {
      action: 'image_delete',
      deletedFilePath,
      previousImageUrl: currentData?.image
    });

    // Clear cache
    await directorsService.clearCache();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Delete failed',
      message: error instanceof Error ? error.message : 'Unknown delete error'
    });
  }
});

// Directors Overview
export const getDirectorsOverview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const overview = await directorsService.getOverview();

  res.json({
    success: true,
    data: overview
  });
});