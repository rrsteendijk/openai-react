import React, { createContext, useContext } from 'react';

// Definieer de context
const CourseDataContext = createContext(null);

// Provider component die de context waarde definieert
export const CourseDataProvider = ({ children }) => {
    const staticCourseData = {
        Path: "",
        CourseTemplateId: 123,  // Voorbeeld ID
        SemesterId: null,
        StartDate: null,
        EndDate: null,
        LocaleId: null,
        ForceLocale: false,
        ShowAddressBook: true,
        Description: { Text: "Dit is een voorbeeld cursus." },
        CanSelfRegister: false
    };

    return (
        <CourseDataContext.Provider value={staticCourseData}>
            {children}
        </CourseDataContext.Provider>
    );
};

// Hook om context te gebruiken in andere componenten
export const useCourseData = () => useContext(CourseDataContext);
