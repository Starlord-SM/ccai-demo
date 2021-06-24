import { SECTIONS } from './types';

export const basicProfileData = {
    [SECTIONS.BASIC_PROFILE]: {
        template: 'profile',
        width: 'third',
        items: [
            {
                type: 'image',
                width: 'full',
                data: '',
            },
            {
                type: 'text',
                width: 'full',
                data: 'Joe Bloggs',
            },
            {
                type: 'phoneNumber',
                width: 'full',
                data: '+447888888888',
            },
        ],
    },
    [SECTIONS.DETAIL]: {
        template: 'detail',
        width: 'two-third',
        items: [
            {
                title: 'Reason For Call',
                type: 'text',
                width: 'full',
                data: 'New Policy',
            },
            {
                title: 'Cover Type',
                type: 'text',
                width: 'full',
                data: 'Motor',
            },
            {
                title: 'VA Experience',
                type: 'text',
                width: 'full',
                data: 'Positive',
            },
        ],
    },

    [SECTIONS.TIMELINE]: {
        template: 'timeline',
        width: 'full',
        title: 'Timeline',
        items: [
            {
                title: 'Phone Call',
                subtitle: '10/10/2019',
            },
            {
                title: 'Phone Call',
                subtitle: '10/10/2019',
            },
            {
                title: 'Webchat',
                subtitle: '8/10/2019',
            },
        ],
    },
};

export const basicIframe = {
    [SECTIONS.IFRAME]: {
        template: 'iframe',
        width: 'full',
        title: 'Wiki',
        height: '400px',
        url: 'https://en.wikipedia.org/wiki/Employment',
    },
};

export const carDetailsData = {
    [SECTIONS.CAR_DETAILS]: {
        template: 'card',
        width: 'third',
        items: [
            {
                title: 'Reg.',
                type: 'text',
                width: 'half',
                data: 'GX67 BLJ',
            },
            {
                title: 'Make',
                type: 'text',
                width: 'half',
                data: 'BMW',
            },
            {
                title: 'Model',
                type: 'text',
                width: 'half',
                data: '5 Series L',
            },
            {
                title: 'Year',
                type: 'text',
                width: 'half',
                data: '1993',
            },
        ],
    },
};

export const policyQuoteData = {
    [SECTIONS.DETAIL]: {
        template: 'detail',
        width: 'two-third',
        items: [
            {
                title: 'Policy Holder Name',
                type: 'text',
                width: 'half',
                data: 'Joe Bloggs',
            },
            {
                title: 'Customer Phone Number',
                type: 'phoneNumber',
                width: 'half',
                data: '+447888888888',
            },
            {
                title: 'Customer Tier',
                type: 'text',
                width: 'half',
                data: 'GOLD',
            },
            {
                title: 'Vehicle',
                type: 'text',
                width: 'half',
                data: '2018, Porsche 911 - GT2',
            },
            {
                title: 'Reason For Call',
                type: 'text',
                width: 'half',
                data: 'New Policy',
            },
            {
                title: 'VA Experience',
                type: 'text',
                width: 'half',
                data: 'Positive',
            },
        ],
    },
    [SECTIONS.POLICY_QUOTE]: {
        template: 'detail',
        width: 'full',
        items: [
            {
                title: 'Policy Number',
                type: 'text',
                width: 'half',
                data: 'PN123442123',
            },
            {
                title: 'Premium',
                type: 'phoneNumber',
                width: 'half',
                data: '£250',
            },
            {
                title: 'Policy Type',
                type: 'text',
                width: 'half',
                data: 'Motor',
            },
            {
                title: 'Policy Start Date',
                type: 'text',
                width: 'half',
                data: '23-02-2020',
            },
            {
                title: 'Policy End Date',
                type: 'text',
                width: 'half',
                data: '22-02-2021',
            },
            {
                title: 'Theft Risk',
                type: 'text',
                width: 'half',
                data: 'Low',
            },
        ],
    },
    [SECTIONS.CALL_TO_ACTION]: {
        template: 'calltoaction',
        label: 'Buy Policy',
        text: 'Finalise the policy details and confirm.',
        title: 'Confirm Policy',
        url: '',
    },
    [SECTIONS.MAP]: {
        template: 'map',
        width: 'full',
        geolocation: {
            lat: '51.4148823',
            lng: '-0.0105935',
        },
    },
};
