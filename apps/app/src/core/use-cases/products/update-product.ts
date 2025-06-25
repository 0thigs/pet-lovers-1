import type { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListProducts } from '../listing'
import { Validator } from '@/core/utils'

export class UpdateProduct extends Update {
  private isRunning = true
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public async update(): Promise<void> {
    this.output.clear()
    const productsList = new ListProducts(this.products, this.input, this.output)
    productsList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do produto:')

      const product = this.products.find((product) => product.id === id)

      if (!product) {
        this.output.error('Produto não encontrado')
        continue
      }

      await this.updateProduct(product)
      this.isRunning = false
    }
  }

  private async updateProduct(product: Product): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['Descrição', 'description'],
      ['Preço', 'price'],
      ['voltar', 'back'],
    ])

    const validator = new Validator(this.output)

    switch (option) {
      case 'name':
        {
          let name = ''
          while (true) {
            name = await this.input.text('Novo nome do produto:')
            if (!validator.validateText(name)) {
              this.output.error('Nome é obrigatório')
              continue
            }
            break
          }
          product.name = name
        }
        break
      case 'description':
        {
          let description = ''
          while (true) {
            description = await this.input.text('Nova descrição do produto:')
            if (!validator.validateText(description)) {
              this.output.error('Descrição é obrigatória')
              continue
            }
            break
          }
          product.description = description
        }
        break
      case 'price':
        {
          let price = ''
          while (true) {
            price = await this.input.text('Novo preço do produto:')
            if (!validator.validateNumber(price)) {
              continue
            }
            break
          }

          product.price = Number(price)
        }
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const productIndex = this.products.findIndex((currentProduct) =>
      currentProduct.isEqualTo(product),
    )
    this.products.splice(productIndex, 1, product)

    this.output.clear()

    new ListProducts(this.products, this.input, this.output).list()

    this.output.success('Produto atualizado com sucesso')
  }
}
