import React from 'react';

const CenterSlideModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] top-[-17px] bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title || 'Modal Title'}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                {/* Render dynamic content via children */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CenterSlideModal;
