import type { FieldErrors } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export function findErrors(errors: FieldErrors<FieldValues>, name: string) {
	let filtered = Object.keys(errors).filter((key) => key.includes(name));
	const reduced = filtered.reduce(
		(cur, key) => {
			return Object.assign(cur, {
				error: errors[key] ? errors[key]["message"] : "",
			});
		},
		{ error: undefined }
	);

	return reduced;
}

export function isFormInvalid(err: FieldErrors<FieldValues>) {
	if (Object.keys(err).length > 0) {
		return true;
	}
	return false;
}
