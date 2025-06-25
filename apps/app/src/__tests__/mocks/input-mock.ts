import type { Input } from '../../core/interfaces'

export class InputMock implements Input {
  textInputs: string[] = []
  numberInputs: number[] = []
  selectOptions: string[] = []

  async text(message: string): Promise<string> {
    const input = this.textInputs.shift()
    if (!input) {
      throw new Error('No text input found.')
    }
    return input
  }

  async number(message: string): Promise<number> {
    const input = this.numberInputs.shift()
    if (!input) {
      throw new Error('No number input found.')
    }
    return input
  }

  async select(message: string, options: string[][]): Promise<string> {
    const option = this.selectOptions.shift()
    if (!option) {
      throw new Error('No select option found.')
    }
    return option
  }
}
