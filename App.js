import { StatusBar } from 'expo-status-bar';
import StackNavigator from "./src/navigation/StackNavigator";
import {AuthProvider} from "./src/contexts/Auth";
import {Provider} from "react-redux";
import store from "./src/store";
import { ModalPortal } from 'react-native-modals'
import {UserContext} from "./src/contexts/UserContext";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <UserContext>
            <StatusBar style={"auto"} />
            <StackNavigator />
            <ModalPortal />
          </UserContext>
        </AuthProvider>
      </Provider>
    </>
  )
}
