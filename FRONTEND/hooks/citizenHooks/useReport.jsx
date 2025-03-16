import { useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReport } from "../../redux/features/addReportSlice";
import { useToast } from 'react-native-toast-notifications'


const useReport = () => {
    const router = useRouter();
    const toast = useToast();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [accessibilityData, setAccessibilityData] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch()

    const handleSelectType = (type) => {
        setSelectedTypes((prevSelected) => {
            if (prevSelected.includes(type)) {
                return prevSelected.filter((item) => item !== type);
            } else {
                return [...prevSelected, type];
            }
        });
    };

    const handleSelectAccessibility = (title) => {
        setAccessibilityData((prevData) => {
            if (prevData.includes(title)) {
                return prevData.filter((item) => item !== title);
            } else {
                return [...prevData, title];
            }
        });
    };

    const handleAddInfoChange = (text) => {
        setAdditionalInfo(text);
    };

    const handlePhotoSelected = (photoUri) => {
        setPhoto(photoUri);
    };
    const handleLocationUpdate = (locationData) => {
        setLocation(locationData);
    };


    const handleSend = async () => {
        if (!location) {
            console.error("Location is required!");
            return;
        }

        const formData = new FormData();
        if (photo) {
            formData.append("image", {
                uri: photo,
                name: "report.jpg",
                type: "image/jpeg",
            });
        }

        formData.append("size", selectedSize);
        selectedTypes.filter(Boolean).forEach((type) => {
            formData.append("type[]", type);
        });
        accessibilityData.filter(Boolean).forEach((acc) => {
            formData.append("accessibility[]", acc);
        });
        formData.append("moreInfo", additionalInfo);
        formData.append("longitude", String(location.longitude));
        formData.append("latitude", String(location.latitude));

        try {
            const response = await dispatch(addReport(formData));
            if (response.payload.status === 200) {
                toast.show('report successufuly', { type: 'success', duration: 3000, placement: "top", });
                router.push('home');
            } else {
                toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
            }
        } catch (error) {
            console.error("Error sending report:", error);
        }
    };
    return {
        setSelectedSize,
        handleSelectType,
        handleSelectAccessibility,
        handleAddInfoChange,
        handlePhotoSelected,
        handleLocationUpdate,
        handleSend
    }
}

export default useReport;