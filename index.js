/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';
import config from './aws-exports';


//amplify configuration
Amplify.configure(config);
Amplify.configure({
    // To get the AWS Credentials, you need to configure 
    // the Auth module with your Cognito Federated Identity Pool
    Auth: {
        identityPoolId: 'us-west-2:d8a3d2cc-597f-4151-a953-825bba136e04',
        region: 'us-west-2'
    },
    Analytics: {
        AWSPinpoint: {
            // OPTIONAL -  Amazon Pinpoint App Client ID
            appId: '65b7dc1dd6bc4cff9af0bc42760758e0',
            // OPTIONAL -  Amazon service region
            region: 'us-east-1',
        }
    }
});

AppRegistry.registerComponent(appName, () => App);
