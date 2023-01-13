/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getFuture, getFutureAsync, sleep } from "./quiz";

describe("Quiz", () => {
  const now = new Date();

  beforeEach(() => {
    jest.useFakeTimers("modern").setSystemTime(now);
  });

  describe("getFuture", () => {
    const randomSpy = jest.spyOn(Math, "random");

    test("Math.random が 1 を返すと 1 秒後の Date が取得できる", () => {
      randomSpy.mockReturnValueOnce(1);

      expect(getFuture()).toEqual(new Date(now.getTime() + 1000));
    });

    test("Math.random が 0.5 を返すと 0.5 秒後の Date が取得できる", () => {
      randomSpy.mockReturnValueOnce(0.5);

      expect(getFuture()).toEqual(new Date(now.getTime() + 500));
    });
  });

  describe("sleep", () => {
    test("指定した timeout ミリ秒経過したら解決する", () => {
      const promise = sleep(1000);

      jest.advanceTimersByTime(1000);
      return expect(promise).resolves.toEqual(undefined);
    });
  });

  describe("getFutureAsync", () => {
    const randomSpy = jest.spyOn(Math, "random");

    test("ランダムな時間が経過した後にその時点の Date を返す", () => {
      randomSpy.mockReturnValueOnce(0.5);

      const promise = getFutureAsync();

      jest.advanceTimersByTime(500);
      return expect(promise).resolves.toEqual(new Date());
    });
  });
});
