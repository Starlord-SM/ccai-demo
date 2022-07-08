import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createBasicProfileCX = (request: any) => {
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
                                    data: 'Jane Doe',
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
                                    data: escalationIntent,
                                },
                                {
                                    title: 'Account Number',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: policyNumber || 'CP12345',
                                },
                                {
                                    title: 'Insurance Brand',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: 'Sabio Group',
                                },
                                {
                                    title: 'Security Passphrase',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: 'balloons',
                                },
                            ],
                        },
                        [SECTIONS.ADDRESS]: {
                            template: 'card',
                            width: SIZES.HALF,
                            items: [
                                {
                                    title: 'Address 🏘️',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: `110 Southwark St, London SE1 0SU`,
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
                                    data: '+447880888888',
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
                                lat: 51.5060031,
                                lng: -0.1024986,
                            },
                        },
                        [SECTIONS.TIMELINE]: {
                            template: 'timeline',
                            width: SIZES.HALF,
                            title: 'Policy Renwal Details',
                            items: [
                                {
                                    title: 'Policy No. CP54325 - Car 🚗',
                                    subtitle: 'Renewal Date: 12/12/2021',
                                },
                                {
                                    title: 'Policy No. HP87432 - House 🏘️',
                                    subtitle: 'Renewal Date: 02/06/2022',
                                },
                                {
                                    title: 'Policy No. PP74323 - Health 🧘',
                                    subtitle: 'Renewal Date: 29/09/2022',
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
