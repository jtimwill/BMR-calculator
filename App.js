// Reference:
// 1. https://reactnativeelements.com/docs/slider
// 2. https://callstack.github.io/react-native-paper/
// 3. https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
// 4. https://ethercreative.github.io/react-native-shadow-generator/ 

import * as React from 'react';
import { Provider, Appbar, Button, Text, Paragraph, Dialog, Portal } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Slider } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

const MyComponent = () => {
  const [sex, setSex] = React.useState("male");
  const [height, setHeight] = React.useState(0);
  const heightScale = 96;
  const weightScale = 300;
  const ageScale = 100;
  const [weight, setWeight] = React.useState(0);
  const [age, setAge] = React.useState(0);
  const [bmr, setBMR] = React.useState(0);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    calculateBMR();
    setVisible(true);
  }

  const hideDialog = () => setVisible(false);

  const calculateBMR = () => {
    let calories = 10 * weight * weightScale / 2.205 + 6.25 * 2.54 * height * heightScale - 5 * age * ageScale;
    if (sex === 'female')
      calories -= 161;
    else
      calories += 5;
    setBMR(parseInt(calories));
  }

  const toFeetString = (inches) => {
    const feet = Math.floor(inches / 12);
    const leftOverInches = inches - feet * 12;
    return feet + "'" + leftOverInches + "\"";
  }

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="BMR Calculator" titleStyle={{
          fontSize: 25,
          fontWeight: "bold",
        }} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.sexButtonContainer}>
          <TouchableOpacity
            style={[(sex === 'male') ? [styles.sexButtonActive, styles.shadowStyles] : styles.sexButton, styles.customMarginRight]}
            onPress={() => setSex('male')}
          >
            <Ionicons name="male-sharp" size={64} color={(sex === 'male') ? '#6200EE' : 'grey'} />
            <Text style={(sex === 'male') ? styles.sexTextActive : styles.sexText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[(sex === 'female') ? [styles.sexButtonActive, styles.shadowStyles] : styles.sexButton]}
            onPress={() => setSex('female')}
          >
            <Ionicons name="female-sharp" size={64} color={(sex === 'female') ? '#6200EE' : 'grey'} />
            <Text style={(sex === 'female') ? styles.sexTextActive : styles.sexText}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderParentContainer}>
          <View style={[styles.sliderRowContainer, styles.shadowStyles]}>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderText}>Height:
                <Text style={styles.sliderValueText}> {toFeetString(parseInt(height * heightScale))}</Text>
              </Text>
              <Slider
                trackStyle={{ height: 5, backgroundColor: '#6200EE' }}
                thumbStyle={{ height: 25, width: 25, backgroundColor: '#6200EE' }}
                value={height}
                onValueChange={(value) => setHeight(value)}
              />
            </View>
            <View style={styles.sliderIconContainer}>
              <FontAwesome5 name="ruler-vertical" size={56} color="white" />
            </View>
          </View>
          <View style={[styles.sliderRowContainer, styles.shadowStyles]}>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderText}>Weight:
                <Text style={styles.sliderValueText}> {parseInt(weight * weightScale)} lb</Text>
              </Text>
              <Slider
                trackStyle={{ height: 5, backgroundColor: '#6200EE' }}
                thumbStyle={{ height: 25, width: 25, backgroundColor: '#6200EE' }}
                value={weight}
                onValueChange={(value) => setWeight(value)}
              />
            </View>
            <View style={styles.sliderIconContainer}>
              <MaterialCommunityIcons name="scale-bathroom" size={56} color="white" />
            </View>
          </View>
          <View style={[styles.sliderRowContainer, styles.shadowStyles]}>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderText}>Age:
                <Text style={styles.sliderValueText}> {parseInt(age * ageScale)}</Text>
              </Text>
              <Slider
                trackStyle={{ height: 5, backgroundColor: '#6200EE' }}
                thumbStyle={{ height: 25, width: 25, backgroundColor: '#6200EE' }}
                value={age}
                onValueChange={(value) => setAge(value)}
              />
            </View>
            <View style={styles.sliderIconContainer}>
              <FontAwesome name="hourglass" size={56} color="white" />
            </View>
          </View>
        </View>
        <View style={[styles.buttonContainer, styles.shadowStylesStrong]}>
          <TouchableOpacity onPress={showDialog} style={styles.button}>
            <Text style={styles.buttonText}>Calculate BMR</Text>
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title style={styles.dialogTitle}>Basal Metabolic Rate</Dialog.Title>
              <Dialog.Content>
                <Paragraph style={styles.dialogParagraph}>≈ {bmr} Calories / day</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Close</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
      <Appbar style={styles.bottom} />
    </Provider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4
  },
  sexButtonContainer: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 10,
  },
  sliderParentContainer: {
    flex: 3.75,
    justifyContent: 'space-around'
  },
  sliderRowContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 8
  },
  sliderContainer: {
    flex: 2.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'space-around',
    padding: 15
  },
  sliderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  sliderIconContainer: {
    flex: 1.25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0.70,
  },
  bottom: {},
  button: {
    margin: 8,
    backgroundColor: '#03DAC6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  sexButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 8,
    padding: 6,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sexButtonActive: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 6,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sexText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
  },
  sexTextActive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  customMarginRight: {
    marginRight: 4
  },
  buttonText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
  },
  dialogTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  dialogParagraph: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200EE",
  },
  shadowStyles: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  shadowStylesStrong: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.27,
    elevation: 10,
  },
  sliderValueText: {
    fontSize: 20,
    color: "#6200EE",
    fontWeight: "bold",
  },
});

export default MyComponent;