import { describe, it, expect } from 'vitest'
import * as components from './index'
import Navbar from './Navbar'
import Welcome from './Welcome'

describe('Component Exports', () => {
  describe('Named Exports', () => {
    it('should export Navbar component', () => {
      expect(components.Navbar).toBeDefined()
      expect(typeof components.Navbar).toBe('function')
    })

    it('should export Welcome component', () => {
      expect(components.Welcome).toBeDefined()
      expect(typeof components.Welcome).toBe('function')
    })

    it('should export exactly two components', () => {
      const exportedKeys = Object.keys(components)
      expect(exportedKeys).toHaveLength(2)
    })

    it('should contain Navbar in exports', () => {
      expect(components).toHaveProperty('Navbar')
    })

    it('should contain Welcome in exports', () => {
      expect(components).toHaveProperty('Welcome')
    })
  })

  describe('Export Types', () => {
    it('should export Navbar as a React component', () => {
      expect(components.Navbar).toBe(Navbar)
    })

    it('should export Welcome as a React component', () => {
      expect(components.Welcome).toBe(Welcome)
    })

    it('should export functions (React components)', () => {
      expect(typeof components.Navbar).toBe('function')
      expect(typeof components.Welcome).toBe('function')
    })
  })

  describe('Import Integrity', () => {
    it('should maintain correct reference to Navbar', () => {
      const { Navbar: ImportedNavbar } = components
      expect(ImportedNavbar).toBe(Navbar)
    })

    it('should maintain correct reference to Welcome', () => {
      const { Welcome: ImportedWelcome } = components
      expect(ImportedWelcome).toBe(Welcome)
    })
  })

  describe('Re-export Verification', () => {
    it('should re-export components correctly', () => {
      // Verify that the exports match the original imports
      expect(components.Navbar.name).toBe('Navbar')
      expect(components.Welcome.name).toBe('Welcome')
    })

    it('should not modify components during export', () => {
      // Components should be exported as-is
      expect(components.Navbar).toStrictEqual(Navbar)
      expect(components.Welcome).toStrictEqual(Welcome)
    })
  })

  describe('Destructuring', () => {
    it('should allow destructuring of Navbar', () => {
      const { Navbar: DestructuredNavbar } = components
      expect(DestructuredNavbar).toBeDefined()
      expect(DestructuredNavbar).toBe(Navbar)
    })

    it('should allow destructuring of Welcome', () => {
      const { Welcome: DestructuredWelcome } = components
      expect(DestructuredWelcome).toBeDefined()
      expect(DestructuredWelcome).toBe(Welcome)
    })

    it('should allow destructuring both components together', () => {
      const { Navbar: Nav, Welcome: Wel } = components
      expect(Nav).toBe(Navbar)
      expect(Wel).toBe(Welcome)
    })
  })

  describe('Module Structure', () => {
    it('should be a valid ES module', () => {
      expect(components).toBeDefined()
      expect(typeof components).toBe('object')
    })

    it('should not export default', () => {
      expect(components.default).toBeUndefined()
    })

    it('should only export named exports', () => {
      const keys = Object.keys(components)
      expect(keys.every(key => key !== 'default')).toBe(true)
    })
  })

  describe('Component Availability', () => {
    it('should make Navbar available for import', () => {
      expect(() => {
        const { Navbar } = components
        return Navbar
      }).not.toThrow()
    })

    it('should make Welcome available for import', () => {
      expect(() => {
        const { Welcome } = components
        return Welcome
      }).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple imports of the same component', () => {
      const { Navbar: Nav1 } = components
      const { Navbar: Nav2 } = components
      expect(Nav1).toBe(Nav2)
    })

    it('should handle importing all components at once', () => {
      const allComponents = { ...components }
      expect(allComponents.Navbar).toBeDefined()
      expect(allComponents.Welcome).toBeDefined()
    })

    it('should not have undefined exports', () => {
      expect(components.Navbar).not.toBeUndefined()
      expect(components.Welcome).not.toBeUndefined()
    })
  })

  describe('Type Safety', () => {
    it('should export callable functions', () => {
      expect(typeof components.Navbar).toBe('function')
      expect(typeof components.Welcome).toBe('function')
    })

    it('should not export null or undefined values', () => {
      Object.values(components).forEach(component => {
        expect(component).not.toBeNull()
        expect(component).not.toBeUndefined()
      })
    })
  })
})

describe('Component Index File - Path Resolution', () => {
  it('should correctly resolve Navbar path', () => {
    expect(components.Navbar).toBeDefined()
  })

  it('should correctly resolve Welcome path', () => {
    expect(components.Welcome).toBeDefined()
  })

  it('should use #components alias correctly', () => {
    // This test verifies the alias works by ensuring imports succeed
    expect(components.Navbar).toBeTruthy()
    expect(components.Welcome).toBeTruthy()
  })
})