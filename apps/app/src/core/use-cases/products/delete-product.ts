import type { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Delete } from '../delete'
import { ListProducts } from '../listing'

export class DeleteProduct extends Delete {
  private isRunning = true
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public async delete(): Promise<void> {
    this.output.clear()
    const productsList = new ListProducts(this.products, this.input, this.output)
    productsList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do produto: ')

      const product = this.products.find((product) => product.id === id)

      if (!product) {
        this.output.error('Produto não encontrado')
        continue
      }

      await this.deleteProduct(product)
      this.isRunning = false
    }
  }

  public async deleteProduct(product: Product): Promise<void> {
    const productIndex = this.products.findIndex((currentProduct) =>
      currentProduct.isEqualTo(product),
    )
    this.products.splice(productIndex, 1)

    this.output.clear()

    new ListProducts(this.products, this.input, this.output).list()

    this.output.success('Produto deletado com sucesso')
  }
}
