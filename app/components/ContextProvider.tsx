import { createContext, useContext } from "react";
import { useState } from "react";

export type GlobalContext = {
	authData: { username: boolean; password: boolean };
	setAuthData: React.Dispatch<
		React.SetStateAction<{ username: boolean; password: boolean }>
	>;
	searchInputs: {
		inn: boolean;
		limit: boolean;
		dateStart: boolean;
		dateEnd: boolean;
	};
	setSearchInputs: React.Dispatch<
		React.SetStateAction<{
			inn: boolean;
			limit: boolean;
			dateStart: boolean;
			dateEnd: boolean;
		}>
	>;
	validatingForm: {
		inn: boolean;
		limit: boolean;
		dateStart: boolean;
		dateEnd: boolean;
	};
	setValidatingForm: React.Dispatch<
		React.SetStateAction<{
			inn: boolean;
			limit: boolean;
			dateStart: boolean;
			dateEnd: boolean;
		}>
	>;
};

const GlobalContext = createContext<GlobalContext | null>(null);

export default function CotnextProvider({ children }: any) {
	// control inputs in SigninForm
	const [authData, setAuthData] = useState({
		username: false,
		password: false,
	});
	// control inputs in SearchForm
	const [searchInputs, setSearchInputs] = useState({
		inn: false,
		limit: false,
		dateStart: false,
		dateEnd: false,
	});
	// for controlling style of elements when validating
	const [validatingForm, setValidatingForm] = useState({
		inn: true,
		limit: true,
		dateStart: true,
		dateEnd: true,
	});
	return (
		<>
			<GlobalContext.Provider
				value={{
					authData,
					setAuthData,
					searchInputs,
					setSearchInputs,
					validatingForm,
					setValidatingForm,
				}}
			>
				{children}
			</GlobalContext.Provider>
		</>
	);
}
export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
