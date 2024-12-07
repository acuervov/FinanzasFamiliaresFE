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
            userPoolId: 'us-east-1_CLRGl20UZ',
            userPoolClientId: '7ut03ojvljo4dn1b77obgrjifq',
            identityPoolId: 'us-east-1:eb9f2eca-6f9e-46ff-9f36-b4833c9db06b'
        }
    }
};
