import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, base: 100 },
  title: { min: 400, max: 900, base: 400 },
}

const renderText = (text, className, baseWeight = 400) =>
  [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

const setupTextHover = (container, type) => {
  if (!container) return

  const letters = container.querySelectorAll('span')
  const { min, max, base } = FONT_WEIGHTS[type]

  const animate = (el, weight) =>
    gsap.to(el, {
      fontVariationSettings: `'wght' ${weight}`,
      duration: 0.25,
      ease: 'power2.out',
    })

  const onMove = (e) => {
    const containerRect = container.getBoundingClientRect()
    const mouseX = e.clientX - containerRect.left

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect()
      const letterCenter =
        rect.left - containerRect.left + rect.width / 2

      const distance = Math.abs(mouseX - letterCenter)

      // Gaussian falloff
      const intensity = Math.exp(-(distance ** 2) / 20000)

      animate(letter, min + (max - min) * intensity)
    })
  }

  const onLeave = () => {
    letters.forEach((letter) => animate(letter, base))
  }

  container.addEventListener('mousemove', onMove)
  container.addEventListener('mouseleave', onLeave)

  // cleanup
  return () => {
    container.removeEventListener('mousemove', onMove)
    container.removeEventListener('mouseleave', onLeave)
  }
}

const Welcome = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useGSAP(() => {
    const clean1 = setupTextHover(subtitleRef.current, 'subtitle')
    const clean2 = setupTextHover(titleRef.current, 'title')

    return () => {
      clean1?.()
      clean2?.()
    }
  }, [])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Sahitya! Welcome to my",
          'text-3xl font-georama',
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText('portfolio.', 'text-9xl italic font-georama', 400)}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  )
}

export default Welcome
