import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function AgentPayment() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    alert("✅ Payment Successful! Welcome to the Agent Portal.");
    navigate('/agent');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Header with Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Shield className="text-blue-500" size={40} />
          <span className="text-4xl font-bold tracking-tighter text-white">BetConnect</span>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-zinc-800">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6">
              <CreditCard className="text-blue-500" size={48} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Agent Subscription</h1>
            <p className="text-zinc-400 text-lg">
              Unlock full access and start earning with BetConnect
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-zinc-800 rounded-2xl p-8 mb-10">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-zinc-400 text-sm">Monthly Plan</p>
                <p className="text-6xl font-bold text-white mt-1">$49</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 text-sm font-medium">Billed monthly</p>
                <p className="text-zinc-500 text-xs">Cancel anytime</p>
              </div>
            </div>

            <ul className="space-y-5">
              {[
                "Access to all client leads",
                "Priority customer support",
                "Unlimited client management",
                "Real-time analytics dashboard",
                "Commission tracking system",
                "Marketing tools & materials"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-300">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={22} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pay Button */}
          <button
            onClick={handleSubscribe}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-5 rounded-2xl text-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30"
          >
            Subscribe Now - $49/month
            <ArrowRight size={26} />
          </button>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Secure payment powered by Stripe • 30-day money-back guarantee
          </p>
        </div>

        {/* Logout Option */}
        <div className="text-center mt-8">
          <button
            onClick={logout}
            className="text-zinc-500 hover:text-zinc-400 transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}