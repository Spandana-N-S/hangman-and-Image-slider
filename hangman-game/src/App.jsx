import { useState, useEffect } from 'react'

function App() {
  const [word, setWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')
  const [hintUsed, setHintUsed] = useState(false)

  const maxWrongGuesses = 6

  const wordData = [
    { word: 'JAVASCRIPT', definition: 'A popular programming language for web development' },
    { word: 'REACT', definition: 'A JavaScript library for building user interfaces' },
    { word: 'PYTHON', definition: 'A high-level programming language known for readability' },
    { word: 'CODING', definition: 'The process of writing instructions for computers' },
    { word: 'DEVELOPER', definition: 'A person who writes computer programs and software' },
    { word: 'BROWSER', definition: 'Software used to access the internet and view websites' },
    { word: 'FUNCTION', definition: 'A reusable block of code that performs a specific task' },
    { word: 'VARIABLE', definition: 'A container for storing data values in programming' },
    { word: 'ALGORITHM', definition: 'A step-by-step procedure for solving a problem' },
    { word: 'DATABASE', definition: 'An organized collection of structured information' },
    { word: 'COMPILER', definition: 'Software that translates code into machine language' },
    { word: 'DEBUGGER', definition: 'A tool used to find and fix errors in code' },
    { word: 'FRAMEWORK', definition: 'A platform for building software applications' },
    { word: 'INTERFACE', definition: 'A point where two systems interact' },
    { word: 'LOOP', definition: 'A control structure that repeats code execution' },
    { word: 'ARRAY', definition: 'A data structure that stores multiple values' },
    { word: 'STRING', definition: 'A sequence of characters used in programming' },
    { word: 'BOOLEAN', definition: 'A data type with only true or false values' },
    { word: 'INTEGER', definition: 'A whole number data type' },
    { word: 'OBJECT', definition: 'A data structure with properties and methods' },
    { word: 'CLASS', definition: 'A blueprint for creating objects' },
    { word: 'METHOD', definition: 'A function defined inside a class' },
    { word: 'PARAMETER', definition: 'A variable in a function definition' },
    { word: 'SYNTAX', definition: 'The rules governing code structure' },
    { word: 'CONSTANT', definition: 'A value that cannot be changed' },
    { word: 'OPERATOR', definition: 'A symbol that performs an operation' },
    { word: 'SERVER', definition: 'A computer that provides data to other computers' },
    { word: 'CLIENT', definition: 'A computer that requests services from a server' },
    { word: 'API', definition: 'A set of rules for software communication' },
    { word: 'SOFTWARE', definition: 'Programs and applications for computers' },
    { word: 'HARDWARE', definition: 'Physical components of a computer system' },
    { word: 'MEMORY', definition: 'Device for storing data temporarily or permanently' },
    { word: 'PROCESSOR', definition: 'The central unit that executes instructions' },
    { word: 'NETWORK', definition: 'Connected computers that share resources' }
  ]

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordData.length)
    const selected = wordData[randomIndex]
    setWord(selected.word)
    setDefinition(selected.definition)
    setGuessedLetters([])
    setWrongGuesses(0)
    setGameStatus('playing')
    setHintUsed(false)
  }

  useEffect(() => {
    pickRandomWord()
  }, [])

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)
      if (newWrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost')
      }
    } else {
      const isWon = word.split('').every(l => newGuessedLetters.includes(l))
      if (isWon) {
        setGameStatus('won')
      }
    }
  }

  const useHint = () => {
    if (!hintUsed && gameStatus === 'playing') {
      const unguessedLetters = word.split('').filter(l => !guessedLetters.includes(l))
      if (unguessedLetters.length > 0) {
        const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)]
        handleGuess(randomLetter)
        setHintUsed(true)
      }
    }
  }

  const displayWord = word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ')

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const hangmanParts = [
    wrongGuesses >= 1,
    wrongGuesses >= 2,
    wrongGuesses >= 3,
    wrongGuesses >= 4,
    wrongGuesses >= 5,
    wrongGuesses >= 6
  ]

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient Overlay - Darker edges, lighter center */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-cyan-900/20"></div>
      
      {/* Single Neat Box */}
      <div className="relative z-10 max-w-2xl w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-wider">
            <span className="text-cyan-400">HANG</span><span className="text-purple-500">MAN</span>
          </h1>
          <p className="text-gray-300 mt-2 font-medium">Guess the programming term</p>
        </div>

        {/* Single Box Container */}
        <div className="bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          
          {/* Main Content - Hangman Left, Word+Keyboard Right */}
          <div className="flex flex-col md:flex-row">
            
            {/* Hangman Figure - Taller */}
            <div className="md:w-2/5 p-4 border-b md:border-b-0 md:border-r border-gray-700/50 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <svg height="200" width="140" className="max-w-full">
                  <line x1="10" y1="190" x2="100" y2="190" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="30" y1="190" x2="30" y2="20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="30" y1="20" x2="100" y2="20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="100" y1="20" x2="100" y2="40" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/>
                  
                  {hangmanParts[0] && <circle cx="100" cy="58" r="18" stroke="#a855f7" strokeWidth="3" fill="none"/>}
                  {hangmanParts[1] && <line x1="100" y1="76" x2="100" y2="130" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>}
                  {hangmanParts[2] && <line x1="100" y1="90" x2="75" y2="110" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>}
                  {hangmanParts[3] && <line x1="100" y1="90" x2="125" y2="110" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>}
                  {hangmanParts[4] && <line x1="100" y1="130" x2="80" y2="160" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>}
                  {hangmanParts[5] && <line x1="100" y1="130" x2="120" y2="160" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>}
                </svg>
              </div>
              
              {/* Wrong Guesses & Hint */}
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="text-center">
                  <span className="text-xs text-gray-400">Wrong</span>
                  <p className="text-lg font-bold text-red-400">{wrongGuesses}<span className="text-gray-500 text-sm">/{maxWrongGuesses}</span></p>
                </div>
                <button
                  onClick={useHint}
                  disabled={hintUsed || gameStatus !== 'playing'}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                    hintUsed 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50'
                  }`}
                >
                  {hintUsed ? '✓ Hint Used' : '💡 Hint'}
                </button>
              </div>
            </div>

            {/* Right Side - Word & Keyboard */}
            <div className="md:w-3/5 flex flex-col">
              
              {/* Word Display */}
              <div className="p-4 border-b border-gray-700/50">
                <div className="bg-gray-800/80 rounded-xl px-4 py-4">
                  <p className="text-2xl md:text-3xl font-mono font-bold text-center text-cyan-400 tracking-widest">
                    {displayWord}
                  </p>
                </div>

                {/* Hint Definition */}
                {gameStatus === 'playing' && (
                  <div className="mt-3 bg-purple-500/10 border border-purple-500/30 rounded-lg p-2">
                    <p className="text-xs text-purple-300 text-center">
                      <span className="font-bold">💡 Hint:</span> {definition}
                    </p>
                  </div>
                )}

                {/* Game Over Message */}
                {gameStatus !== 'playing' && (
                  <div className={`mt-3 text-center p-3 rounded-lg ${
                    gameStatus === 'won' ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
                  }`}>
                    <p className={`text-sm font-bold ${
                      gameStatus === 'won' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {gameStatus === 'won' 
                        ? '🎉 YOU WON!' 
                        : `😞 GAME OVER! Word: ${word}`
                      }
                    </p>
                  </div>
                )}
              </div>
          
              {/* Keyboard Section */}
              <div className="p-4 bg-gray-800/30 flex-1">
                <div className="grid grid-cols-7 gap-1.5">
                  {alphabet.map(letter => {
                    const isGuessed = guessedLetters.includes(letter)
                    const isCorrect = word.includes(letter)
                    
                    return (
                      <button
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        disabled={isGuessed || gameStatus !== 'playing'}
                        className={`h-10 rounded-lg font-bold text-sm transition-all active:scale-95
                          ${isGuessed 
                            ? isCorrect 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                          }
                          ${gameStatus !== 'playing' ? 'opacity-50' : ''}
                        `}
                      >
                        {letter}
                      </button>
                    )
                  })}
                </div>

                {/* Play Again Button */}
                <button
                  onClick={pickRandomWord}
                  className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all active:scale-98 shadow-lg"
                >
                  🔄 PLAY AGAIN
                </button>
              </div>
            
            </div>
          
          </div>
        
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-4 text-xs">
          React + Tailwind CSS
        </p>
      </div>
    </div>
  )
}

export default App
