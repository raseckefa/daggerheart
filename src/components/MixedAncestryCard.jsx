/**
 * MixedAncestryCard - Card especial para Mixed Ancestry
 * Usado como placeholder quando não há imagem
 */
function MixedAncestryCard({ selected, onClick, size = 'medium' }) {
  const sizeClasses = {
    small: 'w-32 h-44',
    medium: 'w-40 h-56',
    large: 'w-56 h-80',
  }

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }

  return (
    <div
      className={`
        card
        ${sizeClasses[size]}
        ${selected ? 'card-selected' : ''}
        relative overflow-hidden
      `}
      onClick={onClick}
    >
      {/* Background com gradiente especial */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-amber-500 to-blue-600">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,.1) 10px,
              rgba(255,255,255,.1) 20px
            )`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
        {/* Icon */}
        <div className="mb-3">
          <svg className={`${size === 'large' ? 'w-20 h-20' : size === 'medium' ? 'w-16 h-16' : 'w-12 h-12'} text-white drop-shadow-lg`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-white drop-shadow-lg mb-2 ${size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
          Mixed Ancestry
        </h3>

        {/* Subtitle */}
        <p className={`${textSizeClasses[size]} text-white/90 drop-shadow`}>
          Choose traits from two ancestries
        </p>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Selected Badge */}
      {selected && (
        <div className="absolute top-2 right-2 bg-dagger-gold text-slate-900 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1 shadow-lg z-20">
          <span>✓</span>
          <span>Selected</span>
        </div>
      )}

      {/* Glow effect */}
      {selected && (
        <div className="absolute inset-0 pointer-events-none animate-pulse-glow rounded-lg" />
      )}
    </div>
  )
}

export default MixedAncestryCard
