export class OrderError extends Error {
  constructor(message: string = 'Elements value has to increase in array') {
    super(message);
    this.name = 'IncreasingError';
  }
}
