// src/api/department-api.jsx
import { API_URL } from '../main/main-api'; // Import the API base URL

// Function to create a new department
export const createDepartmentApi = async (departmentData) => {
    try {
        const response = await fetch(`${API_URL}department`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

// Function to get all departments
export const getDepartmentsApi = async () => {
    try {
        const response = await fetch(`${API_URL}department`, {
            method: 'GET',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};
// Function to get a department by ID
export const getDepartmentByIdApi = async (id) => {
    try {
        const response = await fetch(`${API_URL}department/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error fetching department with ID: ${id}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching department with ID ${id}:`, error);
        throw error;
    }
};

// Function to update a department
export const updateDepartmentApi = async (id, departmentData) => {
    try {
        const response = await fetch(`${API_URL}department/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
};

// Function to delete a department
export const deleteDepartmentApi = async (id) => {
    try {
        const response = await fetch(`${API_URL}department/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
};
