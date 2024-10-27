import { Amplify } from 'aws-amplify';
import config from './aws-exports.js';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(config);

export const client = generateClient();
