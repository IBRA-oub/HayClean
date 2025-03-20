import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mailVerificationCitizen } from "../redux/features/mailVerificationCitizenSlice";
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mailVerificationMunicipality } from "../redux/features/mailVerificationMunicipalitySlice";

const useValidateMail = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [code, setCode] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const toast = useToast();

    const handleChangeText = (text, index) => {
        if (text.length > 1) {
            text = text.charAt(0);
        }
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleSubmit = async () => {
        const role = await AsyncStorage.getItem('role')
        const enteredCode = code.join('');
        let response;
        if (role === 'Citizen') {
            response = await dispatch(mailVerificationCitizen(enteredCode))
            if (response.payload.status === 200) {
                toast.show('Email verified', { type: 'success', duration: 3000, placement: "top", });
                router.push('home')
            } else if (response.payload.status === 500) {
                toast.show('Invalid Verified Code', { type: 'danger', duration: 3000, placement: "top", });
            }
        } else if (role === 'Municipality') {
            response = await dispatch(mailVerificationMunicipality(enteredCode))
            if (response.payload.status === 200) {
                toast.show('Email verified', { type: 'success', duration: 3000, placement: "top", });
                router.push('muniHome')
            } else if (response.payload.status === 500) {
                toast.show('Invalid Verified Code', { type: 'danger', duration: 3000, placement: "top", });
            }
        }

    };

    return {
        handleChangeText,
        handleSubmit,
        code,
        inputs

    }
}

export default useValidateMail;