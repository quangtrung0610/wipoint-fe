export interface ErrorDto {
  error: {
    code: string;
    data: any;
    message: string;
    details: unknown;
    validationErrors: string;
  };
}
