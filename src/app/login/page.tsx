'use client';
import { AuthProvider } from '@/lib/auth';
import LoginPage from '@/components/client/login-page';

export default function Login() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
