import { View, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const alignLeft = ({ tintColor }: any) => <Button icon="format-align-left" textColor={tintColor} children={undefined} />
const alignRight = ({ tintColor }: any) => <Button icon="format-align-right" textColor={tintColor} children={undefined} />
const alignCenter = ({ tintColor }: any) => <Button icon="format-align-center" textColor={tintColor} children={undefined} />
const setBold = ({ tintColor }: any) => <Button icon="format-bold" textColor={tintColor} children={undefined} />
const setItalic = ({ tintColor }: any) => <Button icon="format-italic" textColor={tintColor} children={undefined} />
const insertImage = ({ tintColor }: any) => <Button icon="image-outline" textColor={tintColor} children={undefined} />

const TextEditorComponent = () => {
    const [text,setText] = React.useState<any>()
    const richText: any = React.useRef();
    React.useEffect(()=>{
        getData()
    },[])
    // React.useEffect(()=>{
    //     SaveData(text)
    // },[text])
    const getData = async () => {
        try {
          richText.current?.insertHTML('</>')
          const value = await AsyncStorage.getItem('text');
          console.log('value--------->',value);
          richText.current?.setContentHTML(value?.toString());
        } catch (e) {
          // error reading value
        }
      };
    const SaveData = async (value:any) => {        
        try {
          await AsyncStorage.setItem('text', value);
        } catch (e) {
          console.log(e);
        }
      };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            richText.current?.insertHTML('</>')
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64}`;
        }
    };
    async function onPressAddImage() {
        const image = await pickImage()
        richText.current?.insertImage(
            image
        );
    }
    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <RichEditor
                    style={{ flex: 1, position: 'relative', justifyContent: 'center', alignContent: 'center' }}
                    ref={richText}
                    placeholder="Start Writing Here"
                    onChange={descriptionText => {
                        setText(descriptionText);
                        SaveData(descriptionText)
                    }}
                />
            </KeyboardAvoidingView>
            <View style={{ position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <RichToolbar
                    editor={richText}
                    iconTint={"black"}
                    disabled={false}
                    selectedIconTint={"black"}
                    style={{ borderRadius: 10 }}
                    onPressAddImage={onPressAddImage}
                    actions={[
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertImage,
                        actions.insertOrderedList,
                        actions.insertBulletsList
                    ]}
                    iconMap={{
                        [actions.alignLeft]: alignLeft,
                        [actions.alignRight]: alignRight,
                        [actions.alignCenter]: alignCenter,
                        [actions.setBold]: setBold,
                        [actions.setItalic]: setItalic,
                        [actions.insertImage]: insertImage
                    }}
                />
            </View>
        </>
    );
};


export default TextEditorComponent