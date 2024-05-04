import { StatusBar } from 'expo-status-bar';
import StackNavigator from "./src/navigation/StackNavigator";
import {AuthProvider} from "./src/contexts/Auth";

export default function App() {
  return (
    <>
      <AuthProvider>
        <StatusBar style={"auto"} />
        <StackNavigator />
      </AuthProvider>
    </>
  )
}
