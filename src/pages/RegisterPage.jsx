import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleType, setRoleType] = useState('user');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const fakeUser = {
        id: 'demo-' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        role: roleType === 'agent' ? 'agent' : 'user'
      };

      const fakeToken = 'demo-jwt-token-' + Date.now();

      login(fakeToken, fakeUser);

      if (fakeUser.role === 'agent') navigate('/agent');
      else navigate('/user');

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join as User or Agent</p>

        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
          <button
            onClick={() => setRoleType('user')}
            className={`flex-1 py-3 rounded-xl font-medium transition ${
              roleType === 'user' ? 'bg-white shadow' : 'text-gray-500'
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRoleType('agent')}
            className={`flex-1 py-3 rounded-xl font-medium transition ${
              roleType === 'agent' ? 'bg-white shadow' : 'text-gray-500'
            }`}
          >
            Agent
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}