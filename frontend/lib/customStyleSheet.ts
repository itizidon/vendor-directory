import { StyleSheet } from 'aphrodite';
import color from './color';

const bp = 8;

export default function customStyleSheet(f) {
  return {
    ...StyleSheet.create(
      f({
        color,
        bp,
      }),
    ),
  };
}
