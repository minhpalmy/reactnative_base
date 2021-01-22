import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { getToken } from '../store/actions/auth'
 class Login extends Component {
    onPressButton=()=>{
        const {getToken}= this.props
        getToken('84984264443','123456');
// this.props.navigation.navigate("Home")
    }
    render() {
        return (
            <View>
                <Button mode='contained' onPress={this.onPressButton} color='red'>
                    Press me
                </Button>
                <Text>Hello các bạn</Text>
            </View>
        )
    }
}
export default connect(state => ({
}),
    { getToken }
)(Login);