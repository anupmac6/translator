import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SegmentedControlRN from '@react-native-segmented-control/segmented-control';

interface SegmentedControlProps {
  values: [string, string];
  selectedIndex: number;
  onChange: (selectedIndex: number) => void;
}
const SegmentedControl = ({
  selectedIndex = 0,
  onChange,
  values,
}: SegmentedControlProps) => {
  return (
    <View>
      <SegmentedControlRN
        values={values}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          onChange(event.nativeEvent.selectedSegmentIndex);
        }}
      />
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({});
