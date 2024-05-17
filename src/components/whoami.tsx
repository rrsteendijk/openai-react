import React from 'react';

const WhoAmIButton: React.FC = () => {
  const handleWhoAmIClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/whoami'); // Pas dit aan naar je eigen server URL
      const data = await response.text(); // Gebruik .json() als je JSON verwacht
      console.log(data);
    } catch (error) {
      console.error('Error bij het uitvoeren van whoami call:', error);
    }
  };

  return (
    <button onClick={handleWhoAmIClick}>Wie ben ik?</button>
  );
};

export default WhoAmIButton;
