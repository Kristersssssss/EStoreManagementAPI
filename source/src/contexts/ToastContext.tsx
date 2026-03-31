import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from '../hooks/use-toast';

interface ToastOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastContextType {
  addToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const addToast = (options: ToastOptions) => {
    const { type, title, message } = options;

    // Map type to appropriate styling
    const variant = type === 'error' ? 'destructive' : 'default';

    toast({
      title,
      description: message,
      variant,
    });
  };

  const value = {
    addToast,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};