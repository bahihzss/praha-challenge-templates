/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  getPrefectureNameByZipcode,
  getPrimeNumbers,
  haveHumanRight,
} from "./task_furuno";
import axios from "axios";
import { ZipcodeApiServiceImpl } from "./zipcodeApiService";

describe("haveHumanRight", () => {
  test("わいに人権はない", () => {
    expect(haveHumanRight(165, "MALE")).toBe(false);
  });

  test("女の子は大きくても小さくてもいいよね", () => {
    expect(haveHumanRight(140, "FEMALE")).toBe(true);
    expect(haveHumanRight(180, "FEMALE")).toBe(true);
  });

  test("やっぱり高身長イケメンしか勝たん", () => {
    expect(haveHumanRight(180, "MALE")).toBe(true);
  });

  test("思いっきり身長で差別しておきながら、ジェンダーには配慮してて草", () => {
    expect(haveHumanRight(165, "OTHER")).toBe(true);
  });
});

describe("getPrimeNumbers", () => {
  test("配列で指定した数列から素数を取得できる", () => {
    expect(getPrimeNumbers([1, 2, 3, 4, 5])).toEqual([2, 3, 5]);
  });

  test("空の配列を渡した場合にエラーが発生する", () => {
    expect(() => {
      getPrimeNumbers([]);
    }).toThrowError("numbers should not be empty");
  });
});

jest.mock("axios");

describe("getPrefectureNameByZipcode", () => {
  test("郵便番号から都道府県名を取得できる", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: [
          {
            address1: "東京都",
          },
        ],
      },
      status: 200,
    });

    const zipcloudApiService = new ZipcodeApiServiceImpl();
    const prefectureName = await getPrefectureNameByZipcode(
      1234567,
      zipcloudApiService
    );

    expect(prefectureName).toBe("東京都");
  });

  test("API がエラーを出した場合、Prefecture Not Foundを返す", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 500,
    });

    const zipcloudApiService = new ZipcodeApiServiceImpl();
    const prefectureName = await getPrefectureNameByZipcode(
      1234567,
      zipcloudApiService
    );

    expect(prefectureName).toBe("Prefecture Not Found");
  });

  test("郵便番号が見つからなかった場合にPrefecture Not Foundを返す", async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error("failed to get address")
    );

    const zipcloudApiService = new ZipcodeApiServiceImpl();
    const prefectureName = await getPrefectureNameByZipcode(
      1234567,
      zipcloudApiService
    );

    expect(prefectureName).toBe("Prefecture Not Found");
  });
});
