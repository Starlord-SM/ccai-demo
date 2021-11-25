import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';

export type DialogFlowRequest = GoogleCloudDialogflowV2WebhookRequest & {
    queryResult: { sentimentAnalysisResult: any };
};

export interface IContext {
    name: string;
    lifespanCount: number;
    parameters?: object;
}
export interface ISyncAttributesContext extends IContext {
    name: string;
    lifespanCount: number;
    parameters: {
        sync_attributes: {
            sync_object_type: 'document' | 'list' | 'map';
            data: {};
        };
    };
}

export interface ITaskAttributesContext extends IContext {
    name: string;
    lifespanCount: number;
    parameters: {
        task_attributes: {};
    };
}

export enum SYNC_TEMPLATES {
    INITIAL_PROFILE = 'initial_profile',
    BASIC_PROFILE = 'basic_profile',
    PHONE_NUMBER = 'phone_number',
    CAR_DETAILS = 'car_details',
    POLICY_QUOTE = 'policy_quote',
    IFRAME = 'iframe',
    TASK = 'task',
    ACCOUNT_HISTORY = 'account_history',
}

export enum SECTIONS {
    BASIC_PROFILE,
    DETAIL,
    ADDRESS,
    PHONE_NUMBER,
    SENTIMENT,
    CLIENT_TYPE,
    MAP,
    TIMELINE,
    CONTACT,
    CAR_DETAILS,
    POLICY_QUOTE,
    CALL_TO_ACTION,
    IFRAME,
    ACCOUNT_HISTORY,
    AGENT_REMINDER,
    TELL_CUSTOMER,
}
