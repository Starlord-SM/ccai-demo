import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createLearnerDriver = (dfRequest: DialogFlowRequest) => {
    const sentimentScore: number =
        dfRequest.queryResult?.sentimentAnalysisResult?.queryTextSentiment
            ?.score || 0;

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
        [SECTIONS.PATIENT_HISTORY]: {
            template: 'card',
            width: SIZES.FULL,
            items: [
                {
                    title: '⚠️ Learner Driver ⚠️',
                    type: 'text',
                    width: SIZES.FULL,
                    data:
                        'Learner Drivers must be accompanied by an insured party',
                },
            ],
        },
    };
};
