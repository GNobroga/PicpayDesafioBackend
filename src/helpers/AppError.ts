export default class AppError extends Error {
  public readonly status: string = "Error";

  constructor(
    public message: string,
    public readonly statusCode: number = 500
  ) {
    super();
  }
}
