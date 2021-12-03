import React, { useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid, Platform } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/Ionicons';

const CameraScreen: React.FC = () => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState<boolean>(false);

  const takePhoto = async () => {
    if (cameraRef?.current?.takePictureAsync) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log(data.uri);
        setLastPhotoUri(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retakePhoto = () => {
    setLastPhotoUri(null);
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const savePhoto = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    if (lastPhotoUri) {
      try {
        void CameraRoll.save(lastPhotoUri);
        Alert.alert('Photo saved', 'Photo was saved in your Camera roll');
        retakePhoto();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleFlash = () => {
    setFlashOn((flashOn) => !flashOn);
  };

  if (lastPhotoUri) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.lastPhoto} source={{ uri: lastPhotoUri }} />
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.button} onPress={savePhoto}>
            <Icon name={'save-outline'} color={'white'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={retakePhoto}>
            <Icon name={'refresh-outline'} color={'white'} size={40} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={cameraRef}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        style={styles.camera}></RNCamera>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
          <Icon name={flashOn ? 'flash-off-outline' : 'flash-outline'} color={'white'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Icon name={'camera'} color={'white'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('Back');
          }}>
          <Icon name={'exit-outline'} color={'white'} size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
