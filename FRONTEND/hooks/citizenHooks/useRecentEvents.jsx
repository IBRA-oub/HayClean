import { allEvents } from '../../redux/features/allEventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allEventsSelectors } from '../../redux/selectors/allEventsSelectors'
import { useEffect } from 'react'
const useRecentEvents = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allEvents())
    }, [dispatch])

    const allEventsData = useSelector(allEventsSelectors) || []
    const updateData = Array.isArray(allEventsData) && allEventsData.length > 0 ?
        allEventsData.map(report => ({
            ...report,
            image: report?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
        : null;
    return {
        updateData
    }
}

export default useRecentEvents;