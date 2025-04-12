import { createContext, useContext } from "react";
import { useStore } from "react-redux";
import { useState } from "react";
export type GlobalContext = {
	authData: { login: boolean; password: boolean };
	setAuthData: React.Dispatch<
		React.SetStateAction<{ login: boolean; password: boolean }>
	>;
};
const GlobalContext = createContext<GlobalContext | null>(null);

export default function CotnextProvider({ children }: any) {
	const storeData = useStore().getState();
	const [authData, setAuthData] = useState({ login: false, password: false });
	// const [refs, setRefs] = useState();

	return (
		<>
			<GlobalContext.Provider value={{ authData, setAuthData }}>
				{children}
			</GlobalContext.Provider>
		</>
	);
}
export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
