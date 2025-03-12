import { allEvents } from '../../redux/features/allEventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allEventsSelectors } from '../../redux/selectors/allEventsSelectors'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { participation } from '../../redux/features/participationSlice';
import { useToast } from 'react-native-toast-notifications'
const useAllEvents = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const toast = useToast();
    const [role, setRole] = useState('')

    useEffect(() => {
        dispatch(allEvents())
    }, [dispatch])

    const allEventsData = useSelector(allEventsSelectors) || []
    const updateData = Array.isArray(allEventsData) && allEventsData.length > 0 ?
        allEventsData.map(report => ({
            ...report,
            image: report?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
        : null;


    const getRole = async () => {
        const resposne = await AsyncStorage.getItem('role')
        setRole(resposne)
    }
    useEffect(() => {
        getRole()
    }, [])

    const hadleParticipation = async (id) => {
        const response = await dispatch(participation(id))
        if (response.payload.status === 200) {
            toast.show('participant successufuly', { type: 'success', duration: 3000, placement: "top", });
            router.push('notification');
        } else {
            toast.show('already participat', { type: 'danger', duration: 3000, placement: "top", });
            router.push('notification');
        }
    }
    return {
        updateData,
        role,
        hadleParticipation,
    }
}

export default useAllEvents;