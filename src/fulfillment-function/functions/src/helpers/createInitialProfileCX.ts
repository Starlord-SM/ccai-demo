import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createInitialProfileCX = (request: any) => {
    const sentimentScore: number =
        request.body?.sentimentAnalysisResult?.score || 0;
    const params = request.body.sessionInfo.parameters;
    const escalationIntent = params.escalation_intent;

    let sentiment;
    if (sentimentScore < -0.1) {
        sentiment = '🙁 - POOR';
    } else if (sentimentScore >= 0.3) {
        sentiment = '😀 - GOOD';
    } else {
        sentiment = '😐 - NEUTRAL';
    }

    return {
        sessionInfo: {
            parameters: {
                sync_attributes: {
                    sync_object_type: 'map',
                    data: {
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
                        [SECTIONS.SENTIMENT]: {
                            template: 'card',
                            width: SIZES.FULL,
                            items: [
                                {
                                    title: 'Sentiment',
                                    type: 'text',
                                    width: SIZES.FULL,
                                    data: sentiment,
                                },
                            ],
                        },
                    },
                },
            },
        },
    };
};
