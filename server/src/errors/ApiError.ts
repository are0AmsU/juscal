export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message: string) {
    return new ApiError(400, message)
  }

}