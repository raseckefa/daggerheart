import { useState } from 'react'
import Card from '../Card'
import CardModal from '../CardModal'
import CardCarousel from '../CardCarousel'
import CardCarouselDesktop from '../CardCarouselDesktop'
import communitiesData from '../../data/communities.json'

/**
 * CommunityStep - Step 2 do wizard de criação de personagem
 */
function CommunityStep({ selectedCommunity, onSelect, onNext, onBack }) {
  const [modalCard, setModalCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar comunidades baseado na busca
  const filteredCommunities = communitiesData.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCardClick = (community) => {
    setModalCard(community)
  }

  const handleSelectFromModal = (community) => {
    onSelect(community)
  }

  const handleCloseModal = () => {
    setModalCard(null)
  }

  const isSelected = (community) => {
    if (!community || !selectedCommunity) return false
    return selectedCommunity.id === community.id
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-amber-400 mb-2">
          Choose Your Community
        </h2>
        <p className="text-slate-400 text-lg">
          Your community represents where you grew up and trained
        </p>
      </div>

      {/* Mobile View - Carousel (1 card) */}
      <div className="md:hidden">
        <CardCarousel
          cards={filteredCommunities}
          selectedCard={selectedCommunity}
          onCardClick={handleCardClick}
          onSelect={onSelect}
        />
      </div>

      {/* Desktop View - Carousel (3 cards) */}
      <div className="hidden md:block">
        <CardCarouselDesktop
          cards={filteredCommunities}
          selectedCard={selectedCommunity}
          onCardClick={handleCardClick}
          onSelect={onSelect}
        />
      </div>

      {/* No results */}
      {filteredCommunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No communities found matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-4 max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="btn btn-secondary"
        >
          ← Back: Ancestry
        </button>
        <button
          onClick={onNext}
          disabled={!selectedCommunity}
          className={`
            btn
            ${selectedCommunity ? 'btn-primary' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}
        >
          Next: Class →
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

export default CommunityStep
