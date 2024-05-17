import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definieer het type voor de context waarde
type ModuleNameContextType = {
    moduleName: string | null;
    setModuleName: React.Dispatch<React.SetStateAction<string | null>>;
};

// Creëer de context met een initiële waarde of type
const ModuleNameContext = createContext<ModuleNameContextType | undefined>(undefined);

export const useModuleName = () => {
    const context = useContext(ModuleNameContext);
    if (context === undefined) {
        throw new Error('useModuleName must be used within a ModuleNameProvider');
    }
    return context;
};

export const ModuleNameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [moduleName, setModuleName] = useState<string | null>(localStorage.getItem('moduleName'));

    // Voorzie de waarde voor de provider
    const value = { moduleName, setModuleName };

    return (
        <ModuleNameContext.Provider value={value}>
            {children}
        </ModuleNameContext.Provider>
    );
};
