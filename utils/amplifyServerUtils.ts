import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { awsConfig } from '../amplify/config';

export const { runWithAmplifyServerContext } = createServerRunner({
    config: awsConfig
});
