import Card from './Card'
import MixedAncestryCard from './MixedAncestryCard'

/**
 * CardRenderer - Renderiza o card apropriado baseado no tipo
 */
function CardRenderer({ card, selected, onClick, size = 'medium' }) {
  // Se for Mixed Ancestry, usar card especial
  if (card.id === 'mixed-ancestry' || card.isMixed) {
    return (
      <MixedAncestryCard
        selected={selected}
        onClick={onClick}
        size={size}
      />
    )
  }

  // Card normal
  return (
    <Card
      image={card.image}
      name={card.name}
      selected={selected}
      onClick={onClick}
      size={size}
    />
  )
}

export default CardRenderer
