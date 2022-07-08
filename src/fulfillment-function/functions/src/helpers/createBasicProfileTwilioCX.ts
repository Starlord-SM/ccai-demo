import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createBasicProfileTwilioCX = (request: any) => {
    const sentimentScore: number =
        request.body?.sentimentAnalysisResult?.score || 0;

    const params = request.body.sessionInfo.parameters;
    const policyNumber = params.policy_number;
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
                                    data:
                                        'https://avatars.dicebear.com/api/female/big_kauna.svg',
                                },
                                {
                                    type: 'text',
                                    width: SIZES.FULL,
                                    data: 'Jill Test',
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
                                    title: 'Account Number',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: policyNumber || '12345678',
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
                        [SECTIONS.TIMELINE]: {
                            template: 'timeline',
                            width: SIZES.HALF,
                            title: 'Recent Purchases',
                            items: [
                                {
                                    title: 'Order No. 100000 - Beach Ball 🏐',
                                    subtitle:
                                        'Shipping Date: 12/03/2021: -$12.00',
                                },
                                {
                                    title:
                                        'Order No. 100001 - Owl Shoes (Size 6) 👟',
                                    subtitle:
                                        'Shipping Date: 12/03/2021: -$60.00',
                                },
                                {
                                    title:
                                        'Order No. 100002 - Training Equipment 🏋️‍♀️',
                                    subtitle:
                                        'Shipping Date: 12/03/2021: -$120.09',
                                },
                            ],
                        },
                        [SECTIONS.CONTACT]: {
                            template: 'timeline',
                            width: SIZES.HALF,
                            title: 'Client Contact History',
                            items: [
                                {
                                    title: '📞 Phone Call',
                                    subtitle: '19/01/2021',
                                },
                                {
                                    title: '💬 Webchat',
                                    subtitle: '02/10/2020',
                                },
                                {
                                    title: '📞 Phone Call',
                                    subtitle: '13/09/2020',
                                },
                            ],
                        },
                        [SECTIONS.CALL_TO_ACTION]: {
                            template: 'calltoaction',
                            text: 'Has customer passed ID&V',
                            title: 'ID&V',
                            label: 'PASSED',
                            url: 'https://www.google.com',
                        },
                    },
                },
            },
        },
    };
};
