import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { getIsAddSheetOpen, setIsAddSheetOpen } from "../../store/app/slice";

const AddBottomSheet = () => {
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
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleComponent={null}
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
};

export default AddBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
