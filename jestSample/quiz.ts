export const getFuture = (): Date => {
  const additionalTime = Math.floor(Math.random() * 1000);

  return new Date(new Date().getDate() + additionalTime);
};

export const sleep = (timeout: number): Promise<void> => {
  return new Promise((resolve): number => setTimeout(resolve, timeout));
};

export const getFutureAsync = async (): Promise<Date> => {
  const additionalTime = Math.floor(Math.random() * 1000);
  await sleep(additionalTime);

  return new Date();
};
