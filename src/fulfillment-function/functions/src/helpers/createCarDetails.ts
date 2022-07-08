import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createCarDetails = (dfRequest: DialogFlowRequest) => {
    const sentimentScore: number =
        dfRequest.queryResult?.sentimentAnalysisResult?.queryTextSentiment
            ?.score || 0;

    let patientId = dfRequest.queryResult?.parameters?.patient_id;
    const regoNumber = dfRequest.queryResult?.parameters?.rego_number;

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
        [SECTIONS.TIMELINE]: {
            template: 'detail',
            width: SIZES.FULL,
            items: [
                {
                    title: 'Model',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '2012 Honda Civic',
                },
                {
                    title: 'Rego Number',
                    type: 'text',
                    width: SIZES.HALF,
                    data: regoNumber || 'ABC 1234',
                },
                {
                    title: 'Number of Owners',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '3',
                },
                {
                    title: 'VIN Number',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '4Y1SL65848Z411439',
                },
            ],
        },
        [SECTIONS.CONTACT]: {
            template: 'timeline',
            width: SIZES.FULL,
            title: 'Client Contact History',
            items: [
                {
                    title: '📞 Phone Call',
                    subtitle: '19/02/2022',
                },
                {
                    title: '💬 Webchat',
                    subtitle: '02/01/2022',
                },
                {
                    title: '📞 Phone Call',
                    subtitle: '13/09/2021',
                },
            ],
        },
        [SECTIONS.CALL_TO_ACTION]: {
            template: 'calltoaction',
            text: 'Send Car details via email',
            title: 'Send details',
            label: 'SEND',
            url: 'https://www.google.com',
        },
    };
};
