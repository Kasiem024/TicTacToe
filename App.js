import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {

  // Creating 2D array for the game board
  // will be used to store the values of the game
  const [gameMap, setGameMap] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [player, setPlayer] = useState('x'); // Creating the player variable to store the current player

  const cellPressHandler = (rowIndex, cellIndex) => {
    if (gameMap[rowIndex][cellIndex] !== null) { // If the cell is already filled, do nothing
      alert('Cell already occupied');
      return;
    }

    const newGameMap = [...gameMap]; // copy the array
    newGameMap[rowIndex][cellIndex] = player; // update the value of the cell
    setGameMap(newGameMap); // update the state

    setPlayer(player === 'x' ? 'o' : 'x'); // switch the player
  }

  return (
    <View style={[styles.container, styles.center]}>

      <Text style={styles.title}>
        Tic Tac Toe {'\n'} Player {player.toUpperCase()}'s turn
      </Text>

      <View style={styles.map}>

        {/* Loop through the game board and display the values */}

        {gameMap.map((row, rowIndex) => ( // For each row (array inside gameMap)
          <View style={styles.row}>
            {row.map((cell, cellIndex) => // For each cell (value inside row)
              <Pressable onPress={() => cellPressHandler(rowIndex, cellIndex)} style={[styles.cell, styles.center]}>

                {cell === 'o' && ( // If cell is 'o'
                  <View style={[styles.circle, styles.center]} /> // Display a circle
                )}

                {cell === 'x' && ( // If cell is 'x'
                  <View style={[styles.cross]}>
                    <View style={styles.crossLine} /> {/* Top line */}
                    <View style={[styles.crossLine, styles.crossLineReversed]} /> {/* Bottom line */}
                  </View>

                )}
              </Pressable>
            )}
          </View>
        ))}
      </View>

      <Pressable style={[styles.center]} onPress={() => setGameMap([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])}>
        <Text style={[styles.btn, styles.center]}>Reset</Text>
      </Pressable>
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
    backgroundColor: '#242D34',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    aspectRatio: 1,
    borderColor: 'white',
    borderWidth: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 2,
  },
  circle: {
    width: '85%',
    height: '85%',
    borderRadius: '100%',
    borderColor: 'white',
    borderWidth: 10,
  },
  cross: {
    flex: 1,
  },
  crossLine: {
    position: 'absolute',
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  crossLineReversed: {
    transform: [{ rotate: '-45deg' }],
  },
  btn: {
    backgroundColor: 'rgb(13,60,150)',
    fontSize: 25,
    marginTop: 20,
    padding: 10,
  },
});
