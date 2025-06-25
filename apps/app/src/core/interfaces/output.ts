export interface Output {
  title(message: string): void
  success(message: string): void
  error(message: string): void
  loading(): void
  table(rows: Record<string, unknown>[]): void
  clear(): void
  breakLine(): void
  unknownCommand(): void
}
