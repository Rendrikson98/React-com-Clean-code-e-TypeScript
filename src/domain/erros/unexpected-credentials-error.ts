export class UnexpectedError extends Error {
  constructor() {
    super('Algo deu errado')
    this.name = 'UnexpectedError'
  }
}