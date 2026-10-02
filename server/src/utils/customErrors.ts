export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly errors: any;

  constructor(message: string, statusCode: number, errors: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, errors: any = null) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access denied.") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found.") {
    super(message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error.") {
    super(message, 500);
  }
}
