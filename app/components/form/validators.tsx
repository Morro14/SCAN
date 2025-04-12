import validator from "validator";

export const loginValidator = {
	required: { value: true, message: "Введите коректные данные" },
	maxLength: { value: 15, message: "Введите коректные данные" },
	// validate: {
	// 	plus: (e: string) => plusCheck(e),
	// 	numbers: (e: string) => numCheck(e),
	// },
};

function plusCheck(s: string) {
	const errorMsg = "Некоректный номер";
	if (s.slice(0) !== "+") {
		return false;
	}
	return true || errorMsg;
}

function numCheck(s: string) {
	const errorMsg = "Некоректный номер";
	const isValid = validator.isNumeric(s.slice(1, s.length));

	return isValid || errorMsg;
}
