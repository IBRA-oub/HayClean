import { useEffect, useState } from "react";
import { ValidateAddCollPoint } from "../../utils/ValidateAddCollPoint";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { editeCollectionPoint } from "../../redux/features/editeCollectionPointSlice";
import { useRouter } from "expo-router";
import { allCollectionPointSelectors } from '../../redux/selectors/allCollectionPointSelectors';
import { deleteCollectionPoint } from "../../redux/features/deleteCollectionPointSlice";
import { allCollectionPoint } from "../../redux/features/allCollectionPointSlice";
import * as Clipboard from 'expo-clipboard';
import { Alert } from "react-native";


const useEditeCollectionPoint = (pointData) => {
    const dispatch = useDispatch()
    const toast = useToast();
    const itemId = pointData?._id
    const [form, setForm] = useState({
        longitude: pointData?.longitude || '',
        latitude: pointData?.latitude || '',
    });

    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateAddCollPoint();

    // submit function
    const handleSubmit = async (onClose) => {
        if (validateForm(form)) {
            try {
                const response = await dispatch(editeCollectionPoint({ itemId, form }))
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



    // ---------- 
    const router = useRouter();
    const [viewMode, setViewMode] = useState('list');
    const [modalVisible, setModalVisible] = useState(false);
    const [editeModalVisible, setEditeModalVisible] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null)
    useEffect(() => {
        dispatch(allCollectionPoint())
    }, [dispatch])

    const handlePress = (item) => {
        setSelectedPoint(item)
        setEditeModalVisible(true)
    }

    const handleDelete = async (itemId) => {
        const response = await dispatch(deleteCollectionPoint(itemId))
        if (response.payload.status === 200) {
            toast.show('Collection Point Deleted Successufuly', { type: 'success', duration: 3000, placement: "top", });
        } else {
            toast.show(`${response.payload.message}`, { type: 'warning', duration: 3000, placement: "top", });
        }
    };

    const data = useSelector(allCollectionPointSelectors)

    // ----------------

    const [selectedCoords, setSelectedCoords] = useState(null);
    const initialRegion = {
        latitude: data?.[0]?.latitude ? parseFloat(data[0].latitude) : 0,
        longitude: data?.[0]?.longitude ? parseFloat(data[0].longitude) : 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedCoords({ latitude, longitude });
    };

    const copyToClipboard = async (type) => {
        if (selectedCoords) {
            const value = type === 'latitude' ? selectedCoords.latitude : selectedCoords.longitude;
            await Clipboard.setStringAsync(value.toString());
            Alert.alert("copy !", `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`);
        }
    };

    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit,
        router,
        viewMode,
        setViewMode,
        modalVisible,
        setModalVisible,
        setEditeModalVisible,
        editeModalVisible,
        selectedPoint,
        handlePress,
        handleDelete,
        data,
        selectedCoords,
        initialRegion,
        handleMapPress,
        copyToClipboard,
        setSelectedCoords
    }
}

export default useEditeCollectionPoint;