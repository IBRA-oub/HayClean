import { useDispatch, useSelector } from "react-redux"
import { allReport } from "../../redux/features/allReportSlice"
import { allReportSelectors } from "../../redux/selectors/allReportSelectors"
import { toggleSad } from "../../redux/features/toggleSadSlice"
import { useEffect, useState } from "react"

const useGetReport = () => { 
const dispatch = useDispatch()
const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(allReport())
    }, [dispatch])

    const data = useSelector(allReportSelectors) || []
    const updateData = Array.isArray(data) && data.length > 0 ?
        data.map(report => ({
            ...report,
            image: report?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
            sadCount: report.sad ? report.sad.length : 0
        })).sort((a, b) => b.sadCount - a.sadCount)
        : null;

    const handleTogglSad = (id) => {
        dispatch(toggleSad(id))
    }

    return {
        updateData,
        handleTogglSad,
        loading,
        setLoading
    }
}

export default useGetReport;