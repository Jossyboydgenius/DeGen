'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Shuffle, RotateCcw, Play } from 'lucide-react';

// Card types and interfaces
type Suit = '♠' | '♥' | '♦' | '♣';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

interface GameState {
  playerHand: Card[];
  dealerHand: Card[];
  deck: Card[];
  gameStatus: 'waiting' | 'playing' | 'player-win' | 'dealer-win' | 'push';
  playerScore: number;
  dealerScore: number;
  isPlayerTurn: boolean;
  gameOver: boolean;
}

// Card component
const CardComponent: React.FC<{ card: Card; isHidden?: boolean }> = ({ card, isHidden }) => {
  if (isHidden) {
    return (
      <div className="w-16 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
      </div>
    );
  }

  const isRed = card.suit === '♥' || card.suit === '♦';
  
  return (
    <div className="w-16 h-24 bg-white rounded-lg border-2 border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 text-black">
      <div className={`text-sm font-bold ${isRed ? 'text-red-500' : 'text-black'}`}>
        {card.rank}
      </div>
      <div className={`text-2xl ${isRed ? 'text-red-500' : 'text-black'}`}>
        {card.suit}
      </div>
      <div className={`text-sm font-bold rotate-180 ${isRed ? 'text-red-500' : 'text-black'}`}>
        {card.rank}
      </div>
    </div>
  );
};

// Hand component
const Hand: React.FC<{ cards: Card[]; title: string; score: number; hideFirstCard?: boolean }> = ({ 
  cards, title, score, hideFirstCard = false 
}) => (
  <div className="flex flex-col items-center space-y-3">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <div className="flex space-x-2">
      {cards.map((card, index) => (
        <CardComponent 
          key={`${card.suit}-${card.rank}-${index}`} 
          card={card} 
          isHidden={hideFirstCard && index === 0}
        />
      ))}
    </div>
    <div className="text-xl font-bold text-white">
      Score: {hideFirstCard ? '?' : score}
    </div>
  </div>
);

export default function BlackjackGame() {
  // Create a standard deck
  const createDeck = useCallback((): Card[] => {
    const suits: Suit[] = ['♠', '♥', '♦', '♣'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    suits.forEach(suit => {
      ranks.forEach(rank => {
        let value: number;
        if (rank === 'A') value = 11;
        else if (['J', 'Q', 'K'].includes(rank)) value = 10;
        else value = parseInt(rank);

        deck.push({ suit, rank, value });
      });
    });

    return shuffleDeck(deck);
  }, []);

  // Shuffle deck
  const shuffleDeck = (deck: Card[]): Card[] => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };

  // Calculate hand score
  const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let aces = 0;

    hand.forEach(card => {
      if (card.rank === 'A') {
        aces++;
        score += 11;
      } else {
        score += card.value;
      }
    });

    // Adjust for aces
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  // Initial game state
  const [gameState, setGameState] = useState<GameState>({
    playerHand: [],
    dealerHand: [],
    deck: [],
    gameStatus: 'waiting',
    playerScore: 0,
    dealerScore: 0,
    isPlayerTurn: true,
    gameOver: false
  });

  // Start new game
  const startNewGame = useCallback(() => {
    const newDeck = createDeck();
    const playerHand = [newDeck[0], newDeck[2]];
    const dealerHand = [newDeck[1], newDeck[3]];
    const remainingDeck = newDeck.slice(4);

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    setGameState({
      playerHand,
      dealerHand,
      deck: remainingDeck,
      gameStatus: playerScore === 21 ? 'player-win' : 'playing',
      playerScore,
      dealerScore,
      isPlayerTurn: playerScore !== 21,
      gameOver: playerScore === 21
    });
  }, [createDeck]);

  // Hit - draw a card
  const hit = () => {
    if (gameState.gameOver || !gameState.isPlayerTurn) return;

    const newCard = gameState.deck[0];
    const newPlayerHand = [...gameState.playerHand, newCard];
    const newDeck = gameState.deck.slice(1);
    const newScore = calculateScore(newPlayerHand);

    const isBust = newScore > 21;
    
    setGameState(prev => ({
      ...prev,
      playerHand: newPlayerHand,
      deck: newDeck,
      playerScore: newScore,
      gameStatus: isBust ? 'dealer-win' : prev.gameStatus,
      isPlayerTurn: !isBust,
      gameOver: isBust
    }));
  };

  // Stand - end player turn
  const stand = () => {
    if (gameState.gameOver || !gameState.isPlayerTurn) return;
    
    setGameState(prev => ({
      ...prev,
      isPlayerTurn: false
    }));
  };

  // Dealer's turn
  useEffect(() => {
    if (!gameState.isPlayerTurn && !gameState.gameOver && gameState.gameStatus === 'playing') {
      const dealerPlay = () => {
        let currentDealerHand = [...gameState.dealerHand];
        let currentDeck = [...gameState.deck];
        let dealerScore = calculateScore(currentDealerHand);

        while (dealerScore < 17) {
          const newCard = currentDeck[0];
          currentDealerHand.push(newCard);
          currentDeck = currentDeck.slice(1);
          dealerScore = calculateScore(currentDealerHand);
        }

        const playerScore = gameState.playerScore;
        let gameStatus: GameState['gameStatus'];

        if (dealerScore > 21) {
          gameStatus = 'player-win';
        } else if (dealerScore > playerScore) {
          gameStatus = 'dealer-win';
        } else if (playerScore > dealerScore) {
          gameStatus = 'player-win';
        } else {
          gameStatus = 'push';
        }

        setGameState(prev => ({
          ...prev,
          dealerHand: currentDealerHand,
          deck: currentDeck,
          dealerScore,
          gameStatus,
          gameOver: true
        }));
      };

      const timer = setTimeout(dealerPlay, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.isPlayerTurn, gameState.gameOver, gameState.gameStatus, gameState.dealerHand, gameState.deck, gameState.playerScore]);

  // Game status messages
  const getStatusMessage = () => {
    switch (gameState.gameStatus) {
      case 'waiting':
        return 'Click "New Game" to start!';
      case 'playing':
        return gameState.isPlayerTurn ? 'Your turn - Hit or Stand?' : 'Dealer is playing...';
      case 'player-win':
        return gameState.playerScore === 21 && gameState.playerHand.length === 2 
          ? 'Blackjack! You win!' 
          : 'You win!';
      case 'dealer-win':
        return gameState.playerScore > 21 ? 'Bust! Dealer wins!' : 'Dealer wins!';
      case 'push':
        return "It's a tie!";
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (gameState.gameStatus) {
      case 'player-win':
        return 'text-green-400';
      case 'dealer-win':
        return 'text-red-400';
      case 'push':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">♠ Blackjack ♠</h1>
          <p className="text-green-200">Get as close to 21 as possible without going over!</p>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          <p className={`text-2xl font-bold ${getStatusColor()}`}>
            {getStatusMessage()}
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-green-600/30 rounded-xl p-6 backdrop-blur-sm border border-green-500/30">
          {/* Dealer's Hand */}
          <div className="mb-8">
            <Hand 
              cards={gameState.dealerHand}
              title="Dealer"
              score={gameState.dealerScore}
              hideFirstCard={gameState.isPlayerTurn && gameState.gameStatus === 'playing'}
            />
          </div>

          {/* Player's Hand */}
          <div className="mb-8">
            <Hand 
              cards={gameState.playerHand}
              title="Player"
              score={gameState.playerScore}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={startNewGame}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              <Play className="w-5 h-5" />
              <span>New Game</span>
            </button>

            {gameState.gameStatus === 'playing' && gameState.isPlayerTurn && (
              <>
                <button
                  onClick={hit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Hit
                </button>
                <button
                  onClick={stand}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Stand
                </button>
              </>
            )}
          </div>

          {/* Game Rules */}
          <div className="mt-8 text-center text-green-200 text-sm space-y-1">
            <p><strong>Rules:</strong> Get as close to 21 as possible without going over.</p>
            <p>Aces count as 11 or 1. Face cards count as 10.</p>
            <p>Dealer must hit on 16 and stand on 17.</p>
          </div>
        </div>
      </div>
    </div>
  );
}