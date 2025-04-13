import validator from "validator";

export const loginValidator = {
	required: { value: true, message: "Введите коректные данные" },
	maxLength: { value: 15, message: "Введите коректные данные" },
	// validate: {
	// 	plus: (e: string) => plusCheck(e),
	// 	numbers: (e: string) => numCheck(e),
	// },
};

export const innValidator = {
	required: { value: true, message: "Введите коректные данные" },
	validate: {
		numbers: (e: string) => numCheck(e),
	},
};
export const limitValidator = {
	required: { value: true, message: "Введите коректные данные" },
	maxLength: { value: 4, message: "Максимум 1000" },
	validate: {
		numbers: (e: string) => numCheck(e),
	},
};
export const dateValidator = {
	required: { value: true, message: "Введите коректные данные" },
	maxLength: { value: 10, message: "Введите коректные данные" },
	validate: {
		date: (e: string) => validateDate(e),
	},
};
function validateDate(value: string) {
	const isValid = validator.isDate(value, {
		format: "DD-MM-YYYY",
		strictMode: true,
	});
	const errorMsg = "Введите коректные данные";
	return isValid || errorMsg;
}

function numCheck(s: string) {
	const errorMsg = "Некоректный номер";
	const isValid = validator.isNumeric(s.slice(1, s.length));

	return isValid || errorMsg;
}
