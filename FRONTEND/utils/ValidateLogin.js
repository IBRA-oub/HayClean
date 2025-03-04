import { useState } from "react"

export function ValidateLogin() {
    const [fields, setFields] = useState({
       
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const validateForm = (fields) => {
        setErrors({})
        let isFormValid = true

        const {email, password } = fields

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

