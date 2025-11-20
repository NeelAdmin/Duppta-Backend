import { IUserDocument } from '../Model/User.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export {};
