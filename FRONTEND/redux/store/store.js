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
import ParticipantCitizenSlice from "../features/participantCitizenSlice";
import cancelParticipationSlice from "../features/cancelParticipationSlice";
import accepteParticipationSlice from "../features/accepteParticipationSlice";
import rejecteParticipationSlice from "../features/rejecteParticipationSlice";
import addReportSlice from "../features/addReportSlice";
import getReportByIdSlice from "../features/getReportByIdSlice";
import confermSlice from "../features/confermReportSlice";
import participantMunicipalitySlice from "../features/participantMunicipalitySlice";
import addCollectionPointSlice from "../features/addCollectionPointSlice";
import editeCollectionPointSlice from "../features/editeCollectionPointSlice";
import editeEventSlice from "../features/editeEventSlice";
import deleteCollectionPointSlice from "../features/deleteCollectionPointSlice";
import deleteEventSlice from "../features/deleteEventSlice";
import addEventSlice from "../features/addEventSlice";
import addNewsSlice from "../features/addNewsSlice";
import deleteNewsSlice from "../features/deleteNewsSlice";
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
        participation: participationSlice,
        ParticipantCitizen: ParticipantCitizenSlice,
        cancelParticipation: cancelParticipationSlice,
        addReport: addReportSlice,
        getReportById: getReportByIdSlice,
        conferm:confermSlice,
        participantMunicipality:participantMunicipalitySlice,
        accepteParticipation: accepteParticipationSlice,
        rejecteParticipation: rejecteParticipationSlice,
        addCollectionPoint:addCollectionPointSlice,
        editeCollectionPoint:editeCollectionPointSlice,
        deleteCollectionPoint:deleteCollectionPointSlice,
        deleteEvent:deleteEventSlice,
        addEvent:addEventSlice,
        editeEvent:editeEventSlice,
        addNews:addNewsSlice,
        deleteNews:deleteNewsSlice,

    }
}) 