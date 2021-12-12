import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Animated, PanResponder } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import prompt from 'react-native-prompt-android';

import { CAMERA_SCREEN, MAIN_SCREEN, RootStackParamList } from '../../App';
import { addPhoto, updatePhoto } from '../../store/actions';
import { ActionButton } from '../components/ActionButton';
import { selectPhotoData } from '../../store/selectors';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof CAMERA_SCREEN>;
  route?: RouteProp<RootStackParamList, typeof CAMERA_SCREEN>;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const cameraRef = useRef<RNCamera | null>(null);
  const [flashOn, setFlashOn] = useState<boolean>(false);

  const id = route?.params?.id;
  const photoDataItem = useSelector(selectPhotoData).find((photo) => photo.id === id);
  const { uri, labelText: initialLabelText, xPosition, yPosition } = photoDataItem || {};
  const [photoUri, setPhotoUri] = useState<string | undefined>(uri);
  const [labelText, setLabelText] = useState<string | undefined>(initialLabelText);

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({
          x: 0,
          y: 0,
        });
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        Animated.timing(scale, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const savePhoto = () => {
    if (id && photoUri) {
      dispatch(
        updatePhoto({
          id,
          uri: photoUri,
          labelText,
          xPosition: xPosition + pan.x._value,
          yPosition: yPosition + pan.y._value,
        }),
      );
    } else if (photoUri) {
      dispatch(
        addPhoto({
          uri: photoUri,
          labelText,
          xPosition: pan.x._value,
          yPosition: pan.y._value,
        }),
      );
    }

    navigation.navigate(MAIN_SCREEN);
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

  const onEditLabelText = () => {
    prompt(
      'Enter text',
      'Enter your label text',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: (text) => setLabelText(text) },
      ],
      {
        defaultValue: labelText,
        placeholder: 'label text',
      },
    );
  };

  const PreviewImgLayout = (
    <>
      <ImageBackground style={styles.lastPhoto} source={{ uri: photoUri }}>
        {labelText ? (
          <Animated.View
            style={{
              left: xPosition,
              top: yPosition,
              transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scale }],
            }}
            {...panResponder.panHandlers}>
            <Text style={{ ...styles.labelText }}>{labelText}</Text>
          </Animated.View>
        ) : null}
      </ImageBackground>
      <View style={styles.bottomSection}>
        <ActionButton iconName={'save-outline'} onPress={savePhoto} />
        <ActionButton iconName={'text-outline'} onPress={onEditLabelText} />
        {id ? (
          <ActionButton iconName={'exit-outline'} onPress={goBack} />
        ) : (
          <ActionButton iconName={'refresh-outline'} onPress={retakePhoto} />
        )}
      </View>
    </>
  );

  const CameraModeLayout = (
    <View style={styles.bottomSection}>
      <ActionButton
        iconName={flashOn ? 'flash-off-outline' : 'flash-outline'}
        onPress={toggleFlash}
      />
      <ActionButton iconName={'camera'} onPress={takePhoto} />
      <ActionButton iconName={'exit-outline'} onPress={goBack} />
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
    justifyContent: 'center',
    alignItems: 'center',
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
  labelText: {
    fontSize: 40,
    color: 'white',
  },
});
