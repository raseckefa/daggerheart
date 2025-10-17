import { useState } from 'react'
import Card from '../Card'
import CardModal from '../CardModal'
import CardCarousel from '../CardCarousel'
import CardCarouselDesktop from '../CardCarouselDesktop'
import MixedAncestryCard from '../MixedAncestryCard'
import MixedAncestryWizard from './MixedAncestryWizard'
import ancestriesData from '../../data/ancestries.json'

/**
 * AncestryStep - Step 1 do wizard de criação de personagem
 */
function AncestryStep({ selectedAncestry, onSelect, onNext }) {
  const [modalCard, setModalCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showMixedWizard, setShowMixedWizard] = useState(false)

  // Filtrar ancestralidades baseado na busca
  const filteredAncestries = ancestriesData.filter(ancestry =>
    ancestry.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCardClick = (ancestry) => {
    // Se for Mixed Ancestry, abrir wizard especial
    if (ancestry.isMixed) {
      setShowMixedWizard(true)
    } else {
      setModalCard(ancestry)
    }
  }

  const handleSelectFromModal = (ancestry) => {
    // Se for Mixed Ancestry, abrir wizard especial
    if (ancestry.isMixed) {
      setShowMixedWizard(true)
    } else {
      onSelect(ancestry)
    }
  }

  const handleMixedAncestryComplete = (mixedData) => {
    setShowMixedWizard(false)
    onSelect(mixedData)
  }

  const handleMixedAncestryCancel = () => {
    setShowMixedWizard(false)
  }

  const handleCloseModal = () => {
    setModalCard(null)
  }

  const isSelected = (ancestry) => {
    if (!ancestry || !selectedAncestry) return false
    return selectedAncestry.id === ancestry.id
  }

  // Se Mixed Ancestry wizard está aberto, mostrar ele
  if (showMixedWizard) {
    return (
      <MixedAncestryWizard
        onComplete={handleMixedAncestryComplete}
        onCancel={handleMixedAncestryCancel}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-amber-400 mb-2">
          Choose Your Ancestry
        </h2>
        <p className="text-slate-400 text-lg">
          Your ancestry determines your character's heritage and physical traits
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search ancestries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-dagger-purple focus:outline-none transition-colors"
          />
          <svg className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Mobile View - Carousel (1 card) */}
      <div className="md:hidden">
        <CardCarousel
          cards={filteredAncestries}
          selectedCard={selectedAncestry}
          onCardClick={handleCardClick}
          onSelect={onSelect}
        />
      </div>

      {/* Desktop View - Carousel (3 cards) */}
      <div className="hidden md:block">
        <CardCarouselDesktop
          cards={filteredAncestries}
          selectedCard={selectedAncestry}
          onCardClick={handleCardClick}
          onSelect={onSelect}
        />
      </div>

      {/* No results */}
      {filteredAncestries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No ancestries found matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end gap-4 max-w-6xl mx-auto">
        <button
          onClick={onNext}
          disabled={!selectedAncestry}
          className={`
            btn
            ${selectedAncestry ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}
        >
          Next: Community →
        </button>
      </div>

      {/* Modal */}
      <CardModal
        card={modalCard}
        isOpen={!!modalCard}
        onClose={handleCloseModal}
        onSelect={handleSelectFromModal}
        selected={isSelected(modalCard)}
      />
    </div>
  )
}

export default AncestryStep
