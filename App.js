import { StatusBar } from 'expo-status-bar';
import StackNavigator from "./src/navigation/StackNavigator";
import {AuthProvider} from "./src/contexts/Auth";
import {Provider} from "react-redux";
import store from "./src/store";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <StatusBar style={"auto"} />
          <StackNavigator />
        </Provider>
      </AuthProvider>
    </>
  )
}
