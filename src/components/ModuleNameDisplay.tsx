import React from 'react'; // Zorg ervoor dat je React importeert
import { useModuleName } from '../contexts/ModuleNameContext'; // Pas het importpad aan indien nodig


const ModuleNameDisplay: React.FC = () => {
    const { moduleName } = useModuleName(); // Gebruik de contextwaarde direct

    return (
        <div>
            {moduleName ? <h2>De module naam is: {moduleName}</h2> : <p>Module naam niet gevonden.</p>}
        </div>
    );
};

export default ModuleNameDisplay;
