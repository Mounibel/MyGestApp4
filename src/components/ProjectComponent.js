import React, { useState } from 'react';
import TaskComponent from './TaskComponent';
import MemberComponent from './MemberComponent';
import InitialScreen from './InitialScreen'; 

function ProjectComponent() {
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState({
    status: 'En Cours',
    tasks: [],
    members: []
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    duration: ''
  });

  if (projectName === '') {
    return <InitialScreen onStartProject={setProjectName} />;
  }

  const addMember = (memberName) => {
    setProject(prev => ({
      ...prev,
      members: [...prev.members, memberName]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (newTask.title && newTask.description && newTask.duration) {
      setProject(prev => ({
        ...prev,
        tasks: [...prev.tasks, {
          id: prev.tasks.length + 1,
          title: newTask.title,
          description: newTask.description,
          duration: newTask.duration,
          isCompleted: false,
          assignedMembers: []
        }],
        status: 'En Cours'  // Reset project status to In Progress when a new task is added
      }));
      setNewTask({ title: '', description: '', duration: '' }); // Reset input fields
    } else {
      alert('Veuillez remplir tous les champs pour ajouter une tâche.');
    }
  };

  const assignMemberToTask = (taskId, memberName) => {
    setProject(prev => {
      const tasks = prev.tasks.map(task => {
        if (task.id === taskId && !task.assignedMembers.includes(memberName)) {
          return { ...task, assignedMembers: [...task.assignedMembers, memberName] };
        }
        return task;
      });
      return { ...prev, tasks };
    });
  };

  const validateTask = (taskId) => {
    setProject(prev => {
      const tasks = prev.tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, isCompleted: true };
        }
        return task;
      });
      const allTasksCompleted = tasks.every(task => task.isCompleted);
      return { ...prev, tasks, status: allTasksCompleted ? 'Terminé' : 'En Cours' };
    });
  };

  return (
    <div>
      <h1>{projectName} - {project.status}</h1> 
      <div>
        <input name="title" value={newTask.title} onChange={handleInputChange} placeholder="Titre de la tâche" />
        <input name="description" value={newTask.description} onChange={handleInputChange} placeholder="Description de la tâche" />
        <input name="duration" value={newTask.duration} onChange={handleInputChange} placeholder="Durée (ex : 2h)" />
        <button onClick={addTask}>Ajouter la tâche</button>
      </div>
      <MemberComponent members={project.members} onAddMember={addMember} />
      {project.tasks.map(task => (
        <TaskComponent key={task.id} task={task} members={project.members} onValidate={() => validateTask(task.id)} onAssignMember={assignMemberToTask} />
      ))}
    </div>
  );
}

export default ProjectComponent;
