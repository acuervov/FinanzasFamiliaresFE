

console.log("ENV", process.env.NEXT_PUBLIC_ENV)

export const awsConfig = {
    API: {
        GraphQL: {
            endpoint: process.env.NEXT_PUBLIC_AWS_GRAPHQL_ENDPOINT,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            defaultAuthMode: 'userPool'
        }
    },
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USERPOOL_ID,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOLCLIENT_ID,
            identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITYPOOL_ID
        }
    }
};
