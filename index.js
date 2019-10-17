/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify' 
import config from './aws-exports'


//amplify configuration
Amplify.configure(config);

AppRegistry.registerComponent(appName, () => App);
