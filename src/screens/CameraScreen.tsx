import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { CAMERA_SCREEN, MAIN_SCREEN, RootStackParamList } from '../../App';
import { addPhoto } from '../../store/actions';
import { CameraScreenButton } from '../components/CameraScreenButton';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof CAMERA_SCREEN>;
  route?: RouteProp<RootStackParamList, typeof CAMERA_SCREEN>;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation, route }) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(route?.params?.uri);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isHereFromGallery = route?.params?.hereFromGallery;

  const addPhotoHandler = () => {
    if (photoUri) {
      dispatch(addPhoto(photoUri));

      navigation.navigate(MAIN_SCREEN);
    }
  };

  const takePhoto = async () => {
    if (cameraRef?.current?.takePictureAsync) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);

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

  const toggleFlash = () => {
    setFlashOn((prevFlashState) => !prevFlashState);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const PreviewImgLayout = (
    <>
      <Image style={styles.lastPhoto} source={{ uri: photoUri }} />
      <View style={styles.bottomSection}>
        <CameraScreenButton iconName={'save-outline'} onPress={addPhotoHandler} />
        {isHereFromGallery ? (
          <CameraScreenButton iconName={'exit-outline'} onPress={goBack} />
        ) : (
          <CameraScreenButton iconName={'refresh-outline'} onPress={retakePhoto} />
        )}
      </View>
    </>
  );

  const CameraModeLayout = (
    <View style={styles.bottomSection}>
      <CameraScreenButton
        iconName={flashOn ? 'flash-off-outline' : 'flash-outline'}
        onPress={toggleFlash}
      />
      <CameraScreenButton iconName={'camera'} onPress={takePhoto} />

      <CameraScreenButton iconName={'exit-outline'} onPress={goBack} />
    </View>
  );

  return (
    <RNCamera ref={cameraRef} style={styles.camera} flashMode={flashOn ? 'torch' : 'off'}>
      {photoUri ? PreviewImgLayout : CameraModeLayout}
    </RNCamera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
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
});
