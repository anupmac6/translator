import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SegmentedControlRN from '@react-native-segmented-control/segmented-control';
import Colors from '../../constants/colors';

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
        // style={{ backgroundColor: Colors.gray1 }}
      />
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({});
