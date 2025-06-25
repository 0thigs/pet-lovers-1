export interface Input {
  text(message: string): Promise<string>
  number(message: string): Promise<number>
  select(message: string, options: string[][]): Promise<string>
}
