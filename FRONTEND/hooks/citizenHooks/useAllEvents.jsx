import { allEvents } from '../../redux/features/allEventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allEventsSelectors } from '../../redux/selectors/allEventsSelectors'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { participation } from '../../redux/features/participationSlice';
import { useToast } from 'react-native-toast-notifications'
import { cancelParticipation } from '../../redux/features/cancelParticipationSlice'
import { participantMunicipality } from '../../redux/features/participantMunicipalitySlice'
import { participantMunicipalitySelectors } from '../../redux/selectors/participantMunicipalitySelectors'
import { accepteParticipation } from '../../redux/features/accepteParticipationSlice'
import { rejecteParticipation } from '../../redux/features/rejecteParticipationSlice'
import { ParticipantCitizenSelectors } from '../../redux/selectors/ParticipantCitizenSelectors'
import { ParticipantCitizen } from '../../redux/features/participantCitizenSlice'
const useAllEvents = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const toast = useToast();
    const [role, setRole] = useState('')

    useEffect(() => {
        dispatch(allEvents())
        dispatch(ParticipantCitizen())
        dispatch(participantMunicipality())

    }, [dispatch])

    const allEventsData = useSelector(allEventsSelectors) || []
    const updateData = Array.isArray(allEventsData) && allEventsData.length > 0 ?
        allEventsData.map(event => ({
            ...event,
            image: event?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
        : [];


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

    const pendingParticipant = useSelector(participantMunicipalitySelectors)
    const pendingParticipantData = Array.isArray(pendingParticipant) && pendingParticipant.length > 0 ?
        pendingParticipant.map(not => ({
            ...not,
            image: not?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
        : null;

    const handelCancelParticipation = async (id) => {
        await dispatch(cancelParticipation(id))
    }
    const handelAccepte = async (id, email) => {
        const response = await dispatch(accepteParticipation({ id, email }))
        if (response.payload.status === 200) {
            toast.show('accepted successufuly', { type: 'success', duration: 3000, placement: "top", });
        } else {
            toast.show('Try again', { type: 'warning', duration: 3000, placement: "top", });
        }
    }
    const handelReject = async (id, email) => {
        const response = await dispatch(rejecteParticipation({ id, email }))
        if (response.payload.status === 200) {
            toast.show('rejected successufuly', { type: 'success', duration: 3000, placement: "top", });
        } else {
            toast.show('Try again', { type: 'warning', duration: 3000, placement: "top", });
        }
    }
    return {
        updateData,
        role,
        hadleParticipation,
        refreshing,
        onRefresh,
        participantData,
        handelCancelParticipation,
        pendingParticipantData,
        handelAccepte,
        handelReject,
        router
    }
}

export default useAllEvents;