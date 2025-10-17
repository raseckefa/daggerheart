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

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search communities..."
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
