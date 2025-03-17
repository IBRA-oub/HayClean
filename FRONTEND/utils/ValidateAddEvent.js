import { useState } from "react"

export function ValidateAddEvent() {
    const [fields, setFields] = useState({

        image: '',
        description: '',
        location: '',
        date: '',
        time: '',
    })

    const [errors, setErrors] = useState({})

    const validateForm = (fields) => {
        setErrors({})
        let isFormValid = true

        const { image, description, location, date, time } = fields

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i;

        if (image.trim() === "") {
            setErrors((prevState) => ({ ...prevState, image: "image required" }));
            isFormValid = false;
        }

        if (description.trim() === "") {
            setErrors((prevState) => ({ ...prevState, description: "description required" }));
            isFormValid = false;
        }
        if (location.trim() === "") {
            setErrors((prevState) => ({ ...prevState, location: "location required" }));
            isFormValid = false;
        }
        if (date.trim() === "") {
            setErrors((prevState) => ({ ...prevState, date: "date required" }));
            isFormValid = false;
        }else if (!dateRegex.test(date)) {
            setErrors((prevState) => ({ ...prevState, date: "invalid date format (YYYY-MM-DD)" }));
            isFormValid = false;
        }

        if (time.trim() === "") {
            setErrors((prevState) => ({ ...prevState, time: "time required" }));
            isFormValid = false;
        }else {
            const cleanedTime = time.replace(/\s+/g, ' ').trim(); 
            if (!timeRegex.test(cleanedTime)) {
                setErrors((prevState) => ({ ...prevState, time: "Invalid time format (HH:MM AM/PM)" }));
                isFormValid = false;
            }
        }

        return isFormValid
    }

    const resetForm = () => {
        setFields({
            image: '',
            description: '',
            location: '',
            date: '',
            time: '',
        })
    }

    const getError = (fieldName) => errors[fieldName]

    const hasError = (fieldName) => getError(fieldName) !== undefined

    const handleFieldChange = (fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }))
    }

    return {
        validateForm,
        resetForm,
        getError,
        hasError,
        fields,
        handleFieldChange,
    }
}

