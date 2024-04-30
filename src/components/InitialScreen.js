import React, { useState } from 'react';

function InitialScreen({ onStartProject }) {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = () => {
    if (projectName.trim() === '') {
      alert('Le nom du projet ne peut pas être vide.');
      return;
    }
    onStartProject(projectName.trim());
  };

  return (
    <div>
      <h1>Créer un nouveau projet</h1>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Entrez le nom du projet"
      />
      <button onClick={handleSubmit}>Démarrer le projet</button>
    </div>
  );
}

export default InitialScreen;
