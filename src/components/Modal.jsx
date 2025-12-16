import React from 'react';
import '../styles/Modal.css';

export function Modal({ isOpen, onClose, title, children, showCloseButton = true }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    {showCloseButton && (
                        <button className="modal-close-button" onClick={onClose}>
                            &times;
                        </button>
                    )}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}
