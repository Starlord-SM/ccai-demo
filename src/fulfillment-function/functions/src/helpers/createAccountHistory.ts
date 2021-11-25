import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createAccountHistory = (
    _: GoogleCloudDialogflowV2WebhookRequest
) => {
    return {
        [SECTIONS.ACCOUNT_HISTORY]: {
            template: 'timeline',
            width: SIZES.FULL,
            title: 'Recent Account Changes',
            items: [
                {
                    title: 'Update Direct Debit',
                    subtitle: 'Date: 14/06/2021 - Status: Pending',
                },
                {
                    title: 'Savings Account Created',
                    subtitle: 'Date: 19/03/2021 - Status : Complete',
                },
                {
                    title: 'Home Loan Application',
                    subtitle: 'Date: 02/01/2021 - Status : Complete',
                },
                {
                    title: 'Overdraft increased',
                    subtitle: 'Date: 10/12/2020 - Status : Complete',
                },
                {
                    title: 'Address Changed',
                    subtitle: 'Date: 01/07/2020 - Status : Complete',
                },
            ],
        },
    };
};
