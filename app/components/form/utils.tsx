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

export function datesValid(date1: string, date2: string) {
  const date1F = new Date(date1);
  const date2F = new Date(date2);
  const dateNow = new Date(Date.now());
  console.log(date1F, date2F, dateNow, date2F >= dateNow);
  if (date1F >= date2F || date2F >= dateNow) {
    return false;
  }
  return true;
}
