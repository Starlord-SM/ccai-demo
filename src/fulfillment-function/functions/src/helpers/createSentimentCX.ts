import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createSentimentCX = (request: any) => {
    const sentimentScore: number =
        request.body?.sentimentAnalysisResult?.score || 0;

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
                    },
                },
            },
        },
    };
};
