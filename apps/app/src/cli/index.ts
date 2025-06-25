import { App } from './app'
import { ChalkOutput } from './chalk-output'
import { InquirerInput } from './inquirer-input'

const input = new InquirerInput()
const output = new ChalkOutput()
const app = new App(input, output)
;(async () => app.start())()
