import { useState } from "react";

export function ValidateAddCollPoint() {
    const [fields, setFields] = useState({
        longitude: '',
        latitude: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = (fields) => {
        setErrors({});
        let isFormValid = true;

        const { longitude, latitude } = fields;

        
        if (longitude.trim() === "") {
            setErrors((prevState) => ({ ...prevState, longitude: "Longitude required" }));
            isFormValid = false;
        } else if (!/^-?\d+(\.\d+)?$/.test(longitude)) {
            setErrors((prevState) => ({ ...prevState, longitude: "Longitude must be a valid number" }));
            isFormValid = false;
        }

        if (latitude.trim() === "") {
            setErrors((prevState) => ({ ...prevState, latitude: "Latitude required" }));
            isFormValid = false;
        } else if (!/^-?\d+(\.\d+)?$/.test(latitude)) {
            setErrors((prevState) => ({ ...prevState, latitude: "Latitude must be a valid number" }));
            isFormValid = false;
        }

        return isFormValid;
    };

    const resetForm = () => {
        setFields({
            longitude: '',
            latitude: '',
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
