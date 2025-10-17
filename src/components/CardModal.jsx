import { useEffect } from 'react'

/**
 * CardModal Component - Modal para preview de cards (estilo Hearthstone)
 *
 * @param {object} card - Objeto do card com { image, name, description, etc }
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {function} onClose - Callback para fechar o modal
 * @param {function} onSelect - Callback para selecionar o card
 * @param {boolean} selected - Se o card já está selecionado
 */
function CardModal({ card, isOpen, onClose, onSelect, selected = false }) {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll do body quando modal aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !card) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(card)
    }
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="modal-card">
        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Card Image */}
        <div className="flex justify-center p-8">
          <img
            src={card.image}
            alt={card.name}
            className="max-w-md w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Card Info */}
        <div className="px-8 pb-8">
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            {card.name}
          </h2>

          {card.description && (
            <p className="text-slate-300 mb-6 leading-relaxed">
              {card.description}
            </p>
          )}

          {/* Additional card data */}
          {card.type && (
            <div className="mb-4">
              <span className="inline-block bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                Type: {card.type}
              </span>
            </div>
          )}

          {/* Domain specific info */}
          {card.domain && (
            <div className="mb-4">
              <span className="inline-block bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm mr-2">
                Domain: {card.domain}
              </span>
              {card.level && (
                <span className="inline-block bg-amber-600/30 text-amber-300 px-3 py-1 rounded-full text-sm">
                  Level: {card.level}
                </span>
              )}
            </div>
          )}

          {/* Subclass specific info */}
          {card.class && (
            <div className="mb-4">
              <span className="inline-block bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-sm mr-2">
                Class: {card.class}
              </span>
              {card.tier && (
                <span className="inline-block bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-sm">
                  Tier: {card.tier}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSelect}
              className={`
                btn flex-1
                ${selected ? 'btn-secondary' : 'btn-primary'}
              `}
            >
              {selected ? '✓ Selected' : 'Select Card'}
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal
