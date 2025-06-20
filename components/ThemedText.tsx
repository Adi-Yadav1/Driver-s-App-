import React from 'react';
import { Text, type TextProps } from 'react-native';

export function ThemedText(props: TextProps) {
  const { style, ...rest } = props;
  return <Text style={[{ color: '#000' }, style]} {...rest} />; 
}