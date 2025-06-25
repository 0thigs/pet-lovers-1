export class Document {
  private _value: string
  private _issueDate: Date

  constructor(value: string, issueDate: string) {
    this._value = value
    this._issueDate = this.parseDateString(issueDate)
  }

  public get value(): string {
    return this._value
  }

  public set value(value: string) {
    this._value = value
  }

  public get issueDate(): string {
    const day = String(this._issueDate.getDate()).padStart(2, '0')
    const month = String(this._issueDate.getMonth() + 1).padStart(2, '0')
    const year = this._issueDate.getFullYear()

    return `${day}/${month}/${year}`
  }

  public set issueDate(issueDate: string) {
    this._issueDate = this.parseDateString(issueDate)
  }

  private parseDateString(dateString: string) {
    const dateParts = dateString.split('/')
    const year = Number(dateParts[2])
    const month = Number(dateParts[1])
    const day = Number(dateParts[0])
    return new Date(year, month - 1, day)
  }
}
