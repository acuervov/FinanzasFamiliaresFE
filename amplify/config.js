export const awsConfig = {
    API: {
        GraphQL: {
            endpoint: 'https://xg5aatkdwjhifi6uzfw2is4rrm.appsync-api.us-east-1.amazonaws.com/graphql',
            region: 'us-east-1',
            defaultAuthMode: 'userPool'
        }
    },
    Auth: {
        Cognito: {
            userPoolId: 'us-east-1_a0tKbd98K',
            userPoolClientId: '1454j01qk91t9f37r8pvuinst3',
            identityPoolId: 'us-east-1:1469407c-dd6d-40af-9a66-d70bc092d2fa'
        }
    }
};
