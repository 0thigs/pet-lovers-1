import { UseCase } from './use-case'

export abstract class Register extends UseCase {
  public abstract register(): void
}
