import { EmailSignature } from './components/email-signature';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Email Signature Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create a professional email signature in seconds
          </p>
        </div>
        <EmailSignature />
      </div>
      <Toaster />
    </div>
  );
}