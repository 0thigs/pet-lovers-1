import { Product } from '../../core/entities'
import type { ProductProps } from '../../core/entities/product'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class ProductsFaker {
  static fake(props?: Partial<ProductProps>) {
    return new Product({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription().slice(0, 50),
      ordersCount: 0,
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<ProductProps>) {
    return Array.from({ length: count }).map(() => ProductsFaker.fake(props))
  }
}
