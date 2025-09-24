import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Explosion  } from "../assets/Sprites";

interface GameState {
  username: string;
  level: string;
  gun: string;
  target: string;
  playing: boolean;
}

export function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { username, level, gun } = state;

  const [timer, setTimer] = useState(0);

  const [targets, setTargets] = useState([
    { id: 1, x: 200, y: 200, visible: true, showBoom: false },
    { id: 2, x: 400, y: 300, visible: true, showBoom: false },
    { id: 3, x: 600, y: 150, visible: true, showBoom: false },
  ]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargets((prevTargets) =>
        prevTargets.map((target) => ({
          ...target,
          x: Math.floor(Math.random() * 900),
          y: Math.floor(Math.random() * 300) + 100,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const DifficultyPoints = (level: string) => {
    switch (level) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };

  function Cooldown(targetId: number) {
    setTargets((prevTargets) =>
      prevTargets.map((target) =>
        target.id === targetId
          ? { ...target, visible: false, showBoom: true }
          : target
      )
    );

    setTimeout(() => {
      setTargets((prevTargets) =>
        prevTargets.map((target) =>
          target.id === targetId ? { ...target, showBoom: false } : target
        )
      );
    }, 200);

    setTimeout(() => {
      setTargets((prevTargets) =>
        prevTargets.map((target) =>
          target.id === targetId ? { ...target, visible: true } : target
        )
      );
    }, 2500); // Show target again after 2.5s
  }

  useEffect(() => {
    if (level === "easy") setTimer(60);
    if (level === "medium") setTimer(45);
    if (level === "hard") setTimer(30);
  }, [level]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  if (timer <= 0) {
    navigate("/gameover", { state: { username, level, gun, score } });    
  }


  return (
    <>
      <div className="bg-[url(/src/assets/Sprites/background.jpg)] bg-cover h-screen"></div>
      <div className="fixed top-0 left-0 flex flex-row gap-10 bg-amber-800 w-full p-2">
        <h1 className="text-3xl font-bold">Shooter Game</h1>
        <p className="text-2xl font-bold">Player: {username}</p>
        <p className="text-2xl font-bold text-red-500">Time Left: {timer}s</p>
        <p className="text-2xl font-bold text-green-500">Score: {score}</p>
      </div>

      {targets.map((targetObj) => (
        <div key={targetObj.id}>
          {/* Regular target */}
          {targetObj.visible && (
            <img
              src={`/src/assets/Sprites/${state.target}.png`}
              alt="Target"
              style={{
                position: "absolute",
                left: targetObj.x,
                top: targetObj.y,
                width: "80px",
              }}
              onClick={() => {
                setScore(score + DifficultyPoints(level));
                Cooldown(targetObj.id);
              }}
            />
          )}

          {/* Boom effect */}
          {targetObj.showBoom && (
            <img
              src={Explosion}
              alt="Boom"
              style={{
                position: "absolute",
                left: targetObj.x,
                top: targetObj.y,
                width: "80px",
              }}
            />
          )}
        </div>
      ))}

      {/* Gun positioned at bottom */}
      <img
        src={`/src/assets/Sprites/${state.gun}.png`}
        alt="Gun"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        style={{ width: "300px" }}
      />
    </>
  );
}

export default GamePage;
