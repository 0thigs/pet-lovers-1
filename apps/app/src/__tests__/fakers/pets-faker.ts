import { Pet } from '@/core/entities'
import type { PetProps } from '@/core/entities/pet'
import { PetType } from '@/core/enums'
import { faker } from '@faker-js/faker'

const breeds = [faker.animal.dog(), faker.animal.cat(), faker.animal.bird()]

export class PetsFaker {
  static fake(props?: Partial<PetProps>) {
    return new Pet({
      name: faker.animal.dog(),
      type: faker.helpers.arrayElement([
        PetType.CACHORRO,
        PetType.GATO,
        PetType.PASSARO,
        PetType.ROEDOR,
        PetType.REPTIL,
        PetType.PEIXE,
      ]),
      breed: faker.helpers.arrayElement(breeds),
      gender: faker.helpers.arrayElement(['macho', 'fêmea']),
      ...props,
    })
  }
}
