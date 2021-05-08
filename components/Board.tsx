import React, { useRef, useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Piece from './Piece';
import Background from './Background';
import { SIZE } from './Notation';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}

const Board = () => {
  const chess = useConst(() => new Chess());
  const [status, setStatus] = useState({
    player: 'w',
    board: chess.board(),
  });

  return (
    <View style={styles.container}>
      {status.board.map((row, index) => {
        row.map((square, squareIndex) => {
          if (square === null) {
            return null;
          }
          return (
            <Piece
              id={`${square.color}${square.type}` as const}
              position={{ x: squareIndex * SIZE, y: index * SIZE }}
            />
          );
        });
      })}
      <Background />
    </View>
  );
};

export default Board;
