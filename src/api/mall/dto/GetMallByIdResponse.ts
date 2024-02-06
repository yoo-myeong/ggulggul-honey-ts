import { Exclude, Expose } from 'class-transformer';

export class GetMallByIdResponse {
  @Exclude() private _address: string;
  @Exclude() private _phone: string;

  static of(params: { address: string; phone: string }) {
    const inst = new GetMallByIdResponse();
    inst._address = params.address;
    inst._phone = params.phone;

    return inst;
  }

  @Expose()
  get phone(): string {
    return this._phone;
  }

  @Expose()
  get address(): string {
    return this._address;
  }
}
