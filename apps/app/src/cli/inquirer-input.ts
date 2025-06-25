import { input, select } from '@inquirer/prompts'

import type { Input } from '../core/interfaces/input'

export class InquirerInput implements Input {
  async text(message: string): Promise<string> {
    return await input({ message })
  }

  async number(message: string): Promise<number> {
    return Number(await input({ message }))
  }

  async select(message: string, options: string[][]): Promise<string> {
    const answer = await select({
      message,
      choices: options.map((option) => ({
        name: option[0],
        value: option[1] ?? option[0],
      })),
    })

    return answer
  }
}
