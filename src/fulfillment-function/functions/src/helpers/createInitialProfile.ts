import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createInitialProfile = (dfRequest: DialogFlowRequest) => {
    const sentimentScore: number =
        dfRequest.queryResult?.sentimentAnalysisResult?.queryTextSentiment
            ?.score || 0;

    const outputContexts = dfRequest.queryResult?.outputContexts;
    let firstContext;
    if (outputContexts && outputContexts?.length > 0) {
        firstContext = outputContexts[0];
    }
    let escalationIntent;
    if (firstContext) {
        escalationIntent = firstContext.parameters?.escalation_intent;
    }
    if (escalationIntent == 'Adverse_Event') {
        escalationIntent = `⚠️ Adverse_Event ⚠️`;
    }
    console.log('firstContext', firstContext);

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
                    data: '',
                },
            ],
        },
        [SECTIONS.DETAIL]: {
            template: 'detail',
            width: SIZES.TWO_THIRD,
            items: [
                {
                    title: 'INTENT',
                    type: 'text',
                    width: SIZES.FULL,
                    data: escalationIntent || 'speak to agent',
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
                    data: '+447880933180',
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
    };
};
