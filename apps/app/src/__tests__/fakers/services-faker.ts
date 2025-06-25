import { Service } from '../../core/entities'
import type { ServiceProps } from '../../core/entities/service'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class ServicesFaker {
  static fake(props?: Partial<ServiceProps>) {
    return new Service({
      name: faker.company.name(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription().slice(0, 50),
      ordersCount: 0,
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<ServiceProps>) {
    return Array.from({ length: count }).map(() => ServicesFaker.fake(props))
  }
}
