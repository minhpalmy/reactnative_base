import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import { Text, View ,ActivityIndicator} from 'react-native'
import AppNavigator from './routes'
import { Provider } from 'react-redux'
import { store ,persistor} from './src/store/configStore'
// import { store, persistor } from '~/src/store/configStore'
export default class App extends Component {
  _renderLoading = () => {
    return (
        <View style={[ { paddingTop: 50 ,flex:1}]}>
            <ActivityIndicator size={Platform.OS == 'android' ? 60 : 'large'} color='blue' />
        </View>
    )
}
  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
        <PersistGate loading={this._renderLoading()} persistor={persistor}>
          <AppNavigator></AppNavigator>
          </PersistGate>
        </Provider>
      </PaperProvider>
    )
  }
}

