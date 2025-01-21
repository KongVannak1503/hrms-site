import React, { useState } from 'react';
import ModalCenter from '../../components/modal/ModalCenter';

import AddForm from './AddForm';
import Form from './Form';
import RightSlideModal from '../../components/modal/ModalRight';
import CenterSlideModal from '../../components/modal/ModalCenter';
import LeftSlideModal from '../../components/modal/ModalLeft';

const TestModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRightModalOpen, setIsRightModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState(null); // Manage which form to show
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const openRightModal = (form) => {
        setActiveForm(form);
        setIsRightModalOpen(true);
    };
    const closeModal = () => {
        setIsRightModalOpen(false);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6 space-y-4">
            <button
                onClick={() => openRightModal('form')}
                className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Open Right Modal with Form
            </button>
            <CenterSlideModal isOpen={isRightModalOpen} onClose={closeModal} title="Add New">
                {activeForm === 'form' && <Form onClose={closeModal} />}
            </CenterSlideModal>
            {/* Modal Component */}
            <div className="relative inline-block text-left">
                {/* Dropdown Button */}
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Options
                    <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="py-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestModal;
