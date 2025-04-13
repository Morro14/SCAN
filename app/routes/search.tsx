import { Outlet } from "react-router";
import doc from "../media/documents.svg";
import folder from "../media/folders.svg";
import img1 from "../media/search-img.svg";
import SearchForm from "~/components/search/SearchForm";

export default function Search() {
	return (
		<div>
			<div className="flex justify-between">
				<div>
					<div className="black text-[40px] leading-[46px] mt-[69px]">
						Найдите необходимые <br />
						данные в пару кликов.
					</div>
					<div className="text-xl mt-[25px]">
						Задайте параметры поиска. <br />
						Чем больше заполните, тем точнее поиск
					</div>
				</div>
				<div className="flex justify-between">
					<div className="w-[91px] h-[111px] mr-[166px] mt-[132px]">
						<img
							src={doc}
							alt="documents-img"
						/>
					</div>
					<div className="w-[141px] h-[68px] mr-[44px] mt-[150px]">
						<img
							src={folder}
							alt="folder-img"
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-between mt-[47px]">
				<div className="shadowed min-w-[872px] w-[872px] h-[543px] rounded-[10px] pl-[44px]">
					<SearchForm></SearchForm>
				</div>
				<div className="overflow-clip">
					<div className="relative top-[66px] right-[-80px] min-w-[443px]">
						<img
							src={img1}
							alt="search-img"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
