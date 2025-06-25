import { Document } from './document'

export class Rg extends Document {
  get format() {
    if (this.value.length === 9) {
      const formattedRG = `${this.value.slice(0, 2)}.${this.value.slice(3, 6)}.${this.value.slice(6, 9)}-${this.value[8]}`
      return formattedRG
    }

    return this.value
  }
}
