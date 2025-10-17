import { useState, useEffect } from 'react'
import AncestryStep from './AncestryStep'
import CommunityStep from './CommunityStep'

/**
 * CharacterWizard - Wizard principal de criação de personagem
 */
function CharacterWizard({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [characterData, setCharacterData] = useState({
    ancestry: null,
    community: null,
    class: null,
    subclass: null,
    domains: [],
  })

  // Carregar do localStorage se existir
  useEffect(() => {
    const savedData = localStorage.getItem('daggerheart-wizard-draft')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setCharacterData(parsed.characterData || characterData)
        setCurrentStep(parsed.currentStep || 1)
      } catch (err) {
        console.error('Error loading draft:', err)
      }
    }
  }, [])

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('daggerheart-wizard-draft', JSON.stringify({
      characterData,
      currentStep
    }))
  }, [characterData, currentStep])

  const handleSelectAncestry = (ancestry) => {
    setCharacterData(prev => ({ ...prev, ancestry }))
  }

  const handleSelectCommunity = (community) => {
    setCharacterData(prev => ({ ...prev, community }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete(characterData)
    }
    // Limpar draft
    localStorage.removeItem('daggerheart-wizard-draft')
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Your progress will be lost.')) {
      localStorage.removeItem('daggerheart-wizard-draft')
      if (onCancel) {
        onCancel()
      }
    }
  }

  const steps = [
    { number: 1, name: 'Ancestry', completed: !!characterData.ancestry },
    { number: 2, name: 'Community', completed: !!characterData.community },
    { number: 3, name: 'Class', completed: !!characterData.class },
  ]

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">
            Character Creation
          </h1>
          <p className="text-slate-400">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Line connecting steps */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-700 -z-10">
              <div
                className="h-full bg-dagger-gold transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300
                    ${currentStep === step.number
                      ? 'bg-dagger-gold text-slate-900 scale-110 shadow-glow-gold'
                      : step.completed
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }
                  `}
                >
                  {step.completed ? '✓' : step.number}
                </div>
                <span
                  className={`
                    text-sm font-medium
                    ${currentStep === step.number ? 'text-amber-400' : 'text-slate-500'}
                  `}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          {currentStep === 1 && (
            <AncestryStep
              selectedAncestry={characterData.ancestry}
              onSelect={handleSelectAncestry}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <CommunityStep
              selectedCommunity={characterData.community}
              onSelect={handleSelectCommunity}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-amber-400 mb-4">
                Class Selection
              </h2>
              <p className="text-slate-400 mb-8">
                Coming soon...
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={prevStep} className="btn btn-secondary">
                  ← Back
                </button>
                <button onClick={handleComplete} className="btn btn-primary">
                  Complete for now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        <div className="max-w-7xl mx-auto mt-8">
          <button
            onClick={handleCancel}
            className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
          >
            Cancel and exit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterWizard
