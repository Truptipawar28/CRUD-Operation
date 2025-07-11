// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', formData);
//       navigate('/login'); // Redirect to login after successful registration
//     } catch (err) {
//       console.log(err.response); // helpful for debugging
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
// <div className="container mt-5" style={{ maxWidth: '400px' }}>
//   <div className="card p-4 shadow">
//     <h3 className="mb-3 text-center">Register</h3>
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <input
//           name="username"
//           className="form-control"
//           placeholder="Username"
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <input
//           name="email"
//           type="email"
//           className="form-control"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <input
//           name="password"
//           type="password"
//           className="form-control"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-success w-100">Register</button>
//     </form>
//     {error && <div className="alert alert-danger mt-3">{error}</div>}
//     <p className="mt-3 text-center">
//       Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
//     </p>
//   </div>
// </div>

//   );
// }

// export default Register;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setLoading(false);
      showToast("Registration successful", "success");
      navigate('/login');
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
      showToast("Registration failed", "danger");
    }
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
        <div class="toast-body">${msg}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  return (
 <div className="design-container design1 active">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container" style={{ maxWidth: '400px' }}>        <div className="card p-4 shadow">
          <h3 className="mb-3 text-center">
            <i className="fas fa-user-plus me-2"></i>Register
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="username"
                className="form-control"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <i className="fas fa-check me-2"></i>
              )}
              Register
            </button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <p className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none">Login</Link>
          </p>
        </div>
      </div>

      {/* Toast container */}
      <div id="toasts" className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}></div>
    </div>
+    </div>
  );
}

export default Register;
