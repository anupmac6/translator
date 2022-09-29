import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAddSheetOpen, setIsAddSheetOpen } from '../../store/app/slice';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { MaterialIcons } from '@expo/vector-icons';

const AddBottomSheet = () => {
  const isAddSheetOpen = useSelector(getIsAddSheetOpen);

  const dispatch = useDispatch();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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
        <Pressable
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          <Feather name="file-text" size={24} color="black" />
          <Text style={styles.itemText}>Translate Text</Text>
        </Pressable>
        <View style={styles.divider}></View>
        <Pressable
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          <Feather name="image" size={24} color="black" />
          <Text style={styles.itemText}>Translate Image</Text>
        </Pressable>
        <View style={styles.divider}></View>
        <Pressable
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          <MaterialIcons name="keyboard-voice" size={24} color="black" />
          <Text style={styles.itemText}>Translate Voice</Text>
        </Pressable>
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  itemText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray,
    marginVertical: 5,
    marginHorizontal: '20%',
  },
  pressed: {
    backgroundColor: Colors.primary,
  },
});
