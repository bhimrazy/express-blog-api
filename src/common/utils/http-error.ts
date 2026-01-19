export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = 'Bad Request'): HttpError {
    return new HttpError(message, 400);
  }

  static unauthorized(message: string = 'Unauthorized'): HttpError {
    return new HttpError(message, 401);
  }

  static forbidden(message: string = 'Forbidden'): HttpError {
    return new HttpError(message, 403);
  }

  static notFound(message: string = 'Not Found'): HttpError {
    return new HttpError(message, 404);
  }

  static conflict(message: string = 'Conflict'): HttpError {
    return new HttpError(message, 409);
  }

  static unprocessableEntity(message: string = 'Unprocessable Entity'): HttpError {
    return new HttpError(message, 422);
  }

  static tooManyRequests(message: string = 'Too Many Requests'): HttpError {
    return new HttpError(message, 429);
  }

  static internal(message: string = 'Internal Server Error'): HttpError {
    return new HttpError(message, 500, false);
  }
}
