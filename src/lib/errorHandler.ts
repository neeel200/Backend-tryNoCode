import { Request, Response } from 'express';
import CustomError from './customError';

const errController = async (
  error: CustomError | Error,
  req: Request,
  res: Response
):Promise<any> => {
  const statusCode = (error as CustomError).statusCode || 500;
  const status = (error as CustomError).status || 'error';

  return res.status(statusCode).json({
    message: error.message,
    status: status,
    stack: process.env.NODE_ENV === 'production' ? undefined : error?.stack,
  });
};

export default errController;
