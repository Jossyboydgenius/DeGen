import BlackjackGame from "@/components/game/black-jack";



export default function BlackjackPage() {
  return (
    <div className="mt-20">
      <BlackjackGame />
    </div>
  );
}

export const metadata = {
  title: 'Blackjack Game',
  description: 'Play a classic game of Blackjack - Get as close to 21 as possible without going over!',
};