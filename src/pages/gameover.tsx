import { useLocation } from "react-router-dom";
import Button from "../components/solid-button";

interface GameOverState {
  username: string;
  level: string;
  gun: string;
  score: number; // Add this
}

export function GameOver() {
  const location = useLocation();
  const state = location.state as GameOverState | null;

  if (!state) {
    // Handle case where no state is passed
    return <div>No game data found</div>;
  }

  const { username, score } = state; // Destructure what you need

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-red-500">Game Over!</h1>
      <p className="text-black">Player: {username}</p>
      <p className="text-black">Final Score: {score}</p>
      <Button
        className="mt-10 bg-green-500 text-white"
        to="/"
        text="Play Again"
      />
    </div>
  );
}

export default GameOver;
