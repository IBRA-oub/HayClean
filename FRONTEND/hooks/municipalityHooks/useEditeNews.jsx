import { useRouter } from "expo-router";
import { useState } from "react";
import { ValidateNews } from "../../utils/ValidateNews";

const useEditeNews = () => {
    const [form, setForm] = useState({
        image: '',
        description: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateNews();

    // submit function
    const handleSubmit = async (image, description,onClose) => {
        if (validateForm(form)) {
            try {
                console.log(image, description)
                onClose();
            } catch (error) {
                console.error("Error during adding collection point:", error);
            } finally {
                resetForm();
                setForm({ image: "", description: "" });
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

export default useEditeNews;