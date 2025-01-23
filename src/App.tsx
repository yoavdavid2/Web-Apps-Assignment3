import react, { useState } from "React";
import { BoardState, Player } from "./types";
import { Container, Paper, Typography, Grid, Button, Box } from "@mui/material";

const App = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw">(null);

  const checkWinner = (boardState: BoardState): Player | "Draw" | null => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    return boardState.every((cell) => cell) ? "Draw" : null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Tic Tac Toe
        </Typography>

        {winner ? (
          <Typography variant="h6" color="primary" sx={{ marginBottom: 2 }}>
            {winner === "Draw" ? "Draw!" : `Player ${winner} Wins!`}
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Current Player: {currentPlayer}
          </Typography>
        )}

        <Grid
          container
          spacing={1}
          sx={{
            width: "100%",
            margin: "auto",
          }}
        >
          {board.map((cell, index) => (
            <Grid item xs={4} key={index}>
              <Button
                variant="contained"
                color={cell === "X" ? "primary" : "secondary"}
                sx={{
                  height: 100,
                  fontSize: "3rem",
                  width: "100%",
                }}
                onClick={() => handleCellClick(index)}
                disabled={!!cell || !!winner}
              >
                {cell || " "}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined" color="primary" onClick={resetGame}>
            Reset Game
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default App;
