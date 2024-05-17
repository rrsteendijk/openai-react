import React from 'react'; // Zorg ervoor dat je React importeert

const nav: React.FC = () => {
    // Specificeer het event type
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    return (
            <nav>
                <ul className="mainNav">
                    <li className="navItem">
                        <a href="#">
                            ARTIKELS
                        </a>
                    </li>
                    <li className="navItem">
                        <a href="#">
                            Contact
                        </a>
                    </li>
                    <li className="navItem">
                        <a href="#">
                            Blog
                        </a>
                    </li>
                </ul>
            </nav>
    );
};

export default nav;
