import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createBasicProfile = (dfRequest: DialogFlowRequest) => {
    const sentimentScore: number =
        dfRequest.queryResult?.sentimentAnalysisResult?.queryTextSentiment
            ?.score || 0;

    let accountNumber = dfRequest.queryResult?.parameters?.number;
    const phoneNumber = dfRequest.queryResult?.parameters?.phoneNumber;
    const outputContexts = dfRequest.queryResult?.outputContexts;
    let firstContext;
    if (outputContexts && outputContexts?.length > 0) {
        firstContext = outputContexts[0];
    }
    let escalationIntent;
    if (firstContext) {
        escalationIntent = firstContext.parameters?.escalation_intent;
        if (!accountNumber) {
            accountNumber = firstContext.parameters?.number;
        }
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
                    data: 'Bill Lumbergh',
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
                    data: accountNumber,
                },
                {
                    title: 'Account Balance',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '£11,198.23',
                },
                {
                    title: 'Security Code',
                    type: 'text',
                    width: SIZES.HALF,
                    data: '*2**4*',
                },
            ],
        },
        [SECTIONS.ADDRESS]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Address',
                    type: 'text',
                    width: SIZES.HALF,
                    data: `5 Collylinn Road, Bearsden, G61 4PN`,
                },
            ],
        },
        [SECTIONS.PHONE_NUMBER]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Phone Number',
                    type: 'text',
                    width: SIZES.HALF,
                    data: phoneNumber || '(0141) 563 8899',
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
                lat: 55.91849977901038,
                lng: -4.334341487176711,
            },
        },
        [SECTIONS.TIMELINE]: {
            template: 'timeline',
            width: SIZES.HALF,
            title: 'Recent Transactions',
            items: [
                {
                    title: 'ETSY',
                    subtitle: '02/06/2021: -£60.00',
                },
                {
                    title: 'JUST EAT',
                    subtitle: '21/05/2021: -£12.09',
                },
                {
                    title: 'SPOTIFY',
                    subtitle: '18/05/2021: -£9.99',
                },
                {
                    title: 'AMAZON',
                    subtitle: '02/06/2021: -£134.20',
                },
                {
                    title: 'SAINSBURYS',
                    subtitle: '02/06/2021: -£17.85',
                },
            ],
        },
        [SECTIONS.CONTACT]: {
            template: 'timeline',
            width: SIZES.HALF,
            title: 'Client Contact History',
            items: [
                {
                    title: 'Phone Call',
                    subtitle: '19/01/2021',
                },
                {
                    title: 'Webchat',
                    subtitle: '02/10/2020',
                },
                {
                    title: 'Phone Call',
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
    };
};
