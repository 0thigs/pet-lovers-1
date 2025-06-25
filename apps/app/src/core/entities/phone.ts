export class Phone {
  constructor(
    private _codeArea: string,
    private _number: string,
  ) {}

  public get value(): string {
    return `(${this._codeArea}) ${this._number}`
  }

  public get codeArea(): string {
    return this._codeArea
  }

  public set number(number: string) {
    this._number = number
  }

  public get number(): string {
    return this._number
  }
  public set codeArea(codeArea: string) {
    this._codeArea = codeArea
  }
}
