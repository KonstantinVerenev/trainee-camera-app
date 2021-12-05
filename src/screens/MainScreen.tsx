import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../App';

const testPhotoData: Array<PhotoData> = [
  {
    id: 1,
    uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/IBM402plugboard.Shrigley.wireside.jpg',
    labelText: null,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 2,
    uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/IBM402plugboard.Shrigley.wireside.jpg',
    labelText: null,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 3,
    uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/IBM402plugboard.Shrigley.wireside.jpg',
    labelText: null,
    coordinates: {
      x: 0,
      y: 0,
    },
  },
];

type PhotoData = {
  id: number;
  uri: string;
  labelText: string | null;
  coordinates: {
    x: number;
    y: number;
  };
};

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainScreen'>;
  route?: RouteProp<RootStackParamList, 'MainScreen'>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const [photoData, setPhotoData] = useState<Array<PhotoData>>([]);
  // const [photoData, setPhotoData] = useState<Array<PhotoData>>(testPhotoData);

  useEffect(() => {
    setPhotoData((photoData) => {
      if (route?.params?.uri) {
        return [
          ...photoData,
          {
            id: 23232323,
            uri: route?.params?.uri,
            labelText: null,
            coordinates: {
              x: 0,
              y: 0,
            },
          },
        ];
      }
      return photoData;
    });
  }, [route?.params?.uri]);

  const renderItem: ListRenderItem<PhotoData> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.photoItem}>
        <Image style={styles.photoImage} source={{ uri: item.uri }} />
      </TouchableOpacity>
    );
  };

  if (!photoData.length) {
    return (
      <>
        <Text>Нет фото. Сфотографируйте что нибудь.</Text>
        <Button
          title={'Camera'}
          onPress={() => {
            navigation.navigate('CameraScreen');
          }}
        />
      </>
    );
  }

  return (
    <>
      <FlatList style={styles.container} data={photoData} renderItem={renderItem} numColumns={2} />
      <Button
        title={'Camera'}
        onPress={() => {
          navigation.navigate('CameraScreen');
        }}
      />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});
