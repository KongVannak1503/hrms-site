// hooks/useDeleteDepartment.js
import Swal from 'sweetalert2';

const useDeleteDepartment = (deleteApi, departments, setDepartments, setFilteredDepartments, search) => {
    const handleDeleteDepartment = async (departmentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Call custom delete API function (can be customized)
                    await deleteApi(departmentId);

                    // Update both departments and filteredDepartments after deletion
                    const updatedDepartments = departments.filter((dept) => dept._id !== departmentId);
                    setDepartments(updatedDepartments);

                    // Ensure filteredDepartments is updated based on the search query
                    const updatedFilteredDepartments = updatedDepartments.filter((dept) =>
                        dept.name.toLowerCase().includes(search.toLowerCase())
                    );
                    setFilteredDepartments(updatedFilteredDepartments);

                    Swal.fire("Deleted!", "Your department has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", "There was an error deleting the department.", "error");
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your department is safe :)", "error");
            }
        });
    };

    return { handleDeleteDepartment };
};

export default useDeleteDepartment;
