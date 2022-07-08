import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { SECTIONS } from '../types';
import SIZES from './sizes';

export const createPatientHistory = (
    _: GoogleCloudDialogflowV2WebhookRequest
) => {
    return {
        [SECTIONS.PATIENT_HISTORY]: {
            template: 'timeline',
            width: SIZES.FULL,
            title: 'Patient History',
            items: [
                {
                    title: 'Appetite loss',
                    subtitle: 'Date: 14/09/2021 - Reports : low – Closed-SAFE',
                },
                {
                    title: 'Injection Arm Numbness',
                    subtitle:
                        'Date: 19/09/2021 - Reports : medium – Under Investigation',
                },
                {
                    title: 'Dizziness',
                    subtitle:
                        'Date: 02/10/2021 - Reports : low – Closed-Added Advice',
                },
            ],
        },
    };
};
