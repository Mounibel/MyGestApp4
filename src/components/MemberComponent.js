import React, { useState } from 'react';

function MemberComponent({ members, onAddMember }) {
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    onAddMember(memberName);
    setMemberName('');
  };

  return (
    <div>
      <h2>Membres</h2>
      <input value={memberName} onChange={e => setMemberName(e.target.value)} placeholder="Entrez le nom du membre" />
      <button onClick={handleAddMember}>Ajouter un membre</button>
      {members.map((member, index) => (
        <p key={index}>{member}</p>
      ))}
    </div>
  );
}

export default MemberComponent;
