import { Validator } from '@/core/utils'
import { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'
import { ListProducts } from '../listing'

export class RegisterProduct extends Register {
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public async register(): Promise<void> {
    const validator = new Validator(this.output)
    this.output.clear()
    let name = ''
    let description = ''
    let price = ''

    while (true) {
      name = await this.input.text('Nome do produto:')
      if (!validator.validateText(name)) {
        this.output.error('Nome é obrigatório')
        continue
      }
      break
    }

    while (true) {
      description = await this.input.text('Descrição do produto:')
      if (!validator.validateText(description)) {
        this.output.error('Descrição é obrigatória')
        continue
      }
      break
    }

    while (true) {
      price = await this.input.text('Preço do produto:')
      if (!validator.validateNumber(price)) {
        continue
      }
      break
    }

    const product = new Product({ name, description, price: Number(price), ordersCount: 0 })

    this.products.push(product)
    this.output.clear()

    new ListProducts(this.products, this.input, this.output).list()

    this.output.success('Produto cadastrado com sucesso')
  }
}
