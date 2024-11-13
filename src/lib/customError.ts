const statusMessages: { [key: number]: string } = {
    400: "Bad Request",
    401: "Unauthorized",
    422: "Unprocessable Content",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
  };
  
  class CustomError extends Error {
    statusCode: number;
    status: string;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusMessages[statusCode] || "Unknown Server Error!";
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default CustomError;
  