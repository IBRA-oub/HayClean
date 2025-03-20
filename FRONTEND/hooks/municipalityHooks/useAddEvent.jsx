
import { useState } from "react";
import { ValidateAddEvent } from "../../utils/ValidateAddEvent";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { addEvent } from "../../redux/features/addEventSlice";
import { useDispatch } from "react-redux";
const useAddEvent = () => {
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        image: '',
        description: '',
        location: '',
        date: '',
        time: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateAddEvent();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access gallery is required, enable from setting!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, image: result.assets[0].uri });
        }
    };

    // submit function
    const handleSubmit = async () => {
        if (!validateForm(form)) {
            return;
        }
        const formData = new FormData();

        if (form.image) {
            formData.append("image", {
                uri: form.image,
                name: "report.jpg",
                type: "image/jpeg",
            });
        }
        formData.append("description", form.description);
        formData.append("location", form.location);
        formData.append("date", form.date);
        formData.append("time", form.time);

        try {
            const response = await dispatch(addEvent(formData));
            if (response.payload.status === 200) {
                toast.show('report successufuly', { type: 'success', duration: 3000, placement: "top", });
                router.push('muniInfo');
            } else {
                toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
            }
        } catch (error) {
            console.error("Error during submit:", error);
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
    };


    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit,
        pickImage,
    }
}

export default useAddEvent;