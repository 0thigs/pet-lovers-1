import chalk from 'chalk'
import { Table } from 'console-table-printer'

import type { Output } from '../core/interfaces'

export class ChalkOutput implements Output {
  private log = console.log

  title(message: string) {
    this.log(chalk.cyan('-'.repeat(message.length + 2)))
    this.log(chalk.cyan(` ${message} `))
    this.log(chalk.cyan('-'.repeat(message.length + 2)))
  }

  success(message: string): void {
    this.log(chalk.green.bold(`${message} ✅`))
  }

  error(message: string): void {
    this.log(chalk.red.bold(`${message} ❌`))
  }

  table(rows: Record<string, unknown>[]): void {
    const table = new Table()
    for (const row of rows) table.addRow(row)
    table.printTable()
  }

  loading() {
    this.log(chalk.blue('Aguarde...'))
  }

  clear(): void {
    console.clear()
  }

  breakLine(): void {
    console.log('\n')
  }

  unknownCommand(): void {
    this.error('Opção inválida')
  }
}
