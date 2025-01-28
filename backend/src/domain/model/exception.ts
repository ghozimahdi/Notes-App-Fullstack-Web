// noinspection JSUnusedGlobalSymbols

class Exception<T> extends Error {
  constructor(public status: number, message: string, public data?: T) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class InternalServerException<T> extends Exception<T> {
  constructor(message = "Internal Server Error", data?: any) {
    super(500, message, data);
  }
}

class BadRequestException<T> extends Exception<T> {
  constructor(message?: string, data?: T) {
    super(400, message ?? "Bad Request", data);
  }
}

class EmailAlreadyRegisteredException extends BadRequestException<null> {}

class UnauthorizedException<T> extends Exception<T> {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenException<T> extends Exception<T> {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class NotFoundException<T> extends Exception<T> {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

function handleError(message: string, error?: unknown): never {
  if (error instanceof Exception) {
    throw error;
  }

  throw new InternalServerException(error instanceof Error ? error.message : message);
}

export {
  handleError,
  Exception,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  InternalServerException,
  EmailAlreadyRegisteredException,
}