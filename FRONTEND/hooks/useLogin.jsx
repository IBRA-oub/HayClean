import { useRouter } from "expo-router";
import { useState } from "react";
import { ValidateLogin } from "../utils/ValidateLogin";
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from "react-redux";
import { login } from "../redux/features/loginSlice";

const useLogin = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const toast = useToast();
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
                const response = await dispatch(login(form))
                if (response.payload.status === 200) {
                    toast.show('Login succefuly', { type: 'success', duration: 3000, placement: "top", });
                    router.push('mailVerification');
                    // router.push('home');
                } else {
                    toast.show('user not found', { type: 'danger', duration: 3000, placement: "top", });
                }
            } catch (error) {
                console.error("Error during login:", error);
            } finally {
                resetForm();
                setForm({ email: "", password: "" });
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

export default useLogin;