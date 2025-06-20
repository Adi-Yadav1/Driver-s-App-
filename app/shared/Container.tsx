// app/shared/Container.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
});

export default Container;
