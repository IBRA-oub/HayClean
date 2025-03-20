
import { useState } from "react";
import { ValidateAddEvent } from "../../utils/ValidateAddEvent";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { editeEvent } from "../../redux/features/editeEventSlice";

const useEditeEvent = () => {
    const params = useLocalSearchParams();
    const item = params.item ? JSON.parse(params.item) : {};
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch()
    const itemId = item?._id
    const [form, setForm] = useState({
        image: item?.image,
        description: item?.description,
        location: item?.location,
        date: new Date(item?.date).toISOString().split('T')[0],
        time: item?.time,
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
            const response = await dispatch(editeEvent({ itemId, formData }));
            if (response.payload.status === 200) {
                toast.show('Edite successufuly', { type: 'success', duration: 3000, placement: "top", });
                router.push('muniInfo');
            } else {
                toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
            }
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

    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit,
        pickImage
    }
}

export default useEditeEvent;