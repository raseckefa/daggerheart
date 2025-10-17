import { useState, useEffect } from 'react'
import CardRenderer from './CardRenderer'

/**
 * CardCarouselDesktop - Carousel para desktop mostrando 3 cards por vez
 */
function CardCarouselDesktop({ cards, selectedCard, onCardClick, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerPage = 3

  // Calcular total de páginas
  const totalPages = Math.ceil(cards.length / cardsPerPage)

  // Cards visíveis na página atual
  const visibleCards = cards.slice(
    currentIndex * cardsPerPage,
    (currentIndex + 1) * cardsPerPage
  )

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const handlePageClick = (pageIndex) => {
    setCurrentIndex(pageIndex)
  }

  const isSelected = (card) => {
    if (!card || !selectedCard) return false
    return selectedCard.id === card.id
  }

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalPages])

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* Carousel Container */}
      <div className="relative w-full max-w-6xl">
        {/* Botão Anterior */}
        <button
          onClick={handlePrevious}
          disabled={cards.length <= cardsPerPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Previous cards"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Display - 3 por vez */}
        <div className="grid grid-cols-3 gap-8 justify-items-center px-4">
          {visibleCards.map((card) => (
            <CardRenderer
              key={card.id}
              card={card}
              selected={isSelected(card)}
              onClick={() => onCardClick(card)}
              size="large"
            />
          ))}

          {/* Placeholder para preencher espaços vazios na última página */}
          {visibleCards.length < cardsPerPage &&
            Array.from({ length: cardsPerPage - visibleCards.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="w-56 h-80 opacity-0" />
            ))}
        </div>

        {/* Botão Próximo */}
        <button
          onClick={handleNext}
          disabled={cards.length <= cardsPerPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Next cards"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page Info */}
      <div className="text-center">
        <p className="text-slate-400">
          Showing {currentIndex * cardsPerPage + 1} - {Math.min((currentIndex + 1) * cardsPerPage, cards.length)} of {cards.length}
        </p>
      </div>

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex gap-3 justify-center flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`
                h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'w-12 bg-dagger-gold'
                  : 'w-3 bg-slate-600 hover:bg-slate-500'
                }
              `}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Selected Card Info */}
      {selectedCard && (
        <div className="bg-dagger-card border-2 border-dagger-gold rounded-lg p-6 max-w-2xl w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-24 flex-shrink-0">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-1">
                  Selected: {selectedCard.name}
                </h3>
                <p className="text-slate-400 text-sm">
                  Click "Next" to continue
                </p>
              </div>
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

      {/* Keyboard hints */}
      <p className="text-xs text-slate-500 text-center">
        Use ← → arrow keys to navigate between pages
      </p>
    </div>
  )
}

export default CardCarouselDesktop
