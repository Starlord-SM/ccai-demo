/* eslint-disable @typescript-eslint/camelcase */
import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { https } from 'firebase-functions';
import { createAccountHistory } from './helpers/createAccountHistory';
import { createBasicProfile } from './helpers/createBasicProfile';
import { createCustomerSentiment } from './helpers/createCustomerSentiment';
import { createInitialProfile } from './helpers/createInitialProfile';
import { updatePhoneNumber } from './helpers/updatePhoneNumber';
import {
    ISyncAttributesContext,
    ITaskAttributesContext,
    SYNC_TEMPLATES,
} from './types';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export const syncTemplateDetector = https.onRequest(
    async (request, response) => {
        // HELPFUL REFERENCES
        const dfRequest = request.body as GoogleCloudDialogflowV2WebhookRequest;
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
        const createTaskAttributesContext = (skills: any): any => {
            const skillsArr = skills.split(',');
            console.log(skillsArr);
            return {
                name: `${dfRequest.session}/contexts/task-attributes`,
                lifespanCount: 99,
                parameters: {
                    escalate: true,
                    action: 'escalate',
                    router_name: 'customer-service',
                },
            };
        };

        if (parameters.skills) {
            context = createTaskAttributesContext(parameters.skills);
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
