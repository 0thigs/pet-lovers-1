import type { Input, Output } from '../interfaces'

export abstract class UseCase {
  constructor(
    protected input: Input,
    protected output: Output,
  ) {}
}
