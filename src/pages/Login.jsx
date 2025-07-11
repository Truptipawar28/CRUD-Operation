// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password
//       });

//       // Save token
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
// <div className="container mt-5" style={{ maxWidth: '400px' }}>
//   <div className="card p-4 shadow">
//     <h3 className="mb-3 text-center">Login</h3>
//     <form onSubmit={handleLogin}>
//       <div className="mb-3">
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="btn btn-primary w-100">Login</button>
//     </form>
//     {error && <div className="alert alert-danger mt-3">{error}</div>}
//     <p className="mt-3 text-center">
//       Don’t have an account? <Link to="/" className="text-decoration-none">Register</Link>
//     </p>
//   </div>
// </div>

//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setLoading(false);
      showToast("Login successful", "success");
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      showToast("Login failed", "danger");
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
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <i className="fas fa-lock me-2"></i>
              )}
              Login
            </button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <p className="mt-3 text-center">
            Don’t have an account?{' '}
            <Link to="/" className="text-decoration-none">Register</Link>
          </p>
        </div>
      </div>

      {/* Toast container */}
      <div id="toasts" className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}></div>
 </div>
      </div>
 
  );
};

export default Login;
