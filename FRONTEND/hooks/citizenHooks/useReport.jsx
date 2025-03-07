import { useRouter } from "expo-router";
import { useState } from "react";

const useReport = () => {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [accessibilityData, setAccessibilityData] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleSelectType = (type) => {
        setSelectedTypes((prevSelected) => {
            if (prevSelected.includes(type)) {
                return prevSelected.filter((item) => item !== type);
            } else {
                return [...prevSelected, type];
            }
        });
    };

    const handleSelectAccessibility = (title, viewMode) => {
        setAccessibilityData((prevData) => {
            const updatedData = prevData.filter(item => item.title !== title);
            return [...updatedData, { title, viewMode }];
        });
    };

    const handleAddInfoChange = (text) => {
        setAdditionalInfo(text);
    };


    const handleSend = () => {
        console.log("Selected Trash Size:", selectedSize);
        console.log("Selected Trash Types:", selectedTypes);
        console.log("Accessibility Data:", accessibilityData);
        console.log("Additional Info:", additionalInfo);
    };
    return{
        setSelectedSize,
        handleSelectType,
        handleSelectAccessibility,
        handleAddInfoChange,
        handleSend
    }
}

export default useReport;