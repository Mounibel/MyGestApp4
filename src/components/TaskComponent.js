import React from 'react';

function TaskComponent({ task, members, onValidate, onAssignMember }) {
  return (
    <div>
      <h3>{task.title} {task.isCompleted && '✅'}</h3>
      <p>Description : {task.description}</p>
      <p>Durée : {task.duration}</p>
      <button onClick={onValidate} disabled={task.isCompleted}>{task.isCompleted ? 'Complétée' : 'Valider la tâche'}</button>
      <div>
        <label>Assigner un membre :</label>
        <select onChange={(e) => onAssignMember(task.id, e.target.value)}>
          <option value="">Sélectionnez un membre</option>
          {members.map((member, index) => (
            <option key={index} value={member}>{member}</option>
          ))}
        </select>
      </div>
      <div>Membres assignés :</div>
      {task.assignedMembers.map((member, index) => (
        <p key={index} style={{ color: task.isCompleted ? 'green' : 'red' }}>{member}</p>
      ))}
    </div>
  );
}

export default TaskComponent;
