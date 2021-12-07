import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { CAMERA_SCREEN, MAIN_SCREEN, RootStackParamList } from '../../App';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof CAMERA_SCREEN>;
  route?: RouteProp<RootStackParamList, typeof CAMERA_SCREEN>;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation, route }) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(route?.params?.uri);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [hereFromGallery, setHereFromGallery] = useState<boolean | undefined>(
    route?.params?.hereFromGallery,
  );

  const takePhoto = async () => {
    if (cameraRef?.current?.takePictureAsync) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setHereFromGallery(false);
        setPhotoUri(data.uri);
        setFlashOn(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retakePhoto = () => {
    setPhotoUri(undefined);
  };

  const savePhoto = () => {
    if (photoUri) {
      navigation.navigate(MAIN_SCREEN, { uri: photoUri });
    }
  };

  const toggleFlash = () => {
    setFlashOn((flashOn) => !flashOn);
  };

  const PreviewImgLayout = (
    <>
      <Image style={styles.lastPhoto} source={{ uri: photoUri }} />
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={savePhoto}>
          <Icon name={'save-outline'} color={'white'} size={40} />
        </TouchableOpacity>
        {hereFromGallery ? (
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Icon name={'exit-outline'} color={'white'} size={40} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={retakePhoto}>
            <Icon name={'refresh-outline'} color={'white'} size={40} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  const CameraModeLayout = (
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.button} onPress={toggleFlash}>
        <Icon name={flashOn ? 'flash-off-outline' : 'flash-outline'} color={'white'} size={40} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Icon name={'camera'} color={'white'} size={40} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Icon name={'exit-outline'} color={'white'} size={40} />
      </TouchableOpacity>
    </View>
  );

  return (
    <RNCamera ref={cameraRef} flashMode={flashOn ? 'torch' : 'off'} style={styles.camera}>
      {photoUri ? PreviewImgLayout : CameraModeLayout}
    </RNCamera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  lastPhoto: {
    flex: 1,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
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
