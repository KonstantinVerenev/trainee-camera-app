import React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { MAIN_SCREEN, CAMERA_SCREEN, RootStackParamList } from '../../App';
import { PhotoData } from '../../store/types';
import { selectPhotoData } from '../../store/selectors';
import { useSelector } from 'react-redux';

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof MAIN_SCREEN>;
  route?: RouteProp<RootStackParamList, typeof MAIN_SCREEN>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const photoData = useSelector(selectPhotoData);

  const navigateToCameraScreen = (): void => {
    navigation.navigate(CAMERA_SCREEN);
  };

  const renderItem: ListRenderItem<PhotoData> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.photoItem}
        onPress={() => {
          navigation.navigate(CAMERA_SCREEN, { uri: item.uri, hereFromGallery: true });
        }}>
        <Image style={styles.photoImage} source={{ uri: item.uri }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.photoList}
        data={photoData}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.warningText}>Нет фото. Сфотографируйте что нибудь.</Text>
        }
      />
      <TouchableOpacity style={styles.button} onPress={navigateToCameraScreen}>
        <Text style={styles.buttonText}>Открыть камеру</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  photoList: {
    flex: 1,
  },
  photoItem: {
    flex: 1,
    maxWidth: '50%',
    height: 200,
    padding: 10,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  warningText: {
    marginVertical: 25,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
  },
});
