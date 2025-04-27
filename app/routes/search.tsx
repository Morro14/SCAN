import doc from "../media/documents.svg";
import folder from "../media/folders.svg";
import img1 from "../media/search-img.svg";
import SearchForm from "~/components/search/SearchForm";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
	console.log("inner error boundary");
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1 className="text-xl">
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div>
				<h1 className="text-2xl ">Ошибка</h1>
				<p>Что-то пошло не так</p>
				<p>{error.message}</p>
				{/* <p>The stack trace is:</p> */}
				{/* <pre>{error.stack}</pre> */}
			</div>
		);
	} else {
		return <h1>Unknown Error</h1>;
	}
}

export default function Search() {
	return (
		<div>
			<div className="md:static relative flex justify-between">
				<div>
					<div className="black md:text-[40px] text-[28px] md:leading-[46px] leading-tight md:mt-[69px] mt-[20px]">
						Найдите необходимые <br />
						данные в пару кликов.
					</div>
					<div className="md:text-xl text-lg mt-[25px] leading-tight">
						Задайте параметры поиска. <br />
						Чем больше заполните, тем <br className="md:hidden" />
						точнее поиск
					</div>
				</div>
				<div className="md:static absolute right-[0px] top-[122px] md:flex md:justify-between">
					<div className="md:w-[91px] w-[58px] h-[111px] md:mr-[166px] md:mt-[132px]">
						<img
							src={doc}
							alt="documents-img"
						/>
					</div>
					<div className="md:block hidden w-[141px] h-[68px] mr-[44px] mt-[150px]">
						<img
							src={folder}
							alt="folder-img"
						/>
					</div>
				</div>
			</div>

			<div className="md:flex md:justify-between md:mt-[47px] mt-[21px]">
				<div className="md:static relative left-[-15px] shadowed md:min-w-[872px] md:w-[872px] w-[375px] md:h-[543px] rounded-[10px] md:pl-[44px] pl-[14px]">
					<SearchForm></SearchForm>
				</div>
				<div className="overflow-x-visible h-full  mt-[24px] md:mt-[60px] ml-[14px] md:ml-[28px]">
					<img
						src={img1}
						alt="search-img"
						className="md:min-w-[443px] min-w-[379px]"
					/>
				</div>
			</div>
		</div>
	);
}
