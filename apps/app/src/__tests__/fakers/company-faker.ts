import { Company } from '../../core/entities'
import { faker } from '@faker-js/faker'

import { ProductsFaker } from './products-faker'
import { ServicesFaker } from './services-faker'
import { CustomersFaker } from './customers-faker'
import { PetsFaker } from './pets-faker'

export class CompanyFaker {
  static fake() {
    const company = new Company({
      products: ProductsFaker.fakeMany(20),
      services: ServicesFaker.fakeMany(10),
      customers: [],
    })

    const fakeCustomers = []

    for (let index = 0; index < 30; index++) {
      const fakeProducts = []
      for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
        const productIndex = faker.number.int({
          min: 0,
          max: company.products.length - 1,
        })
        fakeProducts.push(company.orderProductByIndex(productIndex))
      }

      const fakeServices = []
      for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
        const serviceIndex = faker.number.int({
          min: 0,
          max: company.services.length - 1,
        })
        fakeServices.push(company.orderServiceByIndex(serviceIndex))
      }

      const pet = PetsFaker.fake()

      const fakeCustomer = CustomersFaker.fake({
        consumedProducts: [],
        consumedServices: [],
        pets: [pet],
      })

      for (const product of fakeProducts) fakeCustomer.consumeProduct(product, pet)
      for (const service of fakeServices) fakeCustomer.consumeService(service, pet)

      fakeCustomers.push(fakeCustomer)
    }
    company.customers = fakeCustomers
    return company
  }
}
