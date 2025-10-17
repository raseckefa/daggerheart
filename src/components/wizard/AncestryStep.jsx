import { useState } from 'react'
import Card from '../Card'
import CardModal from '../CardModal'
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

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search ancestries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-dagger-purple focus:outline-none transition-colors"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {filteredAncestries.map((ancestry) => (
          <Card
            key={ancestry.id}
            image={ancestry.image}
            name={ancestry.name}
            selected={isSelected(ancestry)}
            onClick={() => handleCardClick(ancestry)}
            size="medium"
          />
        ))}
      </div>

      {/* No results */}
      {filteredAncestries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No ancestries found matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Selected Info */}
      {selectedAncestry && (
        <div className="bg-dagger-card border-2 border-dagger-gold rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-28 flex-shrink-0">
              <img
                src={selectedAncestry.image}
                alt={selectedAncestry.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-amber-400 mb-1">
                Selected: {selectedAncestry.name}
              </h3>
              <p className="text-slate-400">
                Click "Next" to continue to Community selection
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
