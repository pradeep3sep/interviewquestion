import { FC } from 'react';
import ChessBoard from './ChessBoard';
import styles from './chess-board.module.scss';

const Chess: FC = () => {
  return (
    <main className={styles.app}>
      <ChessBoard />
    </main>
  );
};

export default Chess;
