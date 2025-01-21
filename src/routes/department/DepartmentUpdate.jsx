import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { formStyles } from '../../components/field/FormElement';
import { getDepartmentByIdApi, updateDepartmentApi } from "../../components/api/department/department-api";

const DepartmentUpdate = ({ departmentId, onClose, onUpdateDepartment, setFlashMessage }) => {
    const [formData, setFormData] = useState({
        name: '',
        managerId: '',
        description: '',
        isActive: false, // Checkbox for active status
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the department data on component mount
    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const data = await getDepartmentByIdApi(departmentId);
                setFormData({
                    name: data.name || '',
                    managerId: data.managerId || '',
                    description: data.description || '',
                    isActive: data.isActive,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [departmentId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle select dropdown changes
    const handleManagerChange = (selectedOption) => {
        setFormData({ ...formData, managerId: selectedOption ? selectedOption.value : '' });
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, isActive: checked });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedDepartment = {
                name: formData.name,
                managerId: formData.managerId,
                description: formData.description,
                isActive: formData.isActive,
            };

            await updateDepartmentApi(departmentId, updatedDepartment);
            setFlashMessage('Record updated successfully!');
            onUpdateDepartment({ ...updatedDepartment, _id: departmentId }); // Pass the updated data back
            onClose(); // Close the modal after update
        } catch (err) {
            console.error('Error updating record:', err);
            setError('Failed to update record.');
        }
    };

    // Options for the manager dropdown
    const managerOptions = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className={formStyles.labelSm}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formStyles.input}
                    placeholder="Enter name"
                    required
                />
            </div>
            <div className="mb-4">
                <label className={formStyles.labelSm}>Manager</label>
                <Select
                    name="manager"
                    value={managerOptions.find((option) => option.value === Number(formData.managerId)) || null}
                    onChange={handleManagerChange}
                    options={managerOptions}
                    className={formStyles.select2} // Apply your custom styles
                    placeholder="Select a manager"
                />
            </div>
            <div className="mb-4">
                <label className={formStyles.labelSm}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={formStyles.textarea}
                    placeholder="Enter description"
                />
            </div>
            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className={formStyles.labelSm}>
                    Active
                </label>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default DepartmentUpdate;
