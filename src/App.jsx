import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import CharacterWizard from './components/wizard/CharacterWizard'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [savedCharacter, setSavedCharacter] = useState(null)

  const handleStartWizard = () => {
    setIsWizardOpen(true)
  }

  const handleCompleteWizard = (characterData) => {
    console.log('Character created:', characterData)
    setSavedCharacter(characterData)
    setIsWizardOpen(false)

    // TODO: Salvar no localStorage com lista de personagens
    alert('Character saved! (Check console for data)')
  }

  const handleCancelWizard = () => {
    setIsWizardOpen(false)
  }

  if (isWizardOpen) {
    return (
      <ThemeProvider>
        <ThemeToggle />
        <CharacterWizard
          onComplete={handleCompleteWizard}
          onCancel={handleCancelWizard}
        />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ThemeToggle />
      <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-400 mb-2">
            Daggerheart
          </h1>
          <p className="text-xl text-slate-400">
            Character Creation Wizard
          </p>
        </header>

        <main>
          <div className="text-center">
            <p className="text-lg mb-8">
              Welcome to the Daggerheart Character Creator
            </p>
            <button
              onClick={handleStartWizard}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Creating Character
            </button>

            {savedCharacter && (
              <div className="mt-12 max-w-md mx-auto bg-dagger-card border-2 border-dagger-gold rounded-lg p-6">
                <h2 className="text-xl font-bold text-amber-400 mb-4">
                  Last Created Character
                </h2>
                <div className="space-y-2 text-left">
                  {savedCharacter.ancestry && (
                    <p className="text-slate-300">
                      <span className="text-slate-500">Ancestry:</span> {savedCharacter.ancestry.name}
                    </p>
                  )}
                  {savedCharacter.community && (
                    <p className="text-slate-300">
                      <span className="text-slate-500">Community:</span> {savedCharacter.community.name}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App
