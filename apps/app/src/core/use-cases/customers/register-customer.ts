import { Cpf, Customer, Phone, Rg } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { ListCustomers } from '../listing'
import { Register } from '../register'
import { Validator } from '@/core/utils'

export class RegisterCustomer extends Register {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async register(): Promise<void> {
    const validator = new Validator(this.output)
    let name = ''
    let socialName = ''
    let gender = ''
    let cpfValue = ''
    let cpfIssueDate = ''

    while (true) {
      name = await this.input.text('Nome do cliente:')
      if (!validator.validateText(name)) {
        this.output.error('Nome é obrigatório')
        continue
      }
      break
    }

    socialName = await this.input.text('Nome social do cliente: (opcional)')

    while (true) {
      cpfValue = await this.input.text('CPF: (Digite apenas números)')
      if (!validator.validateCpfValue(cpfValue)) continue

      const customer = this.customers.find((customer) => customer.cpf.value === cpfValue)
      if (customer) {
        this.output.error('CPF já em uso por outro cliente')
        continue
      }

      break
    }

    while (true) {
      cpfIssueDate = await this.input.text('Data de emissão do CPF (dd/mm/yyyy):')
      if (!validator.validateIssueDate(cpfIssueDate)) continue
      break
    }

    gender = await this.input.select('Gênero:', [['masculino'], ['feminino']])

    const customer = new Customer({
      name,
      socialName,
      cpf: new Cpf(cpfValue, cpfIssueDate),
    })

    let rgsCount = ''

    while (true) {
      rgsCount = await this.input.text("Quantidade de RG's:")
      if (!validator.validateNumber(rgsCount)) continue
      break
    }

    for (let count = 0; count < Number(rgsCount); count++) {
      let value = ''
      let issueDate = ''

      while (true) {
        value = await this.input.text(
          `Por favor, informe o RG ${count + 1}: (Digite apenas números)`,
        )
        if (!validator.validateRgValue(value)) continue

        const customer = this.customers.find((customer) => customer.hasRg(value))
        if (customer) {
          this.output.error('RG já em uso por outro cliente')
          continue
        }
        break
      }

      while (true) {
        issueDate = await this.input.text(
          `Data de emissão do RG ${count + 1}: (dd/mm/yyyy)`,
        )
        if (!validator.validateIssueDate(issueDate)) continue
        break
      }
      customer.rgs.push(new Rg(value, issueDate))
    }

    let phonesCount = ''

    while (true) {
      phonesCount = await this.input.text('Quantidade de telefones:')
      if (!validator.validateNumber(phonesCount)) continue
      break
    }

    for (let count = 0; count < Number(phonesCount); count++) {
      let codeArea = ''
      let number = ''

      while (true) {
        codeArea = await this.input.text('DDD:')
        if (!validator.validatePhoneCodeArea(codeArea)) continue
        break
      }

      while (true) {
        number = await this.input.text('Número:')
        if (!validator.validatePhoneNumber(number)) continue

        const customer = this.customers.find((customer) => customer.hasPhone(number))
        if (customer) {
          this.output.error('Telefone já em uso por outro cliente')
          continue
        }
        break
      }

      customer.phones.push(new Phone(codeArea, number))
    }

    this.customers.push(customer)
    this.output.clear()

    new ListCustomers(this.customers, this.input, this.output).list()

    this.output.success('Cliente cadastrado com sucesso')
  }
}
