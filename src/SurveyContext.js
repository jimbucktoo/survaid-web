import React, { createContext, useState } from "react";

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
    const [newSurveyKey, setNewSurveyKey] = useState(null);

    return (
        <SurveyContext.Provider value={{ newSurveyKey, setNewSurveyKey }}>
            {children}
        </SurveyContext.Provider>
    );
};
