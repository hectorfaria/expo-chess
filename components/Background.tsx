import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BLACK = 'rgb(118,150,86)';
const WHITE = 'rgb(238,238,210)';

interface RowProps {
  row: number;
  white: boolean;
}

interface SquareProps extends RowProps {
  col: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const Square = ({ white, row, col }: SquareProps) => {
  const backgroundColor = white ? BLACK : WHITE;
  const color = white ? WHITE : BLACK;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 4,
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          opacity: col === 0 ? 1 : 0,
          color,
          fontWeight: '500',
          fontSize: 10,
        }}
      >
        {'' + (8 - row)}
      </Text>
      {row === 7 && (
        <Text
          style={{
            alignSelf: 'flex-end',
            color,
            fontWeight: '500',
            fontSize: 10,
          }}
        >
          {String.fromCharCode(97 + col)}
        </Text>
      )}
    </View>
  );
};

const Row = ({ white, row }: RowProps) => {
  const offset = white ? 0 : 1;
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, index) => (
        <Square
          row={row}
          col={index}
          key={index}
          white={(index + offset) % 2 === 1}
        />
      ))}
    </View>
  );
};

const Background = () => (
  <View style={{ flex: 1 }}>
    {new Array(8).fill(0).map((_, index) => (
      <Row key={index} white={index % 2 === 0} row={index} />
    ))}
  </View>
);

export default Background;
