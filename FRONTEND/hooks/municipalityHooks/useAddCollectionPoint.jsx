import { useRouter } from "expo-router";
import { useState } from "react";
import { ValidateAddCollPoint } from "../../utils/ValidateAddCollPoint";

const useAddCollectionPoint = () => {
    const [form, setForm] = useState({
        longitude: '',
        latitude: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateAddCollPoint();

    // submit function
    const handleSubmit = async (longitude, latitude,onClose) => {
        if (validateForm(form)) {
            try {
                console.log(longitude, latitude)
                onClose();
            } catch (error) {
                console.error("Error during adding collection point:", error);
            } finally {
                resetForm();
                setForm({ longitude: "", latitude: "" });
            }
        }
    }

    return{
        form,
        setForm,
        getError,
        hasError,
        handleSubmit
    }
}

export default useAddCollectionPoint;