'use strict';

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

  // Function to announce the winner
  const announceWinner = (winner) => {
    alert(`Player ${winner.toUpperCase()} is the winner!`);
  }

  const cellPressHandler = (rowIndex, cellIndex) => {
    if (gameMap[rowIndex][cellIndex] !== null) {
      // If the cell is already filled, do nothing
      alert('Cell already occupied');
      return;
    }

    const newGameMap = [...gameMap]; // Creating a new array to store the new game board
    newGameMap[rowIndex][cellIndex] = player; // Update the value of the cell
    setGameMap(newGameMap); // Update the state

    const winState = (cell) => cell === player;

    if (gameMap[rowIndex].every(winState)) {
      // If all the cells in the row are equal to the player (horizontal win)
      setTimeout(announceWinner, 200, player);
      return;
    }

    let verticalWinArr = [];
    let tieCheckArr = [];

    gameMap.forEach((row, index) => {
      verticalWinArr.push(row[cellIndex]);
      // Push the value of all the cells in the same column as the pressed cell

      tieCheckArr.push(row[0]);
      tieCheckArr.push(row[1]);
      tieCheckArr.push(row[2]);
      // Push the value of all cells
    });

    if (verticalWinArr.every(winState)) {
      // If all the cells in the column are equal to the player (vertical win)
      setTimeout(announceWinner, 200, player); // Delay before announcing the winner
      return;
    }

    if (gameMap[0][0] === player && gameMap[1][1] === player && gameMap[2][2] === player) {
      // If the top left to bottom right diagonal is equal to the player (diagonal win)
      setTimeout(announceWinner, 200, player);
      return;
    }

    if (gameMap[0][2] === player && gameMap[1][1] === player && gameMap[2][0] === player) {
      // If the top right to bottom left diagonal is equal to the player (diagonal win)
      setTimeout(announceWinner, 200, player);
      return;
    }

    if (tieCheckArr.every((cell) => cell != null)) {
      // If none of the cells are null (tie)
      setTimeout(() => alert('Tie!'), 200);
      return;
    }

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

                {cell === 'o' && (
                  <View style={[styles.circle, styles.center]} />
                )}

                {cell === 'x' && (
                  <View style={[styles.cross]}>
                    <View style={styles.crossLine} />
                    <View style={[styles.crossLine, styles.crossLineReversed]} />
                  </View>
                )}
              </Pressable>
            )}
          </View>
        ))}
      </View>

      {/* Resets the gameboard */}
      <Pressable style={[styles.center]}
        onPress={() => setGameMap([
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