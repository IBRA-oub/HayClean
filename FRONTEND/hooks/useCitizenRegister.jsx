import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearCities, fetchCities } from '../redux/features/citySlice';
import { CitiesSelectors } from '../redux/selectors/citySelector';
import { ValidateCitizenRegister } from '../utils/ValidateCitizenRegister';

const useCitizenRegister = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cities = useSelector(CitiesSelectors);
    const [isFocused, setIsFocused] = useState(false);
    
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        city: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [query, setQuery] = useState('');
    const cityList = cities?.cities || [];

    useEffect(() => {
        if (query.length > 2) {
            dispatch(fetchCities(query));
        } else {
            dispatch(clearCities());
        }
    }, [query]);

    // Validation
    const { validateForm, getError, hasError, resetForm } = ValidateCitizenRegister();

    // Submit function
    const handleSubmit = async () => {
        if (validateForm(form)) {
            try {
                router.push('mailVerification');
            } catch (error) {
                console.error("Error during login:", error);
            } finally {
                resetForm();
                setForm({ firstName: "", lastName: "", city: "", phoneNumber: "", email: "", password: "" });
            }
        }
    };

    return {
        form,
        setForm,
        query,
        setQuery,
        cityList,
        isFocused,
        setIsFocused,
        hasError,
        getError,
        handleSubmit,
        dispatch
    };
};

export default useCitizenRegister;
