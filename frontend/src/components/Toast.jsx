import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import './Toast.css';

export const Toast = () => {
  const { toast, showToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-content">
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
      <button 
        className="toast-close"
        onClick={() => showToast(null)}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
