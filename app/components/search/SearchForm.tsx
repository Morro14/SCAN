import { FormProvider, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { limitValidator, loginValidator } from "../form/validators";
import { Form, useNavigate } from "react-router";
import SearchSelect from "./SearchSelect";
import SearchDates from "./SearchDates";
import Checkbox from "./SearchCheckbox";
import { innValidator } from "../form/validators";
import { useGlobalContext } from "../ContextProvider";
import type { HistogramsRequestParams } from "~/entities/entities";
import getHistograms from "~/requests/histograms";
import { useAppDispatch } from "~/redux/hooks";
import { setSearchRes } from "~/redux/searchResultsSlice";
import Button from "../util/Buttons";
import { useEffect, useState } from "react";

export default function SearchForm() {
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const methods = useForm();
	let btnOpacity = "opacity-50";
	let handleSubmit = () => {};
	const context = useGlobalContext();
	const nav = useNavigate();

	if (
		context?.searchInputs &&
		!Object.values(context?.searchInputs).includes(false)
	) {
		btnOpacity = "opacity-100";
		handleSubmit = () => {
			context.setValidatingForm({
				inn: true,
				limit: true,
				dateStart: true,
				dateEnd: true,
			});
			const submit = methods.handleSubmit(async (formData) => {
				setLoading(true);

				const data: HistogramsRequestParams = {
					intervalType: "month",
					histogramTypes: ["totalDocuments", "riskFactors"],

					similarMode: "none",
					limit: formData.limit,
					sortType: "issueDate",
					sortDirectionType: "desc",
					tonality: formData.tonality,
					onlyMainRole: formData["3"],
					onlyWithRiskFactors: formData["4"],
					attributeFilters: {
						excludeTechNews: formData["5"],
						excludeAnnouncements: formData["6"],
						excludeDigests: formData["7"],
					},

					issueDateInterval: {
						startDate: formData.dateStart,
						endDate: formData.dateEnd,
					},
					searchContext: {
						targetSearchEntitiesContext: {
							targetSearchEntities: [
								{
									type: "company",
									isBuisnessNews: formData["2"],
									sparkId: null,
									entityId: null,
									inn: formData.inn,
									maxFulness: formData["1"],
								},
							],
						},
					},
				};

				const response = await getHistograms(data);
				if (response.status === 200) {
					sessionStorage.setItem(
						"histograms",
						JSON.stringify(response.data.data)
					);
					sessionStorage.setItem("searchRequestData", JSON.stringify(data));
					dispatch(
						setSearchRes({ histograms: response.data.data, searchParams: data })
					);

					nav("/results");
				} else {
					setLoading(false);
					throw new Error("Не удалось получить данные");
				}
			});
			submit();
		};
	}
	return (
		<div className="h-full">
			<FormProvider {...methods}>
				<Form
					className="h-full"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="md:flex flex-row pt-[21px] h-full">
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
									selectOpt={[
										{ label: "Любая", value: "any" },
										{
											label: "Позитивная",
											value: "negative",
										},
										{
											label: "Негативная",
											value: "positive",
										},
									]}
								></SearchSelect>
							</div>
							<div>
								<SearchInput
									name="limit"
									label="Количество документов в выдаче"
									placeholder="От 1 до 1000"
									validation={limitValidator}
								></SearchInput>
							</div>
							<div>
								<SearchDates></SearchDates>
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
									<div className={btnOpacity}>
										<Button
											onClickFunc={handleSubmit}
											loadingState={loading}
											text="Поиск"
										></Button>
									</div>
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
