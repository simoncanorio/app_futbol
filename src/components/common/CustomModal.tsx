import React from 'react';
import './CustomModal.css';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'confirm' | 'alert' | 'danger';
  onConfirm: () => void;
  onCancel?: () => void;
}

export function CustomModal({
  isOpen,
  title,
  message,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  type = 'confirm',
  onConfirm,
  onCancel
}: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal-card glass-panel modal-type-${type}`}>
        <div className="custom-modal-header">
          <h3>{title}</h3>
          {onCancel && (
            <button className="custom-modal-close-icon" onClick={onCancel}>
              ✕
            </button>
          )}
        </div>

        <div className="custom-modal-body">
          <p>{message}</p>
        </div>

        <div className="custom-modal-actions">
          {onCancel && (
            <button className="modal-btn-cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button
            className={`modal-btn-confirm ${type === 'danger' ? 'danger-btn' : 'primary-btn'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
