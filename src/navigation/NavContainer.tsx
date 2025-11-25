import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./StackNavigator";

export const NavContainer = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;