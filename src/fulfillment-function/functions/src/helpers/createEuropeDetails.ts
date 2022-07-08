import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createEurope = (dfRequest: DialogFlowRequest) => {
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

        [SECTIONS.IFRAME]: {
            template: 'iframe',
            width: SIZES.FULL,
            title: 'Driving in EU',
            height: '450px',
            url: 'https://en.wikipedia.org/wiki/European_driving_licence',
        },
        [SECTIONS.EUROPE]: {
            template: 'card',
            width: SIZES.FULL,
            items: [
                {
                    title: '⚠️ Driving in Europe ⚠️',
                    type: 'text',
                    width: SIZES.FULL,
                    data:
                        'As a premium customer you are insured to drive in the EU',
                },
            ],
        },
    };
};
