import { ZipcodeApiService } from "./zipcodeApiService";

export const haveHumanRight = (
  height: number,
  gender: "MALE" | "FEMALE" | "OTHER"
): boolean => !(gender === "MALE" && height < 170);

export const getPrimeNumbers = (numbers: number[]): number[] => {
  if (numbers.length === 0) {
    throw new Error("numbers should not be empty");
  }

  const primeNumbers = [];
  for (const number of numbers) {
    if (number === 2) {
      primeNumbers.push(number);
    }
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        break;
      }
      if (i === number - 1) {
        primeNumbers.push(number);
      }
    }
  }
  return primeNumbers;
};

export const getPrefectureNameByZipcode = async (
  zipcode: number,
  zipcloudApiService: ZipcodeApiService
): Promise<string> => {
  try {
    const address = await zipcloudApiService.getAddressByZipCode(zipcode);
    return address.results[0].address1;
  } catch (error) {
    return "Prefecture Not Found";
  }
};
