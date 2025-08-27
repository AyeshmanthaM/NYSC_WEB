import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      clientIp?: string;
      user?: {
        id: string;
        email: string;
        role: string;
        firstName?: string;
        lastName?: string;
      };
      session: {
        userId?: string;
        destroy: (callback: (err?: any) => void) => void;
        save: (callback: (err?: any) => void) => void;
        regenerate: (callback: (err?: any) => void) => void;
        reload: (callback: (err?: any) => void) => void;
        touch: () => void;
        cookie: {
          originalMaxAge?: number | null;
          expires?: Date | null;
          secure?: boolean;
          httpOnly?: boolean;
          domain?: string;
          path?: string;
          sameSite?: boolean | 'lax' | 'strict' | 'none';
        };
      } & Partial<SessionData>;
    }
  }
}

interface SessionData {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  loginTime?: string;
  lastActivity?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

// Extended request type for authenticated routes
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  };
}

export {};