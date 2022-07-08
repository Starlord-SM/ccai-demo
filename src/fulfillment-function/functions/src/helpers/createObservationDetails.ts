import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createObservationDetails = (dfRequest: DialogFlowRequest) => {
    const escalationInfo = dfRequest.queryResult?.parameters?.escalation_info;

    return {
        [SECTIONS.OBSERVATION_DETAILS]: {
            template: 'card',
            width: SIZES.FULL,
            items: [
                {
                    title: '⚠️ OBSERVATION DETAILS',
                    type: 'text',
                    width: SIZES.FULL,
                    data: escalationInfo,
                },
            ],
        },
    };
};
