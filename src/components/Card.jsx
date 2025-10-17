import { useState } from 'react'

/**
 * Card Component - Estilo Hearthstone/LoR
 *
 * @param {string} image - Path da imagem do card
 * @param {string} name - Nome do card
 * @param {boolean} selected - Se o card está selecionado
 * @param {boolean} disabled - Se o card está desabilitado
 * @param {function} onClick - Callback ao clicar no card
 * @param {string} size - Tamanho do card (small, medium, large)
 */
function Card({
  image,
  name,
  selected = false,
  disabled = false,
  onClick,
  size = 'medium',
  children
}) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    small: 'w-32 h-44',
    medium: 'w-40 h-56',
    large: 'w-56 h-80',
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      className={`
        card
        ${sizeClasses[size]}
        ${selected ? 'card-selected' : ''}
        ${disabled ? 'card-disabled' : ''}
      `}
      onClick={handleClick}
    >
      {/* Card Image */}
      <div className="relative w-full h-full">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎴</div>
              <p className="text-sm text-slate-400">{name}</p>
            </div>
          </div>
        )}

        {/* Selected Badge */}
        {selected && (
          <div className="absolute top-2 right-2 bg-dagger-gold text-slate-900 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 shadow-lg">
            <span>✓</span>
            <span>Selected</span>
          </div>
        )}

        {/* Disabled Overlay */}
        {disabled && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">🔒</div>
              <p className="text-xs text-slate-300">Locked</p>
            </div>
          </div>
        )}

        {/* Custom children (badges, etc) */}
        {children}
      </div>

      {/* Glow effect */}
      {selected && (
        <div className="absolute inset-0 pointer-events-none animate-pulse-glow rounded-lg" />
      )}
    </div>
  )
}

export default Card
