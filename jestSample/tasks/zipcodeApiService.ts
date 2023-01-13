import axios, { AxiosResponse } from "axios";

export type AddressResponse = {
  message: null;
  results: [
    {
      address1: string;
      address2: string;
      address3: string;
      kana1: string;
      kana2: string;
      kana3: string;
      prefcode: string;
      zipcode: string;
    }
  ];
  status: 200 | 400 | 500;
};

export interface ZipcodeApiService {
  getAddressByZipCode(zipcode: number): Promise<AddressResponse>;
}

export class ZipcodeApiServiceImpl implements ZipcodeApiService {
  public constructor() {}

  public async getAddressByZipCode(zipcode: number): Promise<AddressResponse> {
    const { data: address, status } = await axios.get<any, AxiosResponse<AddressResponse>>(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
    );
    if (status !== 200) {
      throw new Error("failed to get address");
    }
    return address;
  }
}