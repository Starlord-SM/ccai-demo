/* eslint-disable @typescript-eslint/camelcase */
import { https } from 'firebase-functions';
import { createPatientHistory } from './helpers/createPatientHistory';
import { createBasicProfile } from './helpers/createBasicProfile';
import { createCustomerSentiment } from './helpers/createCustomerSentiment';
import { createInitialProfile } from './helpers/createInitialProfile';
import { createObservationDetails } from './helpers/createObservationDetails';
import { createProductPreview } from './helpers/createProductPreview';

// import { createInitialProfile } from './helpers/createInitialProfile';
import { updatePhoneNumber } from './helpers/updatePhoneNumber';
import {
    DialogFlowRequest,
    ISyncAttributesContext,
    ITaskAttributesContext,
    SYNC_TEMPLATES,
} from './types';
import { createBasicProfileCX } from './helpers/createBasicProfileCX';
import { createInitialProfileCX } from './helpers/createInitialProfileCX';
import { createLearnerDriverCX } from './helpers/createLearnerDriverCX';
import { createSentimentCX } from './helpers/createSentimentCX';
import { createDrivingEuCX } from './helpers/createDrivingEuCX';
import { createBasicProfileTwilioCX } from './helpers/createBasicProfileTwilioCX';
import { createLearnerDriver } from './helpers/createLearnerDriver';
import { createEurope } from './helpers/createEuropeDetails';
import { createCarDetails } from './helpers/createCarDetails';
import { createBasicProfileMedical } from './helpers/createBasicProfileMedical';

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
                name: `${dfRequest.session}/contexts/atestcontext`,
                lifespanCount: 99,
                parameters: {
                    answer: 'Superman',
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
                case SYNC_TEMPLATES.SIMPLE_ESCALATE:
                    context = createTaskAttributesContext();
                    break;
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
                case SYNC_TEMPLATES.BASIC_PROFILE_MEDICAL:
                    context = createSyncAttributesContext(
                        createBasicProfileMedical(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.CAR_DETAILS:
                    context = createSyncAttributesContext(
                        createCarDetails(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.PATIENT_HISTORY:
                    context = createSyncAttributesContext(
                        createPatientHistory(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.PHONE_NUMBER:
                    context = createSyncAttributesContext(
                        updatePhoneNumber(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.ESCALATION_INFO:
                    context = createSyncAttributesContext(
                        createObservationDetails(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.PRODUCT_PREVIEW:
                    context = createSyncAttributesContext(
                        createProductPreview(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.LEARNER_DRIVER:
                    context = createSyncAttributesContext(
                        createLearnerDriver(dfRequest)
                    );
                    break;
                case SYNC_TEMPLATES.EUROPE:
                    context = createSyncAttributesContext(
                        createEurope(dfRequest)
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

export const fulfilmentCX = https.onRequest(async (request, response) => {
    // INITIAL DEBUG LOGS
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    const tag = request.body?.fulfillmentInfo?.tag;

    switch (tag) {
        case 'handoff':
            response.send(createInitialProfileCX(request));
            break;
        case 'profile':
            response.send(createBasicProfileCX(request));
            break;
        case 'learner':
            response.send(createLearnerDriverCX(request));
            break;
        case 'no-match':
            response.send(createSentimentCX(request));
            break;
        case 'driving-eu':
            response.send(createDrivingEuCX(request));
            break;
        case 'twilio-account':
            response.send(createBasicProfileTwilioCX(request));
            break;

        default:
            response.send({});
            break;
    }
});
