import { Cpf, Rg, type Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListCustomers } from '../listing'
import { Validator } from '@/core/utils'

export class UpdateCustomer extends Update {
  private isRunning = true
  private customers: Customer[]
  private validator: Validator

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
    this.validator = new Validator(output)
  }

  public async update(): Promise<void> {
    this.output.clear()
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.customers.length && this.isRunning) {
      const id = await this.input.text('ID do cliente:')
      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      await this.updateCustomer(customer)
      this.isRunning = false
    }
  }

  public async updateCustomer(customer: Customer): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['CPF', 'cpf'],
      ['Nome social', 'socialName'],
      ['Gênero', 'gender'],
      ["RG's", 'rgs'],
      ['Telefones', 'phones'],
    ])

    switch (option) {
      case 'name': {
        let name = ''
        while (true) {
          name = await this.input.text('Novo nome do cliente:')
          if (!this.validator.validateText(name)) {
            this.output.error('Nome é obrigatório')
            continue
          }
          break
        }
        customer.name = name
        break
      }
      case 'socialName':
        customer.socialName = await this.input.text('Novo nome social do cliente')
        break
      case 'rgs':
        await this.updateRg(customer)
        break
      case 'phones':
        await this.updatePhone(customer)
        break
      case 'cpf':
        await this.updateCpf(customer)
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const customerIndex = this.customers.findIndex((currentCustomer) =>
      currentCustomer.isEqualTo(customer),
    )
    this.customers.splice(customerIndex, 1, customer)

    this.output.clear()

    new ListCustomers(this.customers, this.input, this.output).list()

    this.output.success('Cliente atualizado com sucesso')
  }

  private async updatePhone(customer: Customer) {
    if (!customer.phones.length) {
      this.output.error('Nenhum telefone encontrado')
      return
    }

    while (true) {
      const phoneIndex = await this.input.select('Escolha um Telefone para atualizar:', [
        ...customer.phones.map((phone, index) => [
          `1)  ${phone.number}`,
          String(index + 1),
        ]),
      ])

      const phone = customer.phones[Number(phoneIndex) - 1]

      if (!phone) {
        this.output.error('Telefone não encontrado')
        continue
      }

      let isRunning = true
      while (isRunning) {
        const option = await this.input.select(
          'Escolha o que você quer atualizar no telefone:',
          [
            [`DDD do telefone. Valor atual ${phone.codeArea}`, 'codeArea'],
            [`Número do telefone. Valor atual ${phone.number}`, 'number'],
          ],
        )

        switch (option) {
          case 'number': {
            let number = ''

            while (true) {
              number = await this.input.text('Novo número:')
              if (!this.validator.validatePhoneNumber(number)) continue

              const customer = this.customers.find((customer) =>
                customer.hasPhone(number),
              )
              if (customer) {
                this.output.error('Telefone já em uso por outro cliente')
                continue
              }
              break
            }

            phone.number = number
            isRunning = false
            break
          }
          case 'codeArea': {
            let codeArea = ''

            while (true) {
              codeArea = await this.input.text('Novo DDD:')
              if (!this.validator.validatePhoneCodeArea(codeArea)) continue
              break
            }
            phone.codeArea = codeArea
            isRunning = false
            break
          }
          default:
            this.output.unknownCommand()
        }
      }
      return
    }
  }

  private async updateRg(customer: Customer) {
    if (!customer.rgs.length) {
      this.output.error('Nenhum RG encontrado')
      return
    }

    while (true) {
      const rgIndex = await this.input.select('Escolha um RG para atualizar:', [
        ...customer.rgs.map((rg, index) => [`1) ${rg.value}`, String(index + 1)]),
      ])

      const rg = customer.rgs[Number(rgIndex) - 1]

      if (!rg) {
        this.output.error('RG não encontrado')
        continue
      }

      let isRunning = true
      while (isRunning) {
        const option = await this.input.select(
          'Escolha o que você quer atualizar no rg:',
          [
            [`valor do RG. Valor atual ${rg.value}`, 'value'],
            [`valor da data de emissão. Valor atual ${rg.issueDate}`, 'issueDate'],
          ],
        )

        switch (option) {
          case 'value': {
            let value = ''

            while (true) {
              value = await this.input.text('Novo valor do RG:')
              if (!this.validator.validateRgValue(value)) continue

              const customer = this.customers.find((customer) => customer.hasRg(value))
              if (customer) {
                this.output.error('RG já em uso por outro cliente')
                continue
              }
              break
            }
            rg.value = value
            isRunning = false
            break
          }
          case 'issueDate': {
            let issueDate = ''

            while (true) {
              issueDate = await this.input.text(
                'Nova data de emissão do RG (dd/mm/yyyy):',
              )
              if (!this.validator.validateIssueDate(issueDate)) continue
              break
            }
            rg.issueDate = issueDate
            isRunning = false
            break
          }
          default:
            this.output.unknownCommand()
        }
      }
      return
    }
  }

  private async updateCpf(customer: Customer) {
    while (true) {
      const option = await this.input.select('Escolha uma opção do CPF para atualizar:', [
        [`Valor do CPF. Valor atual: ${customer.cpf.value}`, 'value'],
        [
          `date de emissão. Data de emissão atual: ${customer.cpf.issueDate}`,
          'issueDate',
        ],
      ])

      switch (option) {
        case 'value': {
          let cpfValue = ''
          while (true) {
            cpfValue = await this.input.text('CPF: (Digite apenas números)')
            if (!this.validator.validateCpfValue(cpfValue)) continue

            const customer = this.customers.find(
              (customer) => customer.cpf.value === cpfValue,
            )
            if (customer) {
              this.output.error('CPF já em uso por outro cliente')
              continue
            }

            break
          }
          customer.cpf.value = cpfValue
          return
        }
        case 'issueDate': {
          let cpfIssueDate = ''
          while (true) {
            cpfIssueDate = await this.input.text('Data de emissão do CPF (dd/mm/yyyy):')
            if (!this.validator.validateIssueDate(cpfIssueDate)) continue
            break
          }
          customer.cpf.issueDate = cpfIssueDate
          return
        }
        default:
          this.output.unknownCommand()
      }
    }
  }
}
