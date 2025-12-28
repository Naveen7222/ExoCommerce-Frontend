import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, message, type = 'info', onConfirm }) => {
    const overlayRef = useRef(null);

    // Scroll Lock and ESC key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        
        const handleEsc = (e) => {
            if (isOpen && e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset'; // Clean up scroll lock
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''}`}
            ref={overlayRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className={`modal-content modal-type-${type} animate-in`}>
                <div className="modal-title">
                    {/* Icons wrapped in spans for better alignment */}
                    <span className="modal-icon">
                        {type === 'error' && '⚠️'}
                        {type === 'warning' && '⚡'}
                        {type === 'success' && '✅'}
                        {type === 'confirm' && '❓'}
                    </span>
                    {title}
                </div>
                <div className="modal-message">{message}</div>
                <div className="modal-actions">
                    <button
                        className="modal-btn modal-btn-cancel"
                        onClick={onClose}
                    >
                        {type === 'confirm' ? 'Cancel' : 'Close'}
                    </button>

                    {type === 'confirm' && (
                        <button
                            className="modal-btn modal-btn-confirm"
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
                            }}
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;