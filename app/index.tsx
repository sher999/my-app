import { Text, View } from "react-native";
import App from "./App";
import { PaperProvider } from 'react-native-paper';

export default function Index() {
  return (
    <PaperProvider>
      <App/>
    </PaperProvider>
  );
}
