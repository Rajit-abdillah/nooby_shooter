import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadioImage, Modal } from "../components/index";

export function Welcome() {
  const [gun, setGun] = useState("");
  const [target, setTarget] = useState("");
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const [playing, setPlaying] = useState(false);  
  const [timer, setTimer] = useState(30);  

  useEffect(() => {
    if (level === "easy") {
      setTimer(60);
    }
    if (level === "medium") {
      setTimer(45);
    }
    if (level === "hard") {
      setTimer(30);
    }
  }, [level]);

  useEffect(() => {
    if (!playing || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [playing, timer]);

  return (
    <div className="bg-[url('/assets/Sprites/welcome-bg.jpg')]">
      <main className="pt-16 p-4 container mx-auto w-[500px] rounded bg-transparent backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-10">
          <img src="/assets/Sprites/shooter.png" alt="Shooter game" />
        </div>

        <div className="flex flex-col items-center justify-center pt-10">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 border border-gray-300 rounded"
          />

          <select
            name="levels"
            id="levels"
            className="p-4 border border-gray-300 rounded mt-5 text-black bg-white"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="" disabled>
              Select a level
            </option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>

          <div className="mt-10 flex flex-wrap flex-col gap-10">
            <div className="flex flex-col gap-10">
              <h2>Choose your gun</h2>
              <div className="flex gap-6">
                <RadioImage
                  name="gun"
                  value="gun1"
                  src="/assets/Sprites/gun1.png"
                  alt="Gun 1"
                  selectedValue={gun}
                  onChange={setGun}
                />
                <RadioImage
                  name="gun"
                  value="gun2"
                  src="/assets/Sprites/gun2.png"
                  alt="Gun 2"
                  selectedValue={gun}
                  onChange={setGun}
                />
              </div>

              <h2>Choose your target</h2>
              <div className="flex gap-6">
                <RadioImage
                  name="target"
                  value="target1"
                  src="/assets/Sprites/target1.png"
                  alt="Target 1"
                  selectedValue={target}
                  onChange={setTarget}
                />
                <RadioImage
                  name="target"
                  value="target2"
                  src="/assets/Sprites/target2.png"
                  alt="Target 2"
                  selectedValue={target}
                  onChange={setTarget}
                />
                <RadioImage
                  name="target"
                  value="target3"
                  src="/assets/Sprites/target3.png"
                  alt="Target 3"
                  selectedValue={target}
                  onChange={setTarget}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Link
            to="/game"
            state={{ username, level, gun, target }}
            onClick={() => setPlaying(true)}
            className={`mt-10 px-6 py-3 rounded ${
              username && level && gun && target
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-gray-200 pointer-events-none"
            }`}
          >
            Start Game
          </Link>

          <Modal />
        </div>
      </main>
    </div>
  );
}

export default Welcome;
