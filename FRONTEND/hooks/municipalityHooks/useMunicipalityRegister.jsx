import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ValidateMunicipalityRegister } from "../../utils/ValidateMunicipalityRegister";
import { useDispatch, useSelector } from "react-redux";
import { CitiesSelectors } from "../../redux/selectors/citySelector";
import { clearCities, fetchCities } from "../../redux/features/citySlice";
import { useToast } from 'react-native-toast-notifications'
import { registerMunicipality } from "../../redux/features/registerMunicipalitySlice";

const useMunicipalityRegister = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const cities = useSelector(CitiesSelectors);
    const [isFocused, setIsFocused] = useState(false);
    const toast = useToast();

    const [form, setForm] = useState({
        name: '',
        city: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const [query, setQuery] = useState('');
    const cityList = cities?.cities || [];

    useEffect(() => {
        if (query.length > 2) {
            dispatch(fetchCities(query));
        } else {
            dispatch(clearCities());
        }
    }, [query]);
    // validation
    const { validateForm, getError, hasError, resetForm } = ValidateMunicipalityRegister(form);

    // submit function
    const handleSubmit = async () => {
        if (validateForm(form)) {
            try {
                const response = await dispatch(registerMunicipality(form))
                if (response.payload.status === 200) {
                    toast.show('Register succefuly', { type: 'success', duration: 3000, placement: "top", });
                    router.push('mailVerification');
                } else {
                    toast.show('Email should be unique', { type: 'danger', duration: 3000, placement: "top", });
                }
            } catch (error) {
                console.error("Error during login:", error);
            } finally {
                resetForm();
                setForm({ name: "", city: "", phoneNumber: "", email: "", password: "" });
            }
        }
    }

    return {
        form,
        setForm,
        getError,
        hasError,
        handleSubmit,
        query,
        setQuery,
        cityList,
        isFocused,
        setIsFocused,
        dispatch
    }
}

export default useMunicipalityRegister;