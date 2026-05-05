export default function Avatar({ name, size = 28 }) {
  const palette = [
    ['#c8102e', '#7a0a1d'],
    ['#b8863a', '#7a5524'],
    ['#3b82f6', '#1e40af'],
    ['#10b981', '#065f46'],
    ['#a855f7', '#6b21a8'],
    ['#f59e0b', '#92400e'],
  ]

  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const idx =
    name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length
  const [a, b] = palette[idx]

  return (
    <span
      className="ad-av"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(135deg, ${a}, ${b})`,
      }}
    >
      {initials}
    </span>
  )
}
