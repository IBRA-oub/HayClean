import { allEvents } from '../../redux/features/allEventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allEventsSelectors } from '../../redux/selectors/allEventsSelectors'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { participation } from '../../redux/features/participationSlice';
import { useToast } from 'react-native-toast-notifications'
import { ParticipantCitizen } from '../../redux/features/ParticipantCitizenSlice'
import { ParticipantCitizenSelectors } from '../../redux/selectors/ParticipantCitizenSelectors'
import { cancelParticipation } from '../../redux/features/cancelParticipationSlice'
const useAllEvents = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const toast = useToast();
    const [role, setRole] = useState('')

    useEffect(() => {
        dispatch(allEvents())
        dispatch(ParticipantCitizen())

    }, [dispatch])

    const allEventsData = useSelector(allEventsSelectors) || []
    const updateData = Array.isArray(allEventsData) && allEventsData.length > 0 ?
        allEventsData.map(event => ({
            ...event,
            image: event?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
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
            toast.show('already participat', { type: 'warning', duration: 3000, placement: "top", });
            router.push('notification');
        }
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };


    const data = useSelector(ParticipantCitizenSelectors)
    const participantData = Array.isArray(data) && data.length > 0 ?
        data.map(not => ({
            ...not,
            image: not?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
        : null;

    const handelCancelParticipation = async (id) => {
        await dispatch(cancelParticipation(id))
    }
    return {
        updateData,
        role,
        hadleParticipation,
        refreshing,
        onRefresh,
        participantData,
        handelCancelParticipation
    }
}

export default useAllEvents;