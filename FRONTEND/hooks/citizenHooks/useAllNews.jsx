
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allNews } from '../../redux/features/allNewsSlice'
import { allNewsSelectors } from '../../redux/selectors/allNewsSelectors'
const useAllNews =()=>{
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allNews())
    }, [dispatch])

    const allNewsData = useSelector(allNewsSelectors) || []
    const updateData = Array.isArray(allNewsData) && allNewsData.length > 0 ?
        allNewsData.map(report => ({
            ...report,
            image: report?.image?.replace(/127\.0\.0\.1|minio/g, process.env.EXPO_PUBLIC_IP_ADDRESS),
        }))
        : null;
    return{
        updateData
    }
}

export default useAllNews;