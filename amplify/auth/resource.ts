import { referenceAuth } from '@aws-amplify/backend';

export const auth = referenceAuth({
    userPoolId: 'us-east-1_a0tKbd98K',
    userPoolClientId: '1454j01qk91t9f37r8pvuinst3',
    identityPoolId: 'us-east-1:1469407c-dd6d-40af-9a66-d70bc092d2fa',

    authRoleArn: 'arn:aws:iam::221864213856:role/service-role/finanzas-auth2-role-dev',
    unauthRoleArn: 'arn:aws:iam::xxxx:role/amplify-xxxx-mai-amplifyAuthunauthenticate-xxxx'
});
