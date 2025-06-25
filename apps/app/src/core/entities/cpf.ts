import { Document } from './document'

export class Cpf extends Document {
    get format() {
        if (this.value.length === 11) {
          const formattedRG = `${this.value.slice(0, 3)}.${this.value.slice(3, 6)}.${this.value.slice(6, 9)}-${this.value.slice(9)}`
          return formattedRG
        }
    
        return this.value
      }
}
