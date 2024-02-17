import React, { createContext, useState } from "react"

export const SurveyContext = createContext()

export const SurveyProvider = ({ children }) => {
    const [newSurveyTitle, setNewSurveyTitle] = useState("Select Survey")
    const [newSurveyKey, setNewSurveyKey] = useState(null)

    return (
        <SurveyContext.Provider value={{ newSurveyKey, setNewSurveyKey, newSurveyTitle, setNewSurveyTitle }}>
            {children}
        </SurveyContext.Provider>
    )
}
