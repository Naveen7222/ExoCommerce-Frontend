import React, { createContext, useContext, useState, useCallback } from 'react';
import Modal from '../components/common/Modal';

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info', // info, success, warning, error, confirm
        onConfirm: null
    });

    const showModal = useCallback(({ title, message, type = 'info', onConfirm }) => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            type,
            onConfirm
        });
    }, []);

    const hideModal = useCallback(() => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={hideModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                onConfirm={modalConfig.onConfirm}
            />
        </ModalContext.Provider>
    );
};
