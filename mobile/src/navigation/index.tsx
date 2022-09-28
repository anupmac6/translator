import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./stack/AuthStack";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsAddSheetOpen,
  getIsLoggedIn,
  getShowOnboarding,
  setIsAddSheetOpen,
} from "../store/app/slice";
import OnboardingStack from "./stack/OnboardingStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTab from "./tabs/BottomTab";
import AppDrawer from "./drawer/AppDrawer";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const Navigation = () => {
  const showOnboarding = useSelector(getShowOnboarding);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isAddSheetOpen = useSelector(getIsAddSheetOpen);

  const dispatch = useDispatch();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      dispatch(setIsAddSheetOpen(false));
    }
  }, []);

  useEffect(() => {
    if (isAddSheetOpen) {
      handlePresentModalPress();
    }
  }, [isAddSheetOpen]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {showOnboarding && <OnboardingStack />}
          {!showOnboarding && !isLoggedIn && <AuthStack />}
          {!showOnboarding && isLoggedIn && <AppDrawer />}
        </NavigationContainer>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
