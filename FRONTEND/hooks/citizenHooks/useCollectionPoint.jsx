import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { allCollectionPoint } from '../../redux/features/allCollectionPointSlice';
import { allCollectionPointSelectors } from '../../redux/selectors/allCollectionPointSelectors';


const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const useCollectionPoint = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [distances, setDistances] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [selectedLocation, setSelectedLocation] = useState(null);

    const onSelectPoint = (latitude, longitude) => {
        setSelectedLocation({ latitude, longitude });
        setViewMode('map');
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allCollectionPoint())
    }, [dispatch])

    const data = useSelector(allCollectionPointSelectors)

    useEffect(() => {
        const getLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission de localisation refusée');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.log('Erreur lors de la récupération de la localisation', error);
            }
        };

        getLocation();
    }, []);

    useEffect(() => {
        if (userLocation && data?.length > 0) {
            const calculatedDistances = data?.map((point) => ({
                ...point,
                distance: calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    parseFloat(point?.latitude),
                    parseFloat(point?.longitude)
                ),
            }));

            setDistances(calculatedDistances);
        }
    }, [userLocation, data]);

    return { userLocation, distances,viewMode,setViewMode,selectedLocation,onSelectPoint };
};

export default useCollectionPoint;
