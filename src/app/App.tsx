import { useState } from 'react';
import { EmailSignature } from './components/email-signature';
import { NurtureEmail } from './components/nurture-email';
import { Toaster } from './components/ui/sonner';

type Tab = 'signatures' | 'nurture';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('signatures');

  const isNurture = activeTab === 'nurture';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top bar */}
      <div className="px-6 pt-6 pb-0">
        <div className={isNurture ? '' : 'max-w-7xl mx-auto'}>
          <div className="flex items-center gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Tools</h1>
              <p className="text-sm text-gray-500 mt-0.5">Signatures and templates for every brand</p>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 shadow-sm ml-auto">
              <button
                onClick={() => setActiveTab('signatures')}
                className={`py-2.5 px-5 text-sm font-semibold transition-all ${
                  activeTab === 'signatures'
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Email Signatures
              </button>
              <button
                onClick={() => setActiveTab('nurture')}
                className={`py-2.5 px-5 text-sm font-semibold transition-all ${
                  isNurture ? 'text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                style={isNurture ? { backgroundColor: '#29b9c5' } : {}}
              >
                Nurture me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className={isNurture ? 'px-6 pb-16' : 'max-w-7xl mx-auto px-6 pb-6'}>
        {activeTab === 'signatures' && <EmailSignature />}
        {isNurture && <NurtureEmail />}
      </div>

      <Toaster />
    </div>
  );
}
