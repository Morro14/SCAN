export default function HeaderMobTab({ width }: { width: string }) {
	return (
		<div
			className="absolute flex justify-center h-[491px] transition-all duration-150 bg-viridian-500 md:hidden"
			style={{ width: width }}
		></div>
	);
}
