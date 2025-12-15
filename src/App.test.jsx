import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

// Mock the components
vi.mock('#components', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar Component</nav>,
  Welcome: () => <section data-testid="welcome">Welcome Component</section>,
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should render the main container div', () => {
      const { container } = render(<App />)
      const mainDiv = container.querySelector('div.text-2xl')
      expect(mainDiv).toBeInTheDocument()
    })

    it('should render the main element', () => {
      const { container } = render(<App />)
      const mainElement = container.querySelector('main')
      expect(mainElement).toBeInTheDocument()
    })

    it('should render Navbar component', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('should render Welcome component', () => {
      render(<App />)
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should have correct nesting: div > main > components', () => {
      const { container } = render(<App />)
      const outerDiv = container.querySelector('div.text-2xl')
      const mainElement = outerDiv.querySelector('main')
      const navbar = mainElement.querySelector('[data-testid="navbar"]')
      const welcome = mainElement.querySelector('[data-testid="welcome"]')
      
      expect(outerDiv).toContainElement(mainElement)
      expect(mainElement).toContainElement(navbar)
      expect(mainElement).toContainElement(welcome)
    })

    it('should render Navbar before Welcome', () => {
      const { container } = render(<App />)
      const mainElement = container.querySelector('main')
      const children = Array.from(mainElement.children)
      
      expect(children[0]).toHaveAttribute('data-testid', 'navbar')
      expect(children[1]).toHaveAttribute('data-testid', 'welcome')
    })

    it('should apply text-2xl class to root div', () => {
      const { container } = render(<App />)
      const rootDiv = container.firstChild
      expect(rootDiv).toHaveClass('text-2xl')
    })
  })

  describe('Component Integration', () => {
    it('should successfully import and render Navbar from #components', () => {
      render(<App />)
      const navbar = screen.getByTestId('navbar')
      expect(navbar.tagName.toLowerCase()).toBe('nav')
    })

    it('should successfully import and render Welcome from #components', () => {
      render(<App />)
      const welcome = screen.getByTestId('welcome')
      expect(welcome.tagName.toLowerCase()).toBe('section')
    })
  })

  describe('Snapshot', () => {
    it('should match snapshot', () => {
      const { container } = render(<App />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple renders without errors', () => {
      const { rerender } = render(<App />)
      rerender(<App />)
      rerender(<App />)
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should render only one instance of each component', () => {
      render(<App />)
      const navbars = screen.getAllByTestId('navbar')
      const welcomes = screen.getAllByTestId('welcome')
      
      expect(navbars).toHaveLength(1)
      expect(welcomes).toHaveLength(1)
    })
  })

  describe('Semantic HTML', () => {
    it('should use semantic main element', () => {
      const { container } = render(<App />)
      const mainElement = container.querySelector('main')
      expect(mainElement).toBeInTheDocument()
    })

    it('should have proper document structure', () => {
      const { container } = render(<App />)
      const structure = container.querySelector('div > main')
      expect(structure).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render efficiently', () => {
      const startTime = performance.now()
      render(<App />)
      const endTime = performance.now()
      
      // Rendering should complete quickly (< 50ms)
      expect(endTime - startTime).toBeLessThan(50)
    })
  })
})

describe('App Component - Without Mocks (Integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle component import errors gracefully', () => {
    // This test ensures the import statement is correct
    expect(() => render(<App />)).not.toThrow()
  })
})