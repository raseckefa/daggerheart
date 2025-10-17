import { useState, useEffect, useRef } from 'react'
import Card from './Card'

/**
 * CardCarousel - Carousel horizontal para visualização mobile
 * Mostra um card por vez com navegação por setas e indicadores
 */
function CardCarousel({ cards, selectedCard, onCardClick, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef(null)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
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
  }, [cards.length])

  // Navegação por touch/swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      handleNext() // Swipe left = next
    } else if (distance < -minSwipeDistance) {
      handlePrevious() // Swipe right = previous
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(cards[currentIndex])
    }
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(cards[currentIndex])
    }
  }

  const isSelected = (card) => {
    return selectedCard?.id === card.id
  }

  const currentCard = cards[currentIndex]

  return (
    <div
      ref={carouselRef}
      className="flex flex-col items-center space-y-6 py-8"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card Container com navegação */}
      <div className="relative w-full max-w-sm">
        {/* Botão Anterior */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Previous card"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Card Display */}
        <div className="flex justify-center px-4">
          <div className="transform transition-all duration-300">
            <Card
              image={currentCard.image}
              name={currentCard.name}
              selected={isSelected(currentCard)}
              onClick={handleCardClick}
              size="large"
            />
          </div>
        </div>

        {/* Botão Próximo */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Next card"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Card Info */}
      <div className="text-center px-4">
        <h3 className="text-2xl font-bold text-amber-400 mb-2">
          {currentCard.name}
        </h3>
        <p className="text-slate-400 mb-4">
          {currentIndex + 1} of {cards.length}
        </p>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 justify-center flex-wrap max-w-md px-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentIndex
                ? 'w-8 bg-dagger-gold'
                : 'w-2 bg-slate-600 hover:bg-slate-500'
              }
            `}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={handleSelect}
        className={`
          btn w-full max-w-sm
          ${isSelected(currentCard) ? 'btn-secondary' : 'btn-primary'}
        `}
      >
        {isSelected(currentCard) ? '✓ Selected' : 'Select This Card'}
      </button>

      {/* Keyboard hints */}
      <p className="text-xs text-slate-500 text-center">
        Use ← → arrow keys or swipe to navigate
      </p>
    </div>
  )
}

export default CardCarousel
