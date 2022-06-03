import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg'; // Importing the background image

export default function App() {

  // Creating 2D array for the game board
  // will be used to store the values of the game
  const [gameMap, setGameMap] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  return (
    <View style={[styles.container, styles.center]}>

      <ImageBackground source={bgImage} style={[styles.backgroundImage, styles.center]}>
        <View style={styles.map}>

          {gameMap.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map(cell =>
                <View style={[styles.cell, styles.center]}>
                  <View style={[styles.circle, styles.center]} />

                  {/* <View style={[styles.cross]}>
                    <View style={styles.crossLine} />
                    <View style={[styles.crossLine, styles.crossLineReversed]} />
                  </View> */}
                </View>
              )}
            </View>
          ))}

        </View>

      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#242D34', // The same color as the background image
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '78%',
    height: 1000,
    left: 5,
    top: '5%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
  },
  circle: {
    width: 225,
    height: 225,
    borderRadius: '100%',
    borderColor: 'white',
    borderWidth: 7,
  },
  cross: {
    width: 225,
    height: 225,
  },
  crossLine: {
    position: 'absolute',
    width: 10,
    height: 275,
    left: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  crossLineReversed: {
    transform: [{ rotate: '-45deg' }],
  },
});
