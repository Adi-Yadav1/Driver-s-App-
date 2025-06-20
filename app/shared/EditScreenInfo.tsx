import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type EditScreenInfoProps = {
  path: string;
};

const EditScreenInfo = ({ path }: EditScreenInfoProps) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pathContainer}>
        <Text style={styles.pathText}>{path}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default EditScreenInfo; // ✅ default export added

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  pathContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
  },
  pathText: {
    fontSize: 14,
    fontFamily: 'Courier',
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#666',
  },
});
