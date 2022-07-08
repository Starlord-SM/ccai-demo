import { DialogFlowRequest, SECTIONS } from '../types';
import SIZES from './sizes';

export const createProductPreview = (dfRequest: DialogFlowRequest) => {
    const batchNo = dfRequest.queryResult?.parameters?.batch_number;

    return {
        [SECTIONS.PRODUCT_PREVIEW]: {
            template: 'profile',
            width: SIZES.FULL,
            items: [
                {
                    type: 'image',
                    width: SIZES.FULL,
                    data:
                        'https://www.drugs.com/images/pills/nlm/005915454.jpg',
                },
                {
                    type: 'text',
                    width: SIZES.FULL,
                    data: 'Product Preview',
                },
                {
                    type: 'text',
                    width: SIZES.FULL,
                    data: `Batch: ${batchNo}`,
                },
            ],
        },
    };
};
