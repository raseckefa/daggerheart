import { useState } from 'react'
import Card from '../Card'
import CardModal from '../CardModal'
import CardCarousel from '../CardCarousel'
import CardCarouselDesktop from '../CardCarouselDesktop'
import ancestriesData from '../../data/ancestries.json'

/**
 * AncestryStep - Step 1 do wizard de criação de personagem
 */
function AncestryStep({ selectedAncestry, onSelect, onNext }) {
  const [modalCard, setModalCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar ancestralidades baseado na busca
  const filteredAncestries = ancestriesData.filter(ancestry =>
    ancestry.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCardClick = (ancestry) => {
    setModalCard(ancestry)
  }

  const handleSelectFromModal = (ancestry) => {
    onSelect(ancestry)
  }

  const handleCloseModal = () => {
    setModalCard(null)
  }

  const isSelected = (ancestry) => {
    if (!ancestry || !selectedAncestry) return false
    return selectedAncestry.id === ancestry.id
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
