// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getTasks, createTask, deleteTask, updateTask } from '../services/api';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [newTitle, setNewTitle] = useState('');
//   const [newDesc, setNewDesc] = useState('');
//   const [loading, setLoading] = useState(true);
// const [editingTaskId, setEditingTaskId] = useState(null);
// const [editTitle, setEditTitle] = useState('');
// const [editDesc, setEditDesc] = useState('');


//   const navigate = useNavigate();

// useEffect(() => {
//   const token = localStorage.getItem('token');
//   const userInfo = localStorage.getItem('user');

//   console.log('[DEBUG] token:', token);
//   console.log('[DEBUG] userInfo:', userInfo);

//   if (!token || !userInfo) {
//     console.log('[DEBUG] No auth token or user info → Redirecting to login');
//     navigate('/login');
//   } else {
//     try {
//       const parsedUser = JSON.parse(userInfo);
//       setUser(parsedUser);
//       console.log('[DEBUG] Authenticated user:', parsedUser);
//       loadTasks();
//     } catch (err) {
//       console.error('[DEBUG] Failed to parse user info:', err);
//       navigate('/login');
//     }
//   }

//   setLoading(false); // ✅ done loading regardless
// }, [navigate]);


//   const loadTasks = async () => {
//     try {
//       const res = await getTasks();
//       setTasks(res.data);
//       console.log('[DEBUG] Tasks loaded:', res.data);
//     } catch (err) {
//       console.error('[DEBUG] Failed to fetch tasks:', err);
//     }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!newTitle.trim()) return;
//     try {
//       await createTask({ title: newTitle, description: newDesc });
//       setNewTitle('');
//       setNewDesc('');
//       loadTasks();
//     } catch (err) {
//       console.error('[DEBUG] Failed to create task:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id);
//       setTasks(tasks.filter(t => t.id !== id));
//     } catch (err) {
//       console.error('[DEBUG] Failed to delete task:', err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

// const startEdit = (task) => {
//   setEditingTaskId(task.id);
//   setEditTitle(task.title);
//   setEditDesc(task.description || '');
// };

// const saveEdit = async (taskId) => {
//   try {
//     await updateTask(taskId, {
//       title: editTitle,
//       description: editDesc,
//     });
//     setEditingTaskId(null);
//     loadTasks();
//   } catch (err) {
//     console.error('[DEBUG] Failed to update task:', err);
//   }
// };

// const cancelEdit = () => {
//   setEditingTaskId(null);
//   setEditTitle('');
//   setEditDesc('');
// };



//    if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

// return (
//   <div className="container mt-5">
//     <div className="card shadow p-4">
//       {/* Header & Logout */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3 className="mb-0">Dashboard</h3>
//         {user && (
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Welcome */}
//       {user && (
//         <p className="text-muted mb-4">
//           Welcome, <strong>{user.username}</strong> ({user.email})
//         </p>
//       )}

//       {/* Add Task */}
//       <form onSubmit={handleAdd} className="mb-4">
//         <div className="row g-2">
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Task title"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-5">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Task description"
//               value={newDesc}
//               onChange={(e) => setNewDesc(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <button type="submit" className="btn btn-primary w-100">Add Task</button>
//           </div>
//         </div>
//       </form>

//       {/* Task List */}
//       <ul className="list-group">
//         {tasks.length === 0 && (
//           <li className="list-group-item text-muted text-center">No tasks yet.</li>
//         )}
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
//           >
//             {editingTaskId === task.id ? (
//               <div className="w-100">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={editTitle}
//                   onChange={(e) => setEditTitle(e.target.value)}
//                   placeholder="Edit title"
//                 />
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={editDesc}
//                   onChange={(e) => setEditDesc(e.target.value)}
//                   placeholder="Edit description"
//                 />
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-sm btn-success" onClick={() => saveEdit(task.id)}>Save</button>
//                   <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancel</button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div>
//                   <strong>{task.title}</strong>
//                   {task.description && `: ${task.description}`}
//                 </div>
//                 <div className="d-flex gap-2 mt-2 mt-md-0">
//                   <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(task)}>Edit</button>
//                   <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task.id)}>Delete</button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );
// }

// export default Dashboard;

// Assuming Bootstrap & Font Awesome are already included in index.html

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask, updateTask } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) return navigate('/login');
    try {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
      loadTasks();
    } catch {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setFormLoading(true);
    try {
      await createTask({ title: newTitle, description: newDesc });
      setNewTitle('');
      setNewDesc('');
      loadTasks();
      showToast("Task added", "success");
    } catch {
      showToast("Failed to add task", "danger");
    }
    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      showToast("Task deleted", "warning");
    } catch {
      showToast("Failed to delete", "danger");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || '');
  };

  const saveEdit = async (taskId) => {
    try {
      await updateTask(taskId, {
        title: editTitle,
        description: editDesc,
      });
      setEditingTaskId(null);
      loadTasks();
      showToast("Task updated", "success");
    } catch {
      showToast("Update failed", "danger");
    }
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDesc('');
  };

  const showToast = (msg, type = 'info') => {
    const toastContainer = document.getElementById("toasts");
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.style.marginBottom = '10px';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
<div className="design-container design1 active">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container">        
  <div className="card p-4 shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0"><i className="fas fa-tasks me-2"></i>Dashboard</h3>
            {user && <button className="btn btn-outline-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i></button>}
          </div>

          {user && <p className="text-muted mb-4">Welcome, <strong>{user.username}</strong> ({user.email})</p>}

          <form onSubmit={handleAdd} className="mb-4">
            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Task title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
              </div>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary w-100" disabled={formLoading}>
                  {formLoading ? <span className="spinner-border spinner-border-sm"></span> : <i className="fas fa-plus me-2"></i>}
                  Add Task
                </button>
              </div>
            </div>
          </form>

          <ul className="list-group">
            {tasks.length === 0 && <li className="list-group-item text-muted text-center">No tasks yet.</li>}
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
                {editingTaskId === task.id ? (
                  <div className="w-100">
                    <input type="text" className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Edit title" />
                    <input type="text" className="form-control mb-2" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Edit description" />
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success" onClick={() => saveEdit(task.id)}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <strong>{task.title}</strong>{task.description && `: ${task.description}`}
                    </div>
                    <div className="d-flex gap-2 mt-2 mt-md-0">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(task)}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(task.id)}><i className="fas fa-trash"></i></button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="toasts" className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}></div>
 </div>
      </div>
  );
};

export default Dashboard;
