import { useState } from 'react'
import CardCarousel from '../CardCarousel'
import CardCarouselDesktop from '../CardCarouselDesktop'
import ancestriesData from '../../data/ancestries.json'
import ancestryFeatures from '../../data/ancestry-features.json'

/**
 * MixedAncestryWizard - Sub-wizard para criar Mixed Ancestry
 * Permite escolher 2 ancestries e 1 feature de cada
 */
function MixedAncestryWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(1) // 1: escolher ancestry1, 2: escolher ancestry2, 3: escolher features, 4: nomear
  const [ancestry1, setAncestry1] = useState(null)
  const [ancestry2, setAncestry2] = useState(null)
  const [feature1, setFeature1] = useState(null)
  const [feature2, setFeature2] = useState(null)
  const [heritageName, setHeritageName] = useState('')

  // Filtrar apenas ancestries normais (não Mixed Ancestry)
  const normalAncestries = ancestriesData.filter(a => !a.isMixed)

  // Filtrar ancestries para a segunda seleção (não pode ser a mesma que a primeira)
  const availableAncestries2 = normalAncestries.filter(a => !ancestry1 || a.id !== ancestry1.id)

  const handleSelectAncestry1 = (ancestry) => {
    setAncestry1(ancestry)
  }

  const handleSelectAncestry2 = (ancestry) => {
    setAncestry2(ancestry)
  }

  const handleNextFromAncestry1 = () => {
    if (ancestry1) setStep(2)
  }

  const handleNextFromAncestry2 = () => {
    if (ancestry2) setStep(3)
  }

  const handleBackToAncestry1 = () => {
    setStep(1)
  }

  const handleBackToAncestry2 = () => {
    setStep(2)
  }

  const handleNextFromFeatures = () => {
    if (feature1 && feature2) setStep(4)
  }

  const handleBackToFeatures = () => {
    setStep(3)
  }

  const handleComplete = () => {
    const mixedAncestryData = {
      id: 'mixed-ancestry',
      name: heritageName || `${ancestry1.name}-${ancestry2.name}`,
      type: 'ancestry',
      isMixed: true,
      ancestry1: ancestry1,
      ancestry2: ancestry2,
      feature1: feature1,
      feature2: feature2,
      customName: heritageName
    }
    onComplete(mixedAncestryData)
  }

  // Get features for selected ancestries
  const ancestry1Features = ancestry1 ? ancestryFeatures[ancestry1.id]?.features || [] : []
  const ancestry2Features = ancestry2 ? ancestryFeatures[ancestry2.id]?.features || [] : []

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">
            Mixed Ancestry Creation
          </h1>
          <p className="text-slate-400">
            Step {step} of 4: {
              step === 1 ? 'Choose First Ancestry' :
              step === 2 ? 'Choose Second Ancestry' :
              step === 3 ? 'Choose Features' :
              'Name Your Heritage'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-700 -z-10">
              <div
                className="h-full bg-dagger-gold transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all
                    ${step === s ? 'bg-dagger-gold text-slate-900 scale-110' :
                      step > s ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}
                  `}
                >
                  {step > s ? '✓' : s}
                </div>
                <span className={`text-xs ${step === s ? 'text-amber-400' : 'text-slate-500'}`}>
                  {s === 1 ? 'Ancestry 1' : s === 2 ? 'Ancestry 2' : s === 3 ? 'Features' : 'Name'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          {/* Step 1: Choose First Ancestry */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">
                  Choose Your First Ancestry
                </h2>
                <p className="text-slate-400">
                  Select the first ancestry in your character's heritage
                </p>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <CardCarousel
                  cards={normalAncestries}
                  selectedCard={ancestry1}
                  onCardClick={handleSelectAncestry1}
                  onSelect={handleSelectAncestry1}
                />
              </div>

              {/* Desktop Carousel */}
              <div className="hidden md:block">
                <CardCarouselDesktop
                  cards={normalAncestries}
                  selectedCard={ancestry1}
                  onCardClick={handleSelectAncestry1}
                  onSelect={handleSelectAncestry1}
                />
              </div>

              <div className="flex justify-between gap-4 max-w-6xl mx-auto mt-8">
                <button onClick={onCancel} className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={handleNextFromAncestry1}
                  disabled={!ancestry1}
                  className={`btn ${ancestry1 ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                >
                  Next: Second Ancestry →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Second Ancestry */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">
                  Choose Your Second Ancestry
                </h2>
                <p className="text-slate-400">
                  Select the second ancestry (must be different from {ancestry1?.name})
                </p>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <CardCarousel
                  cards={availableAncestries2}
                  selectedCard={ancestry2}
                  onCardClick={handleSelectAncestry2}
                  onSelect={handleSelectAncestry2}
                />
              </div>

              {/* Desktop Carousel */}
              <div className="hidden md:block">
                <CardCarouselDesktop
                  cards={availableAncestries2}
                  selectedCard={ancestry2}
                  onCardClick={handleSelectAncestry2}
                  onSelect={handleSelectAncestry2}
                />
              </div>

              <div className="flex justify-between gap-4 max-w-6xl mx-auto mt-8">
                <button onClick={handleBackToAncestry1} className="btn btn-secondary">
                  ← Back
                </button>
                <button
                  onClick={handleNextFromAncestry2}
                  disabled={!ancestry2}
                  className={`btn ${ancestry2 ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                >
                  Next: Choose Features →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Choose Features */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">
                  Choose One Feature from Each Ancestry
                </h2>
                <p className="text-slate-400 mb-2">
                  Select 1 feature from {ancestry1?.name} and 1 from {ancestry2?.name}
                </p>
                <p className="text-sm text-amber-500">
                  ⚠️ You cannot choose features at the same position (both first or both second)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Ancestry 1 Features */}
                <div className="bg-dagger-card border-2 border-purple-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                    {ancestry1?.name} Features
                  </h3>
                  <div className="space-y-3">
                    {ancestry1Features.map((feature, index) => {
                      // Desabilitar se feature2 foi escolhida e está na mesma posição
                      const feature2Index = ancestry2Features.findIndex(f => f.id === feature2?.id)
                      const isDisabled = feature2 && feature2Index === index

                      return (
                        <button
                          key={feature.id}
                          onClick={() => !isDisabled && setFeature1(feature)}
                          disabled={isDisabled}
                          className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all relative
                            ${feature1?.id === feature.id
                              ? 'border-dagger-gold bg-dagger-gold/10'
                              : isDisabled
                                ? 'border-slate-700 bg-slate-900 opacity-40 cursor-not-allowed'
                                : 'border-slate-600 hover:border-purple-500 bg-slate-800 cursor-pointer'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className={`font-bold mb-1 ${isDisabled ? 'text-slate-600' : 'text-amber-400'}`}>
                                {feature.name}
                              </h4>
                              <p className={`text-sm ${isDisabled ? 'text-slate-700' : 'text-slate-300'}`}>
                                {feature.description}
                              </p>
                            </div>
                            {isDisabled && (
                              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                                🔒 Blocked
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Ancestry 2 Features */}
                <div className="bg-dagger-card border-2 border-blue-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                    {ancestry2?.name} Features
                  </h3>
                  <div className="space-y-3">
                    {ancestry2Features.map((feature, index) => {
                      // Desabilitar se feature1 foi escolhida e está na mesma posição
                      const feature1Index = ancestry1Features.findIndex(f => f.id === feature1?.id)
                      const isDisabled = feature1 && feature1Index === index

                      return (
                        <button
                          key={feature.id}
                          onClick={() => !isDisabled && setFeature2(feature)}
                          disabled={isDisabled}
                          className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all relative
                            ${feature2?.id === feature.id
                              ? 'border-dagger-gold bg-dagger-gold/10'
                              : isDisabled
                                ? 'border-slate-700 bg-slate-900 opacity-40 cursor-not-allowed'
                                : 'border-slate-600 hover:border-blue-500 bg-slate-800 cursor-pointer'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h4 className={`font-bold mb-1 ${isDisabled ? 'text-slate-600' : 'text-amber-400'}`}>
                                {feature.name}
                              </h4>
                              <p className={`text-sm ${isDisabled ? 'text-slate-700' : 'text-slate-300'}`}>
                                {feature.description}
                              </p>
                            </div>
                            {isDisabled && (
                              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                                🔒 Blocked
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Features Summary */}
              {(feature1 || feature2) && (
                <div className="bg-slate-800 border-2 border-dagger-gold rounded-lg p-6 max-w-3xl mx-auto">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">Selected Features:</h3>
                  <div className="space-y-2">
                    {feature1 && (
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400">✓</span>
                        <div>
                          <span className="font-bold text-slate-200">{feature1.name}</span>
                          <span className="text-slate-400"> (from {ancestry1?.name})</span>
                        </div>
                      </div>
                    )}
                    {feature2 && (
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <div>
                          <span className="font-bold text-slate-200">{feature2.name}</span>
                          <span className="text-slate-400"> (from {ancestry2?.name})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-4 max-w-6xl mx-auto mt-8">
                <button onClick={handleBackToAncestry2} className="btn btn-secondary">
                  ← Back
                </button>
                <button
                  onClick={handleNextFromFeatures}
                  disabled={!feature1 || !feature2}
                  className={`btn ${feature1 && feature2 ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                >
                  Next: Name Heritage →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Name Heritage */}
          {step === 4 && (
            <div className="space-y-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">
                  Name Your Heritage
                </h2>
                <p className="text-slate-400">
                  Choose how your character identifies (optional)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-dagger-card border-2 border-dagger-gold rounded-lg p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Your Mixed Ancestry:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Ancestries:</p>
                    <p className="text-lg text-slate-200">
                      {ancestry1?.name} + {ancestry2?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Features:</p>
                    <ul className="space-y-1">
                      <li className="text-slate-200">• {feature1?.name} (from {ancestry1?.name})</li>
                      <li className="text-slate-200">• {feature2?.name} (from {ancestry2?.name})</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Heritage Name (optional)
                </label>
                <input
                  type="text"
                  value={heritageName}
                  onChange={(e) => setHeritageName(e.target.value)}
                  placeholder={`e.g., "${ancestry1?.name.toLowerCase()}-${ancestry2?.name.toLowerCase()}" or "toothling"`}
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-dagger-gold focus:outline-none transition-colors"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Leave blank to use: {ancestry1?.name}-{ancestry2?.name}
                </p>
              </div>

              {/* Examples */}
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Examples:</p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Hyphenated: "goblin-orc" or "elf-human"</li>
                  <li>• Singular: "goblin" (with orc heritage)</li>
                  <li>• Custom: "toothling", "shadowkin", "sunborn"</li>
                </ul>
              </div>

              <div className="flex justify-between gap-4 mt-8">
                <button onClick={handleBackToFeatures} className="btn btn-secondary">
                  ← Back
                </button>
                <button onClick={handleComplete} className="btn btn-primary">
                  Complete Mixed Ancestry ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MixedAncestryWizard
