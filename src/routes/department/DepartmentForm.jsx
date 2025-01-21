import { useState } from "react";
import Select from 'react-select';
import { formStyles } from "../../components/field/FormElement";
import { createDepartmentApi } from "../../components/api/department/department-api";
import { useNavigate } from "react-router-dom";

const DepartmentCreate = ({ onClose, onAddDepartment, setFlashMessage }) => {
    const [formData, setFormData] = useState({
        name: '',
        managerId: '',
        description: '',
        isActive: false,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle select change for manager
    const handleManagerChange = (selectedOption) => {
        setFormData({ ...formData, managerId: selectedOption ? selectedOption.value : '' });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, isActive: checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const departmentData = {
                name: formData.name,
                managerId: formData.managerId,
                description: formData.description,
                isActive: formData.isActive,
            };
            const result = await createDepartmentApi(departmentData);
            onAddDepartment(result.department);
            setFlashMessage("Record created successfully!");
        } catch (error) {
            setFlashMessage("Record created fails!");
            console.error('Error creating department:', error);
        }
    };

    const managerOptions = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' }
    ];

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
                    value={managerOptions.find(option => option.value === formData.managerId)}
                    onChange={handleManagerChange}
                    options={managerOptions}
                    className={formStyles.select2}  // Apply your custom styles
                    required
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

            {/* Checkbox for Active Status */}
            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className={formStyles.labelSm}>Active</label>
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
                    Submit
                </button>
            </div>
        </form>
    );
};

export default DepartmentCreate;
