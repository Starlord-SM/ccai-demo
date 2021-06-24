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
            title: 'CHANGEMENTS RÉCENTS DU COMPTE',
            items: [
                {
                    title: 'Prélèvement automatique modifié',
                    subtitle: 'Date: 14/06/2021 - Statut: En attente',
                },
                {
                    title: "Compte d'épargne créé",
                    subtitle: 'Date: 19/03/2021 - Statut : TERMINÉ',
                },
                {
                    title: 'Découvert augmenté',
                    subtitle: 'Date: 02/01/2021 - Statut : TERMINÉ',
                },
                {
                    title: 'Demande de prêt',
                    subtitle: 'Date: 10/12/2020 - Statut : TERMINÉ',
                },
                {
                    title: 'Adresse mise à jour',
                    subtitle: 'Date: 01/07/2020 - Statut : TERMINÉ',
                },
            ],
        },
    };
};
