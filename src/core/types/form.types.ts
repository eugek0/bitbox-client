export interface IFormException {
  data: {
    message: string;
    field: string;
  };
  status: 400;
}
