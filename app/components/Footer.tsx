import logo from "../media/footer-logo.svg";

export default function Footer() {
	return (
		<footer className="flex flex-row justify-between h-[143px] bg-viridian-500">
			<img
				src={logo}
				alt=""
				className="w-[141px] h-[141px] ml-[60px] mt-[2px]"
			/>
			<div className="mr-[45px] mt-[25px]">
				<div className="text-right text-sm text-white w-[200px]">
					г. Москва, Цветной б-р, 40
					<br />
					+7 495 771 21 11
					<br />
					info@skan.ru
				</div>
				<div className="text-xs text-white text-right mt-[21px]">
					Copyright. 2022
				</div>
			</div>
		</footer>
	);
}
