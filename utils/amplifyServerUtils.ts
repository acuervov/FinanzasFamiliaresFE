import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { awsConfig } from '../amplify/config';
import { ResourcesConfig } from 'aws-amplify';

export const { runWithAmplifyServerContext } = createServerRunner({
    config: awsConfig as ResourcesConfig
});
