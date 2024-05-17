import React, { useState } from 'react';

const CourseForm = () => {
    const [name, setName] = useState(''); // Beheert de invoer voor de cursusnaam
    const [code, setCode] = useState(''); // Beheert de invoer voor de cursuscode

    const handleCreateCourse = async () => {
        const fullCourseData = {
            Name: name,
            Code: code,
            Path: "",
            CourseTemplateId: 8111,
            SemesterId: 7007,
            StartDate: null,
            EndDate: null,
            LocaleId: null,
            ForceLocale: true,
            ShowAddressBook: false,
            Description: {"Content": "DIT IS EEN TEST", "Type": "Text"},
            CanSelfRegister: false
        };

        try {
            const response = await fetch('/api/createcourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Hier moet je wellicht de Authorization header toevoegen, afhankelijk van je auth setup
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
                },
                body: JSON.stringify(fullCourseData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log("Course created successfully:", data);
                // Voer hier acties uit op basis van de response, bijvoorbeeld gebruikersfeedback geven of de UI updaten
            }
        } catch (error) {
            console.error("Failed to create course:", error);
            // Behandel fouten hier, bijvoorbeeld door foutmeldingen aan de gebruiker te tonen
        }
    };

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Cursusnaam" />
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Cursuscode" />
            <button onClick={handleCreateCourse}>Maak Cursus</button>
        </div>
    );
};

export default CourseForm;