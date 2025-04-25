import validator from "validator";

export const loginValidator = {
  required: { value: true, message: "Введите коректные данные" },
  maxLength: { value: 15, message: "Введите коректные данные" },
};

export const innValidator = {
  required: { value: true, message: "Введите коректные данные" },
  validate: {
    numbers: (e: string) => validateInn(e),
  },
};
export const limitValidator = {
  required: { value: true, message: "Введите коректные данные" },
  maxLength: { value: 4, message: "Введите коректные данные" },
  validate: {
    numbers: (e: string) => {
      const errorMsg = "Введите коректные данные";
      const isValid = validator.isNumeric(e);
      const number = Number(e);
      return (number <= 1000 && isValid) || errorMsg;
    },
  },
};

export const dateStartValidator = {
  required: { value: true, message: "Введите коректные данные" },
  maxLength: { value: 10, message: "Введите коректные данные" },
  validate: {
    date: (e: string, { dateEnd }: { dateEnd: string }) =>
      validateStartDate(e, dateEnd),
  },
};
export const dateEndValidator = {
  required: { value: true, message: "Введите коректные данные" },
  maxLength: { value: 10, message: "Введите коректные данные" },
  validate: {
    date: (e: string) => validateEndDate(e),
  },
};
function validateStartDate(dateString: string, dateEndString: string) {
  // compare date start and date end
  const isValid = validator.isDate(dateString, {
    format: "YYYY-MM-DD",
    strictMode: true,
  });
  const dateNow = new Date(Date.now());
  const date = new Date(dateString);
  const compairedDate = new Date(dateEndString);
  const errorMsg = "Введите коректные данные";
  return (date < compairedDate && date < dateNow && isValid) || errorMsg;
}

function validateEndDate(dateString: string) {
  const isValid = validator.isDate(dateString, {
    format: "YYYY-MM-DD",
    strictMode: true,
  });
  const dateNow = new Date(Date.now());
  const date = new Date(dateString);

  const errorMsg = "Введите коректные данные";
  return (date < dateNow && isValid) || errorMsg;
}

function validateInn(inn: string) {
  // inn validation
  const errorMsg = "Некоректный номер!!";
  const isNumeric = validator.isNumeric(inn);
  const isValid = () => {
    // inn length 10
    if (inn.length === 10) {
      const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
      const weightedSum1 = weights
        .map((e, i) => e * Number(inn[i]))
        .reduce((p, c) => p + c, 0);
      const modulo = weightedSum1 % 11;
      const controlNum1 = modulo > 9 ? modulo % 10 : modulo;

      if (controlNum1 === Number(inn.slice(-1))) {
        return true;
      }
      return false;
      // inn length 12
    } else if (inn.length === 12) {
      const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
      const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

      const weightedSum1 = weights1
        .map((e, i) => e * Number(inn[i]))
        .reduce((p, c) => p + c, 0);
      const modulo1 = weightedSum1 % 11;
      const controlNum1 = modulo1 > 9 ? modulo1 % 10 : modulo1;

      const weightedSum2 = weights2
        .map((e, i) => e * Number(inn[i]))
        .reduce((p, c) => p + c, 0);
      const modulo2 = weightedSum2 % 11;
      const controlNum2 = modulo2 > 9 ? modulo2 % 10 : modulo2;

      if (
        controlNum1 === Number(inn.slice(-2, -1)) &&
        controlNum2 === Number(inn.slice(-1))
      ) {
        return true;
      }
      return false;
    }
  };
  const validINN = isValid();

  return (isNumeric && validINN) || errorMsg;
}
