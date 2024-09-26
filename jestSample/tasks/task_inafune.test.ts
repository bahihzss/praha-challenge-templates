import {
  ApiService,
  bubbleSort,
  fetchUserName,
  numberFormat,
} from "./task_inafune";
import axios from "axios";

describe("numberFormat", (): void => {
  test("正の数を渡すとカンマ区切りの文字列が返ってくる", (): void => {
    const actual = numberFormat(1000);
    expect(actual).toBe("1,000");
  });

  test("負の数を渡すとカンマ区切りの文字列が返ってくる", (): void => {
    const actual = numberFormat(-1000);
    expect(actual).toBe("-1,000");
  });

  test("小数を渡すとカンマ区切りの文字列が返ってくる", (): void => {
    const actual = numberFormat(1000.01);
    expect(actual).toBe("1,000.01");
  });

  test("16 進数の数値を渡すと、10 進数でカンマ区切りの文字列が返ってくる", (): void => {
    const actual = numberFormat(0xffff);
    expect(actual).toBe("65,535");
  });
});

describe("bubbleSort", (): void => {
  test("数値の配列を昇順に並べ替えます", (): void => {
    const arr = [10, 3, 6, 2, 8, 1, 4, 7, 5, 9];

    const sortedArr = bubbleSort(arr);

    expect(sortedArr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

jest.mock("axios");
describe("ApiService.fetchUserName", (): void => {
  test("API から取得したユーザー名を返す", async (): Promise<void> => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        name: "John Doe",
      },
    });

    const apiService = new ApiService();
    const userName = await apiService.fetchUserName(1);
    expect(userName).toBe("John Doe");
  });

  test("API へのリクエストが失敗すると例外を投げる", async (): Promise<
    void
  > => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Request failed"));

    const apiService = new ApiService();
    await expect(apiService.fetchUserName(1)).rejects.toThrow(
      "Failed to fetch user."
    );
  });
});

describe("fetchUserName", (): void => {
  test("API から取得したユーザー名を返す", async (): Promise<void> => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        name: "John Doe",
      },
    });

    const apiService = new ApiService();
    const userName = await fetchUserName(1, apiService);
    expect(userName).toBe("John Doe");
  });

  test.skip("API へのリクエストが失敗すると空の文字列を返す", async (): Promise<
    void
  > => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Request failed"));

    const apiService = new ApiService();
    const userName = await fetchUserName(1, apiService);
    expect(userName).toBe("");
  });
});
