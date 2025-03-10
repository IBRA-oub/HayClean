
import { useState } from "react";
import { ValidateAddEvent } from "../../utils/ValidateAddEvent";

const useEditeEvent = () => {
    const [form, setForm] = useState({
        image: '',
        description: '',
        location: '',
        date: '',
        time: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateAddEvent();

    // submit function
    const handleSubmit = async () => {
        if (validateForm(form)) {
            try {
                console.log(form)
            } catch (error) {
                console.error("Error during login:", error);
            } finally {
                resetForm();
                setForm({
                    image: '',
                    description: '',
                    location: '',
                    date: '',
                    time: '',
                });
            }
        }
    }

    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit
    }
}

export default useEditeEvent;