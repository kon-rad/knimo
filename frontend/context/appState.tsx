import React, { useContext, useEffect, useState, createContext } from "react";

const AppContext = createContext(undefined);

const AppStateProvider = ({ children }: any) => {
    const [authToken, setAuthToken] = useState<boolean>(false);

    const appState = {
        authToken,
        setAuthToken
    }
    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    )
}

const useAppState = () => {
    return useContext(AppContext);
}

export {
    useAppState,
    AppStateProvider
}