import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface GameState {
  username: string;
  level: string;
  gun: string;
  target: string;
}

export function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { username, level, gun, target } = state;

  // 🎯 Game states
  const [timer, setTimer] = useState(0);
  const [showTarget, setShowTarget] = useState(true);
  const [targetPos, setTargetPos] = useState({ x: 200, y: 200 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetPos({
        x: Math.floor(Math.random() * 900), // width range
        y: Math.floor(Math.random() * 300) + 100, // height range
      });
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  function Cooldown() {
    setShowTarget(false);
    setTimeout(() => {
      setShowTarget(true);
    }, 2500);
  }

  // 🎯 Set timer based on level when component mounts
  useEffect(() => {
    if (level === "easy") setTimer(60);
    if (level === "medium") setTimer(45);
    if (level === "hard") setTimer(30);
  }, [level]);

  // 🎯 Countdown effect
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);    

    return () => clearInterval(interval);
  }, [timer]);

  if (timer <= 0) {
    navigate("/gameover", { state: { username, level, gun, target } });
  }

  return (
    <>
      <div className="fixed top-0 left-0 flex flex-row gap-10">
        <h1 className="text-3xl font-bold text-black">Shooter Game</h1>
        <p className="text-2xl font-bold text-black">Player: {username}</p>
        <p className="text-2xl font-bold text-red-500">Time Left: {timer}s</p>
        <p className="text-2xl font-bold text-green-500">Score: {score}</p>
      </div>

      {/* Target (hidden when showTarget = false) */}
      {showTarget && (
        <img
          src={`/src/assets/Sprites/${target}.png`}
          alt="Target"
          style={{
            position: "absolute",
            left: targetPos.x,
            top: targetPos.y,
            width: "80px",
          }}
          onClick={() => {
            setScore((prev) => prev + 1);
            Cooldown();
          }}
        />
      )}

      {/* Gun positioned at bottom */}
      <img
        src={`/src/assets/Sprites/${gun}.png`}
        alt="Gun"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        style={{ width: "300px" }}
      />
    </>
  );
}

export default GamePage;
