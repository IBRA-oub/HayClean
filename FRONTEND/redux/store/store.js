import { configureStore } from "@reduxjs/toolkit";
import citySlice from "../features/citySlice";
import registerCitizenSlice from "../features/registerCitizenSlice";
import mailVerificationCitizenSlice from "../features/mailVerificationCitizenSlice";
import mailVerificationMunicipalitySlice from "../features/mailVerificationMunicipalitySlice";
import registerMunicipalitySlice from "../features/registerMunicipalitySlice";
import allReportSlice from "../features/allReportSlice";
import toggleSadSlice from "../features/toggleSadSlice";
import allCollectionPointSlice from "../features/allCollectionPointSlice";
import allNewsSlice from "../features/allNewsSlice";
import allEventsSlice from "../features/allEventsSlice";
import participationSlice from "../features/participationSlice";
export const store = configureStore({
    reducer: {
        cities: citySlice,
        registerCitizen: registerCitizenSlice,
        mailVerificationCitizen: mailVerificationCitizenSlice,
        mailVerificationMunicipality: mailVerificationMunicipalitySlice,
        registerMunicipality: registerMunicipalitySlice,
        allReport: allReportSlice,
        toggleSad: toggleSadSlice,
        allCollectionPoint: allCollectionPointSlice,
        allNews: allNewsSlice,
        allEvents: allEventsSlice,
        participation:participationSlice
    }
}) 