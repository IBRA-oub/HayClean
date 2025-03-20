import { useState } from "react"

export function ValidateMunicipalityRegister() {
    const [fields, setFields] = useState({
        name: '',
        city: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const validateForm = (fields) => {
        setErrors({})
        let isFormValid = true

        const { name, city, phoneNumber, email, password } = fields

        if (name.trim() === "") {
            setErrors((prevState) => ({ ...prevState, name: "name required" }));
            isFormValid = false;
        }
        else if (name.length < 3) {
            setErrors((prevState) => ({ ...prevState, name: "name should contain more than 3 characters" }));
            isFormValid = false;
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) {
            setErrors((prevState) => ({ ...prevState, name: "Name must contain only letters and spaces" }));
            isFormValid = false;
        }

        if (phoneNumber.trim() === "") {
            setErrors((prevState) => ({ ...prevState, phoneNumber: "phone N° is required" }))
            isFormValid = false
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            setErrors((prevState) => ({ ...prevState, phoneNumber: "phone N° must be exactly 10 digits" }));
            isFormValid = false;
        }

        if (city.trim() === "") {
            setErrors((prevState) => ({ ...prevState, city: "City is required" }))
            isFormValid = false
        }

        if (email.trim() === "") {
            setErrors((prevState) => ({ ...prevState, email: "Email required" }));
            isFormValid = false;
        } else if (!email.match(/^\S+@\S+\.\S+$/)) {
            setErrors((prevState) => ({ ...prevState, email: "Email refused" }));
            isFormValid = false;
        }

        if (password.trim() === "") {
            setErrors((prevState) => ({ ...prevState, password: "Password required" }));
            isFormValid = false;
        }
        else if (password.length < 7) {
            setErrors((prevState) => ({ ...prevState, password: "Password should contain more than 7 characters" }));
            isFormValid = false;
        }
        return isFormValid
    }

    const resetForm = () => {
        setFields({
            name: '',
            city: '',
            phoneNumber: '',
            email: '',
            password: '',
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

