import { useState } from "react";

export function ValidateNews() {
    const [fields, setFields] = useState({
        image: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = (fields) => {
        setErrors({});
        let isFormValid = true;

        const { image, description } = fields;

        
        if (image.trim() === "") {
            setErrors((prevState) => ({ ...prevState, image: "image required" }));
            isFormValid = false;
        }

        if (description.trim() === "") {
            setErrors((prevState) => ({ ...prevState, description: "description required" }));
            isFormValid = false;
        } 

        return isFormValid;
    };

    const resetForm = () => {
        setFields({
            image: '',
            description: '',
        });
    };

    const getError = (fieldName) => errors[fieldName];

    const hasError = (fieldName) => getError(fieldName) !== undefined;

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    return {
        validateForm,
        resetForm,
        getError,
        hasError,
        fields,
        handleFieldChange,
    };
}
