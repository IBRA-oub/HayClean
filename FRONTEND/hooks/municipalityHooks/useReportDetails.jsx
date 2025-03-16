import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportByIdSelectors } from "../../redux/selectors/getReportByIdSelectors";
import { getReportById } from "../../redux/features/getReportByIdSlice";
import { conferm } from "../../redux/features/confermReportSlice";
import { useToast } from 'react-native-toast-notifications'

const useReportDetails = () => {
    const params = useLocalSearchParams();
    const id = params.id
    const dispatch = useDispatch()
    const toast = useToast();
    const router = useRouter()
    useEffect(() => {
        if (id) {
            dispatch(getReportById(id))
        }
    }, [id, dispatch])

    const data = useSelector(getReportByIdSelectors) || []
    const reportDetailsData = {
        ...data,
        image: data?.image?.replace("127.0.0.1", process.env.EXPO_PUBLIC_IP_ADDRESS),
    };

    const handleConferm = (reportId) => {
        if (reportId) {
            const response = dispatch(conferm(reportId))
            if (response) {
                toast.show('report confermed', { type: 'success', duration: 3000, placement: "top", });
                router.push('muniHome');
            } else {
                toast.show(`try again`, { type: 'warning', duration: 3000, placement: "top", });
            }
        }
    }

    return {
        id,
        reportDetailsData,
        handleConferm
    }

}

export default useReportDetails;