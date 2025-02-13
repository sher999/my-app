import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextEditorComponent from './TextEditorComponent'

const App = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <TextEditorComponent/>
            </View>
        </SafeAreaView>
    )
}

export default App