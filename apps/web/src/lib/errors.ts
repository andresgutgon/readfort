type ErrorType = {
  [key: string]: string[] | undefined
  [key: number]: string[] | undefined
  [key: symbol]: string[] | undefined
}

export class AppError extends Error {
  statusCode: number = 500
  name: string = 'UnexpectedError'

  public details: ErrorType

  constructor(message: string, details: ErrorType = {}) {
    super(message)
    this.details = details
  }
}

export class ConflictError extends AppError {
  public statusCode = 409
  public name = 'ConflictError'
}

export class UnprocessableEntityError extends AppError {
  public statusCode = 422
  public name = 'UnprocessableEntityError'
  constructor(message: string, details: ErrorType) {
    super(message, details)
  }
}

export class NotFoundError extends AppError {
  public statusCode = 404
  public name = 'NotFoundError'
}

export class BadRequestError extends AppError {
  public statusCode = 400
  public name = 'BadRequestError'
}

export class ForbiddenError extends AppError {
  public statusCode = 403
  public name = 'ForbiddenError'
}

export class UnauthorizedError extends AppError {
  public statusCode = 401
  public name = 'UnauthorizedError'
}
