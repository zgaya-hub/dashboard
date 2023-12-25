import { randEmail, randFullName, randNumber, randAddress, randCompanyName, randUuid } from "@ngneat/falso";

export const getGridData = () => {
  const getGridData = [];
  for (let i = 1; i <= 30; i++) {
    getGridData.push({
      id: randUuid(),
      name: randFullName(),
      email: randEmail(),
      address: randAddress().zipCode,
      phone: randNumber(),
      company: randCompanyName(),
    });
  }
  return getGridData;
};
