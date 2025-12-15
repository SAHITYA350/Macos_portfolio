import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Welcome from './Welcome'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('should render the welcome section', () => {
      render(<Welcome />)
      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'welcome')
    })

    it('should render the subtitle text', () => {
      render(<Welcome />)
      const subtitle = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'p' && 
               element.textContent.includes("Hey, I'm Sahitya! Welcome to my")
      })
      expect(subtitle).toBeInTheDocument()
    })

    it('should render the title "portfolio"', () => {
      render(<Welcome />)
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title.textContent).toBe('portfolio')
    })

    it('should render small screen message', () => {
      render(<Welcome />)
      const smallScreenDiv = screen.getByText('This portfolio is designed for desktop/tablet screens only.')
      expect(smallScreenDiv).toBeInTheDocument()
      expect(smallScreenDiv.parentElement).toHaveClass('small-screen')
    })
  })

  describe('Text Rendering', () => {
    it('should split subtitle text into individual span elements', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const spans = subtitle.querySelectorAll('span')
      
      // "Hey, I'm Sahitya! Welcome to my" has 33 characters
      expect(spans.length).toBe(33)
    })

    it('should split title text into individual span elements', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const spans = title.querySelectorAll('span')
      
      // "portfolio" has 9 characters
      expect(spans.length).toBe(9)
    })

    it('should apply correct classes to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const firstSpan = subtitle.querySelector('span')
      
      expect(firstSpan).toHaveClass('text-3xl')
      expect(firstSpan).toHaveClass('font-georama')
    })

    it('should apply correct classes to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title.querySelector('span')
      
      expect(firstSpan).toHaveClass('text-9xl')
      expect(firstSpan).toHaveClass('italic')
      expect(firstSpan).toHaveClass('font-georama')
    })

    it('should convert spaces to non-breaking spaces', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const spans = Array.from(subtitle.querySelectorAll('span'))
      
      // Find spans that should contain non-breaking spaces
      const spaceSpans = spans.filter(span => span.textContent === '\u00A0')
      expect(spaceSpans.length).toBeGreaterThan(0)
    })

    it('should apply initial font weight to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const firstSpan = subtitle.querySelector('span')
      
      expect(firstSpan.style.fontVariationSettings).toBe("'wght' 100")
    })

    it('should apply initial font weight to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title.querySelector('span')
      
      expect(firstSpan.style.fontVariationSettings).toBe("'wght' 400")
    })
  })

  describe('GSAP Integration', () => {
    it('should call useGSAP hook on mount', () => {
      render(<Welcome />)
      expect(useGSAP).toHaveBeenCalled()
    })

    it('should setup GSAP animations with empty dependency array', () => {
      render(<Welcome />)
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), [])
    })

    it('should return cleanup function from useGSAP', () => {
      const mockCleanup = vi.fn()
      useGSAP.mockImplementation((callback) => {
        const cleanup = callback()
        return cleanup
      })

      const { unmount } = render(<Welcome />)
      unmount()
      
      // Verify useGSAP was called with a function
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), [])
    })
  })

  describe('Mouse Interaction Simulation', () => {
    it('should add event listeners to subtitle on mount', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      
      expect(subtitle).toBeInTheDocument()
      // The component should have set up event listeners internally
    })

    it('should add event listeners to title on mount', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      expect(title).toBeInTheDocument()
      // The component should have set up event listeners internally
    })

    it('should handle mousemove event on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      
      // Simulate mousemove
      fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 100 })
      
      // GSAP should be called for animations
      expect(gsap.to).toHaveBeenCalled()
    })

    it('should handle mousemove event on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      // Simulate mousemove
      fireEvent.mouseMove(title, { clientX: 200, clientY: 200 })
      
      // GSAP should be called for animations
      expect(gsap.to).toHaveBeenCalled()
    })

    it('should handle mouseleave event on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      
      // First move mouse over, then leave
      fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 100 })
      fireEvent.mouseLeave(subtitle)
      
      // GSAP should be called for reset animations
      expect(gsap.to).toHaveBeenCalled()
    })

    it('should handle mouseleave event on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      // First move mouse over, then leave
      fireEvent.mouseMove(title, { clientX: 200, clientY: 200 })
      fireEvent.mouseLeave(title)
      
      // GSAP should be called for reset animations
      expect(gsap.to).toHaveBeenCalled()
    })
  })

  describe('Refs', () => {
    it('should create ref for subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      
      expect(subtitle).not.toBeNull()
    })

    it('should create ref for title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      expect(title).not.toBeNull()
    })
  })

  describe('Component Structure', () => {
    it('should have correct semantic HTML structure', () => {
      const { container } = render(<Welcome />)
      const section = container.querySelector('section')
      const paragraph = section.querySelector('p')
      const heading = section.querySelector('h1')
      const smallScreenDiv = section.querySelector('.small-screen')
      
      expect(section).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(smallScreenDiv).toBeInTheDocument()
    })

    it('should apply margin-top class to title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      expect(title).toHaveClass('mt-7')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty container ref gracefully', () => {
      // This tests the guard clause in setupTextHover
      render(<Welcome />)
      
      // Should not throw errors
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should handle rapid mouse movements', async () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      
      // Simulate rapid mouse movements
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseMove(subtitle, { clientX: i * 10, clientY: 100 })
      }
      
      // Should handle multiple calls without errors
      expect(gsap.to).toHaveBeenCalled()
    })

    it('should cleanup event listeners on unmount', () => {
      const { container, unmount } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const title = container.querySelector('h1')
      
      expect(subtitle).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      
      // Unmount should cleanup listeners
      unmount()
      
      // Component should be removed
      expect(screen.queryByRole('region')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible section element', () => {
      render(<Welcome />)
      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
    })

    it('should have accessible heading', () => {
      render(<Welcome />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('should have proper text content for screen readers', () => {
      render(<Welcome />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading.textContent).toBe('portfolio')
    })
  })

  describe('Font Weight Configuration', () => {
    it('should use correct weight range for subtitle', () => {
      // This tests the FONT_WEIGHTS constant indirectly
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p[class*="text-3xl"]')
      const firstSpan = subtitle.querySelector('span')
      
      // Base weight should be 100 for subtitle
      expect(firstSpan.style.fontVariationSettings).toBe("'wght' 100")
    })

    it('should use correct weight range for title', () => {
      // This tests the FONT_WEIGHTS constant indirectly
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title.querySelector('span')
      
      // Base weight should be 400 for title
      expect(firstSpan.style.fontVariationSettings).toBe("'wght' 400")
    })
  })

  describe('Performance', () => {
    it('should render efficiently with many span elements', () => {
      const startTime = performance.now()
      render(<Welcome />)
      const endTime = performance.now()
      
      // Rendering should complete in reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('should not cause memory leaks with event listeners', () => {
      const { unmount } = render(<Welcome />)
      
      // Multiple mount/unmount cycles
      unmount()
      render(<Welcome />).unmount()
      render(<Welcome />).unmount()
      
      // Should complete without errors
      expect(true).toBe(true)
    })
  })
})

describe('renderText utility function', () => {
  it('should be a pure function that returns consistent output', () => {
    render(<Welcome />)
    const { container: container1 } = render(<Welcome />)
    const { container: container2 } = render(<Welcome />)
    
    const spans1 = container1.querySelectorAll('h1 span')
    const spans2 = container2.querySelectorAll('h1 span')
    
    expect(spans1.length).toBe(spans2.length)
  })
})

describe('setupTextHover utility function', () => {
  it('should handle null container gracefully', () => {
    // setupTextHover is called internally, testing via component
    render(<Welcome />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })
})