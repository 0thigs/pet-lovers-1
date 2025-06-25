import type { Output } from '../../core/interfaces'

export class OutputMock implements Output {
  tables: Record<string, unknown>[][] = []
  lastErrorMessage = ''

  title(message: string): void {}
  success(message: string): void {
    this.lastErrorMessage = message
  }
  error(message: string): void {
    this.lastErrorMessage = message
  }
  table(rows: Record<string, unknown>[]): void {
    this.tables.push(rows)
  }
  clear(): void {}
  breakLine(): void {}
  unknownCommand(): void {}
}
