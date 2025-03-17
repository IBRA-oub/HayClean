import { useRouter } from "expo-router";
import { useState } from "react";
import { ValidateNews } from "../../utils/ValidateNews";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { addNews } from "../../redux/features/addNewsSlice";
const useAddNews = () => {
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        image: '',
        description: '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateNews();

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
    const handleSubmit = async (image, description, onClose) => {
        if (!validateForm(form)) {
            console.log("Form validation failed!");
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
        try {
            const response = await dispatch(addNews(formData));
            if (response.payload.status === 200) {
                toast.show('report successufuly', { type: 'success', duration: 3000, placement: "top", });
                onClose();
            } else {
                toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
            }

        } catch (error) {
            console.error("Error during adding collection point:", error);
        } finally {
            resetForm();
            setForm({ image: "", description: "" });
        }

    }

    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit,
        pickImage
    }
}

export default useAddNews;