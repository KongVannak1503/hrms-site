import { useState, useEffect } from "react";
import { Search, PenSquare, Trash } from "lucide-react";
import { deleteDepartmentApi, getDepartmentsApi } from "../../components/api/department/department-api";
import CenterSlideModal from "../../components/modal/ModalCenter";
import DepartmentCreate from "./DepartmentForm";
import Pagination from "../../components/field/Pagination";
import { tableStyles } from "../../components/field/TableElement";
import useDeleteDepartment from "../../components/api/main/SweetAlertDelete";
import { Helmet } from 'react-helmet';
import Breadcrumbs from "../../utils/Breakcrum";
import DepartmentUpdate from "./DepartmentUpdate";
import { useNavigate } from "react-router-dom";

const Department = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeForm, setActiveForm] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [flashMessage, setFlashMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const result = await getDepartmentsApi();
                setDepartments(result);
                setFilteredDepartments(result); // Initially set filteredDepartments as all departments
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        const filtered = departments.filter((dept) =>
            dept.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredDepartments(filtered);
        setCurrentPage(1); // Reset to first page after search
    };

    // Handle pagination: change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get departments to display for the current page
    const indexOfLastDepartment = currentPage * itemsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
    const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment);

    // Open modal for adding new department
    const openRightModal = (form, departmentId) => {
        setActiveForm(form);

        // If the form is update, set the department ID for the update modal
        if (form === "formUpdate") {
            setSelectedDepartmentId(departmentId);
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle adding new department to the list
    const handleAddDepartment = async (newDepartmentData) => {
        try {
            // Add the new department to the department list
            setDepartments((prevDepartments) => [...prevDepartments, newDepartmentData]);
            setFilteredDepartments((prevDepartments) => [...prevDepartments, newDepartmentData]);

            setIsModalOpen(false); // Close modal after adding department
        } catch (error) {
            console.error("Error adding department:", error);
        }
    };


    const { handleDeleteDepartment } = useDeleteDepartment(deleteDepartmentApi, departments, setDepartments, setFilteredDepartments, search);

    const breadcrumbItems = [
        { label: 'Home', link: '/' }, // Link to home page
        { label: 'Department', link: '/department' } // Link to the department page
    ];

    const showToastMessage = (message) => {
        setFlashMessage(message);
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleUpdateDepartment = (updatedDepartment) => {
        const updatedList = departments.map((dept) =>
            dept._id === updatedDepartment._id ? { ...dept, ...updatedDepartment } : dept
        );
        setDepartments(updatedList);
        setFilteredDepartments(updatedList);
        setShowToast(true);
    };

    return (
        <div>
            <Helmet>
                <title>Department</title>
            </Helmet>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="mt-6">
                <h1 className="mb-3">Department</h1>
                {/* Other content */}
            </div>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    {flashMessage}
                </div>
            )}

            <div className="flex mb-5">
                <div className="input">
                    <Search size={20} className="text-slate-300" />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
                <button
                    onClick={() => openRightModal("form")}
                    className="py-2 mx-3 px-4 rounded bg-yellow-500 hover:bg-yellow-400"
                >
                    Add New
                </button>
            </div>
            <div className="card">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className={tableStyles.thBBorder}>#</th>
                            <th className={tableStyles.thBBorder}>Name</th>
                            <th className={tableStyles.thBBorder}>Manager</th>
                            <th className={tableStyles.thBBorder}>Status</th>
                            <th className={tableStyles.thBBorderCenter}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartments.map((value, key) => (
                            <tr key={value._id}> {/* Ensure unique key is provided */}
                                <td className={tableStyles.tdBBorder}>
                                    {indexOfFirstDepartment + key + 1}
                                </td>
                                <td className={tableStyles.tdBBorder}>{value.name}</td>
                                <td className={tableStyles.tdBBorder}>{value.managerId}</td>
                                <td className={tableStyles.tdBBorder}>
                                    {value.isActive ? (
                                        <span className="inline-flex items-center px-4 py-1 text-xs font-semibold text-black bg-blue-100 rounded-full">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-4 py-1 text-xs font-semibold text-black bg-yellow-100 rounded-full">
                                            Inactive
                                        </span>
                                    )}
                                </td>
                                <td className={tableStyles.tdBBorderCenter}>
                                    <button
                                        onClick={() => openRightModal("formUpdate", value._id)}
                                        className="text-blue-500 hover:bg-gray-200 shadow rounded-full p-2 dark:text-blue-600 mr-2">
                                        <PenSquare size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDepartment(value._id)}
                                        className="text-red-500 hover:bg-gray-200 shadow rounded-full p-2 dark:text-blue-600 mr-2">
                                        <Trash size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredDepartments.length}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Modal for adding new department */}
            <CenterSlideModal isOpen={isModalOpen} onClose={closeModal} title="Add New Department">
                {activeForm === "form" && (
                    <DepartmentCreate
                        onClose={closeModal}
                        onAddDepartment={handleAddDepartment}
                        setFlashMessage={showToastMessage}
                    />
                )}

                {activeForm === "formUpdate" && selectedDepartmentId && (
                    <DepartmentUpdate
                        departmentId={selectedDepartmentId}
                        onClose={closeModal}
                        onUpdateDepartment={handleUpdateDepartment}
                        setFlashMessage={showToastMessage}
                    />
                )}
            </CenterSlideModal>
        </div>
    );
};

export default Department;
