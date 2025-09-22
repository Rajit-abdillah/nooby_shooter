import Button from "../components/solid-button";

export function GameOver() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-500">game over</div>
      <Button text="play again?" to="/" className="bg-green-500"/>
      </div>
    </>
  );
}

export default GameOver;
