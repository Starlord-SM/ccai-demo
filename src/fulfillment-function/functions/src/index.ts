/* eslint-disable @typescript-eslint/camelcase */
import { https } from 'firebase-functions';
import { SIZES } from 'twilio-ccai-fulfillment-tools';
import { createAccountHistory } from './helpers/createAccountHistory';
import { createBasicProfile } from './helpers/createBasicProfile';
import { createCustomerSentiment } from './helpers/createCustomerSentiment';
import { createInitialProfile } from './helpers/createInitialProfile';

// import { createInitialProfile } from './helpers/createInitialProfile';
import { updatePhoneNumber } from './helpers/updatePhoneNumber';
import {
    DialogFlowRequest,
    ISyncAttributesContext,
    ITaskAttributesContext,
    SECTIONS,
    SYNC_TEMPLATES,
} from './types';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export const syncTemplateDetector = https.onRequest(
    async (request, response) => {
        // HELPFUL REFERENCES
        const dfRequest = request.body as DialogFlowRequest;
        const parameters = dfRequest.queryResult?.parameters || {};

        // INITIAL DEBUG LOGS
        console.log('Request headers: ' + JSON.stringify(request.headers));
        console.log('Request body: ' + JSON.stringify(request.body));

        // DEFINE CONTEXT TO BE ADDED
        let context:
            | ISyncAttributesContext
            | ITaskAttributesContext
            | undefined;

        // CREATE CONTEXT HELPER
        const createSyncAttributesContext = (
            data: any
        ): ISyncAttributesContext => ({
            name: `${dfRequest.session}/contexts/sync-attributes`,
            lifespanCount: 1,
            parameters: {
                sync_attributes: {
                    sync_object_type: 'map',
                    data,
                },
            },
        });

        // CREATE CONTEXT HELPER
        const createTaskAttributesContext = (): any => {
            return {
                name: `${dfRequest.session}/contexts/testcontext`,
                lifespanCount: 99,
                parameters: {
                    action: 'escalate',
                    router_name: 'ninjas',
                },
            };
        };

        if (parameters.test) {
            context = createTaskAttributesContext();
        }

        // CREATE THE CORRECT CONTEXT BASED ON DETECTED SYNC_TEMPLATE
        if (parameters.sync_template) {
            console.log(
                'Found sync_template parameter',
                parameters.sync_template
            );
            switch (parameters.sync_template as SYNC_TEMPLATES) {
                case SYNC_TEMPLATES.INITIAL_PROFILE:
                    context = createSyncAttributesContext(
                        createInitialProfile(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.BASIC_PROFILE:
                    context = createSyncAttributesContext(
                        createBasicProfile(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.ACCOUNT_HISTORY:
                    context = createSyncAttributesContext(
                        createAccountHistory(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.PHONE_NUMBER:
                    context = createSyncAttributesContext(
                        updatePhoneNumber(dfRequest)
                    );
                    break;
                default:
                    context = createSyncAttributesContext(
                        createCustomerSentiment(dfRequest)
                    );
                    break;
            }
        }

        response.send({
            outputContexts: context ? [context] : [],
        });
    }
);

export const cxFulfilment = https.onRequest(async (request, response) => {
    // INITIAL DEBUG LOGS
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    console.log(
        'Request params: ' + JSON.stringify(request.body.sessionInfo.parameters)
    );

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

    response.send({
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
                                    data: 'speak to agent',
                                },
                                {
                                    title: 'Account Number',
                                    type: 'text',
                                    width: SIZES.HALF,
                                    data: '12345678',
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
    });
});

export const initialProfile = https.onRequest(async (request, response) => {
    // INITIAL DEBUG LOGS
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    console.log(
        'Request params: ' + JSON.stringify(request.body.sessionInfo.parameters)
    );

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

    response.send({
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
                                    data: 'speak-to-agent',
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
                        [SECTIONS.AGENT_REMINDER]: {
                            template: 'timeline',
                            width: SIZES.FULL,
                            title: 'Agent reminder:',
                            items: [
                                {
                                    title: 'Ask for DOB',
                                    subtitle: 'customer must be over 16',
                                },
                                {
                                    title: 'Ask for proof of address',
                                    subtitle:
                                        'customer can upload in the chat widget',
                                },
                                {
                                    title: 'Ask for NI Number',
                                },
                            ],
                        },
                        [SECTIONS.TELL_CUSTOMER]: {
                            template: 'timeline',
                            width: SIZES.FULL,
                            title: 'Tell customer:',
                            items: [
                                {
                                    title: 'Subject to 180 days access',
                                },
                                {
                                    title: 'Tax free',
                                },
                            ],
                        },
                    },
                },
            },
        },
    });
});
