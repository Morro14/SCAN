import { FormProvider, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { loginValidator } from "../form/validators";
import { Form } from "react-router";
import { useGlobalContext } from "../ContextProvider";
import SearchSelect from "./SearchSelect";

export default function SearchForm() {
	const methods = useForm();
	return (
		<div>
			<FormProvider {...methods}>
				<Form>
					<div>
						<div>
							<SearchInput
								name="company_id"
								label="ИНН компании"
								placeholder="10 цифр"
								validation={loginValidator}
							></SearchInput>
						</div>
						<div>
							<SearchSelect
								name="tonality"
								label="ИНН компании"
								selectOpt={["123", "321"]}
							></SearchSelect>
						</div>
						<div>
							<SearchInput
								name="documents_count"
								label="ИНН компании"
								placeholder="10 цифр"
								validation={loginValidator}
							></SearchInput>
						</div>
						<div>
							<SearchInput
								name="search_range"
								label="ИНН компании"
								placeholder="10 цифр"
								validation={loginValidator}
							></SearchInput>
						</div>
					</div>
					<div></div>
				</Form>
			</FormProvider>
		</div>
	);
}
