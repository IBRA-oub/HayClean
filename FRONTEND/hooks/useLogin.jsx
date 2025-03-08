import { useRouter } from "expo-router";
import { useState } from "react";
import { ValidateLogin } from "../utils/ValidateLogin";

const useLogin = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateLogin();

    // submit function
    const handleSubmit = async () => {
        if (validateForm(form)) {
            try {
                router.push('mailVerification')
            } catch (error) {
                console.error("Error during login:", error);
            } finally {
                resetForm();
                setForm({email: "", password: "" });
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

export default useLogin;