import { randEmail, randFullName, randNumber, randAddress, randCompanyName, randUuid } from "@ngneat/falso";

// Create a Falso instance for efficient data generation
// const falso = new Falso();

export const getGridData = () => {
  const getGridData = [];

  for (let i = 1; i <= 30; i++) {
    getGridData.push({
      id: randUuid(), // Assuming a numeric ID field
      name: randFullName(),
      email: randEmail(),
      address: randAddress().zipCode,
      phone: randNumber(),
      company: randCompanyName(),
    });
  }
  return getGridData;
};
