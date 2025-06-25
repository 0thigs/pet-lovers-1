import type { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'

export class ListProducts extends List {
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public list(): void {
    if (!this.products.length) {
      this.output.error('Nenhum produto encontrado')
      return
    }

    this.output.table(
      this.products.map((product) => ({
        ID: product.id,
        Nome: product.name,
        Preco: product.price,
        Descrição: product.description,
        'Qtd. de vezes que esse produto foi consumido': product.ordersCount,
      })),
    )
  }
}
