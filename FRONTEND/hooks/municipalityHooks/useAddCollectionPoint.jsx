import { useState } from "react";
import { ValidateAddCollPoint } from "../../utils/ValidateAddCollPoint";
import { useDispatch } from "react-redux";
import { useToast } from 'react-native-toast-notifications'
import { addCollectionPoint } from "../../redux/features/addCollectionPointSlice";


const useAddCollectionPoint = () => {
    const dispatch = useDispatch()
    const toast = useToast();
    const [form, setForm] = useState({
        longitude: '',
        latitude: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateAddCollPoint();

    // submit function
    const handleSubmit = async (onClose) => {
        if (validateForm(form)) {
            try {
                const response = await dispatch(addCollectionPoint(form))
                if (response.payload.status === 200) {
                    toast.show('Collection Point Added Successufuly', { type: 'success', duration: 3000, placement: "top", });
                } else {
                    toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
                }
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