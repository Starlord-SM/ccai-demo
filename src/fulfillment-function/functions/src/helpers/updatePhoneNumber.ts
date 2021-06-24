import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { SECTIONS } from '../types';
import SIZES from './sizes';

export const updatePhoneNumber = (
    dfRequest: GoogleCloudDialogflowV2WebhookRequest
) => {
    let phoneNumber = dfRequest.queryResult?.parameters?.phoneNumber;
    const outputContexts = dfRequest.queryResult?.outputContexts;

    let firstContext;
    if (outputContexts && outputContexts?.length > 0) {
        firstContext = outputContexts[0];
    }
    if (firstContext) {
        if (!phoneNumber) {
            phoneNumber = firstContext.parameters?.phoneNumber;
        }
    }
    return {
        [SECTIONS.PHONE_NUMBER]: {
            template: 'card',
            width: SIZES.HALF,
            items: [
                {
                    title: 'Numéro de téléphone',
                    type: 'text',
                    width: SIZES.HALF,
                    data: phoneNumber || '(0141) 555 8891',
                },
            ],
        },
    };
};
