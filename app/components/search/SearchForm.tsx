import { FormProvider, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { dateValidator, loginValidator } from "../form/validators";
import { Form } from "react-router";
import SearchSelect from "./SearchSelect";
import SearchDates from "./SearchDates";
import Checkbox from "./SearchCheckbox";
import { innValidator } from "../form/validators";
import { useGlobalContext } from "../ContextProvider";
import { useEffect, useState } from "react";

export default function SearchForm() {
	const methods = useForm();
	let btnOpacity = " opacity-50";
	let handleSubmit = () => {};

	const context = useGlobalContext();

	if (context) {
		if (!Object.values(context.searchData).includes(false)) {
			btnOpacity = " opacity-100";
			handleSubmit = methods.handleSubmit((formData) => {
				console.log(formData);
			});
		}
	}

	return (
		<div className="h-full">
			<FormProvider {...methods}>
				<Form
					className="h-full"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="flex flex-row pt-[21px] h-full">
						<div className="">
							<div>
								<SearchInput
									name="inn"
									label="ИНН компании"
									placeholder="10 цифр"
									validation={innValidator}
								></SearchInput>
							</div>
							<div>
								<SearchSelect
									name="tonality"
									label="Тональность"
									selectOpt={["123", "321"]}
								></SearchSelect>
							</div>
							<div>
								<SearchInput
									name="limit"
									label="Количество документов в выдаче"
									placeholder="От 1 до 1000"
									validation={loginValidator}
								></SearchInput>
							</div>
							<div>
								<SearchDates validation={dateValidator}></SearchDates>
							</div>
						</div>
						<div className="flex flex-col justify-between w-full pr-[39px]">
							<div>
								<Checkbox
									name="1"
									label="Признак максимальной полноты"
								></Checkbox>
								<Checkbox
									name="2"
									label="Упоминания в бизнес-контексте"
								></Checkbox>
								<Checkbox
									name="3"
									label="Главная роль в публикации"
								></Checkbox>
								<Checkbox
									name="4"
									label="Публикации только с риск-факторами"
								></Checkbox>
								<Checkbox
									name="5"
									label="Включать технические новости рынков"
								></Checkbox>
								<Checkbox
									name="6"
									label="Включать анонсы и календари"
								></Checkbox>
								<Checkbox
									name="7"
									label="Включать сводки новостей"
								></Checkbox>
							</div>
							<div className="flex flex-row justify-end mb-[37px]">
								<div className="">
									<button
										className={
											"btn w-[305px] h-[59px] bg-blue-501 text-white font-medium text-[22px] rounded-[5px]" +
											btnOpacity
										}
										onClick={handleSubmit}
									>
										Поиск
									</button>
									<div className="text-[14px] text-[#949494] mt-[8px] ">
										* Обязательные к заполнению поля
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</FormProvider>
		</div>
	);
}
