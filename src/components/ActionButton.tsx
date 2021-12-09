import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ActionButtonProps = {
  iconName: string;
  onPress: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={iconName} color={'white'} size={40} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
  },
});
