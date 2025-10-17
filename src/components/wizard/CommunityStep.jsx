import { useState } from 'react'
import Card from '../Card'
import CardModal from '../CardModal'
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
        <input
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-dagger-purple focus:outline-none transition-colors"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {filteredCommunities.map((community) => (
          <Card
            key={community.id}
            image={community.image}
            name={community.name}
            selected={isSelected(community)}
            onClick={() => handleCardClick(community)}
            size="medium"
          />
        ))}
      </div>

      {/* No results */}
      {filteredCommunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No communities found matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Selected Info */}
      {selectedCommunity && (
        <div className="bg-dagger-card border-2 border-dagger-gold rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-28 flex-shrink-0">
              <img
                src={selectedCommunity.image}
                alt={selectedCommunity.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-amber-400 mb-1">
                Selected: {selectedCommunity.name}
              </h3>
              <p className="text-slate-400">
                Click "Next" to continue to Class selection
              </p>
            </div>
            <button
              onClick={() => onSelect(null)}
              className="text-slate-400 hover:text-slate-100 transition-colors"
              title="Clear selection"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
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
