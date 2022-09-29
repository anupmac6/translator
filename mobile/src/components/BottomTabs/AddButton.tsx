import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { setIsAddSheetOpen } from '../../store/app/slice';
import * as Haptics from 'expo-haptics';
import Style from '../../constants/styles';

const AddButton = () => {
  const dispatch = useDispatch();

  const onTapHandler = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(setIsAddSheetOpen(true));
  }, [Haptics]);
  return (
    <Pressable style={styles.container} onPress={onTapHandler}>
      <View style={styles.box}>
        <AntDesign name="plus" size={24} color={Colors.white} />
      </View>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary1,
    borderRadius: 30,

    ...Style.dropShadow,
  },
  box: {},
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
