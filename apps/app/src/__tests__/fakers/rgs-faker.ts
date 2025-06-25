import { Phone, Rg } from '../../core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export class RgsFaker {
  static fake() {
    return new Rg(
      faker.number.int({ min: 100000000, max: 999999999 }).toString(),
      dayjs(faker.date.past()).format('DD/MM/YYYY'),
    )
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => RgsFaker.fake())
  }
}
