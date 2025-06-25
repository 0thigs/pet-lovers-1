import { Cpf, Customer } from '../../core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import type { CustomerProps } from '../../core/entities/customer'
import { PhonesFaker } from './phones-faker'
import { RgsFaker } from './rgs-faker'

export class CustomersFaker {
  static fake(props?: Partial<CustomerProps>) {
    return new Customer({
      name: faker.person.firstName(),
      socialName: faker.person.lastName(),
      cpf: new Cpf(
        faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
        dayjs(faker.date.past()).format('DD/MM/YYYY'),
      ),
      phones: PhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 })),
      rgs: RgsFaker.fakeMany(1),
      pets: [],
      consumedProducts: [],
      consumedServices: [],
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<CustomerProps>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fake(props))
  }
}
