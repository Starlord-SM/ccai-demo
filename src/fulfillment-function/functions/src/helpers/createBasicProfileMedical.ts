import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createBasicProfileMedical = (dfRequest: DialogFlowRequest) => {
    const sentimentScore: number =
        dfRequest.queryResult?.sentimentAnalysisResult?.queryTextSentiment
            ?.score || 0;

    let patientId = dfRequest.queryResult?.parameters?.patient_id;

    const outputContexts = dfRequest.queryResult?.outputContexts;
    let firstContext;
    if (outputContexts && outputContexts?.length > 0) {
        firstContext = outputContexts[0];
    }
    let escalationIntent;
    if (firstContext) {
        escalationIntent = firstContext.parameters?.escalation_intent;
        if (!patientId) {
            patientId = firstContext.parameters?.patient_id;
        }
    }

    if (escalationIntent == 'Adverse_Event') {
        escalationIntent = `⚠️ Adverse_Event ⚠️`;
    }

    let sentiment;
    if (sentimentScore < -0.1) {
        sentiment = '🙁 - POOR';
    } else if (sentimentScore >= 0.3) {
        sentiment = '😀 - GOOD';
    } else {
        sentiment = '😐 - NEUTRAL';
    }

    return {
        [SECTIONS.BASIC_PROFILE]: {
            template: 'profile',
            width: SIZES.THIRD,
            items: [
                {
                    type: 'image',
                    width: SIZES.FULL,
                    data: 'https://avatars.dicebear.com/api/male/big_kauna.svg',
                },
                {
                    type: 'text',
                    width: SIZES.FULL,
                    data: 'Adam Jones',
                },
                {
                    type: 'text',
                    width: SIZES.FULL,
                    data: 'dob - 20/09/1956',
                },
            ],
        },
        [SECTIONS.DETAIL]: {
            template: 'detail',
            width: SIZES.TWO_THIRD,
            items: [
                {
                    title: 'Intent',
                    type: 'text',
                    width: SIZES.HALF,
                    data: escalationIntent || 'speak to agent',
                },
                {
                    title: 'Patient ID',
                    type: 'text',
                    width: SIZES.HALF,
                    data: patientId || 'ABC123',
                },
            ],
        },
        [SECTIONS.ADDRESS]: {
            template: 'card',
            items: [
                {
                    title: 'Address 🏘️',
                    type: 'text',
                    width: SIZES.HALF,
                    data: `865 Market Street, San Fransisco, CA`,
                },
            ],
        },
        [SECTIONS.PHONE_NUMBER]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Phone Number 📞',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '+1 415-974-1846',
                },
            ],
        },
        [SECTIONS.SENTIMENT]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Sentiment',
                    type: 'text',
                    width: SIZES.HALF,
                    data: sentiment,
                },
            ],
        },
        [SECTIONS.CLIENT_TYPE]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Client Type',
                    type: 'text',
                    width: SIZES.HALF,
                    data: 'PREMIUM',
                },
            ],
        },
        [SECTIONS.MAP]: {
            template: 'map',
            width: SIZES.FULL,
            geolocation: {
                lat: 37.7844494,
                lng: -122.4080831,
            },
        },
    };
};
