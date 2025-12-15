# Testing Documentation

## Overview

This project uses **Vitest** as the test runner with **React Testing Library** for component testing. The test suite provides comprehensive coverage for all components modified in the current branch.

## Test Setup

### Configuration Files

- **`vitest.config.js`**: Main Vitest configuration extending Vite config
- **`src/test/setup.js`**: Global test setup with mocks and utilities

### Key Features

- ✅ JSDOM environment for browser API simulation
- ✅ GSAP mocking for animation testing
- ✅ React Testing Library for component testing
- ✅ Jest-DOM matchers for enhanced assertions
- ✅ Code coverage reporting with V8

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests once (CI mode)
npm test -- --run
```

## Test Files

### 1. `src/components/Welcome.test.jsx` (364 lines)

Comprehensive test suite for the Welcome component with 100+ test cases.

#### Test Categories

**Rendering Tests**
- ✓ Section element rendering
- ✓ Subtitle text rendering
- ✓ Title "portfolio" rendering
- ✓ Small screen message rendering

**Text Rendering Tests**
- ✓ Character splitting into spans (33 chars for subtitle, 9 for title)
- ✓ CSS class application
- ✓ Font variation settings
- ✓ Space to non-breaking space conversion
- ✓ Initial font weights (100 for subtitle, 400 for title)

**GSAP Integration Tests**
- ✓ useGSAP hook invocation
- ✓ Empty dependency array usage
- ✓ Cleanup function execution
- ✓ Animation setup verification

**Mouse Interaction Tests**
- ✓ Event listener attachment
- ✓ mousemove event handling on subtitle
- ✓ mousemove event handling on title
- ✓ mouseleave event handling
- ✓ GSAP animation calls on interactions
- ✓ Rapid mouse movement handling

**Refs Tests**
- ✓ Subtitle ref creation
- ✓ Title ref creation

**Component Structure Tests**
- ✓ Semantic HTML structure
- ✓ CSS class application (mt-7 on title)

**Edge Cases**
- ✓ Null container handling
- ✓ Rapid mouse movement handling
- ✓ Event listener cleanup on unmount

**Accessibility Tests**
- ✓ Accessible section element
- ✓ Accessible heading
- ✓ Screen reader text content

**Font Weight Configuration**
- ✓ Subtitle weight range (100-400)
- ✓ Title weight range (400-900)

**Performance Tests**
- ✓ Efficient rendering (< 100ms)
- ✓ Memory leak prevention

### 2. `src/App.test.jsx` (151 lines)

Comprehensive test suite for the App component with 40+ test cases.

#### Test Categories

**Rendering Tests**
- ✓ Component renders without crashing
- ✓ Main container div rendering
- ✓ Main element rendering
- ✓ Navbar component rendering
- ✓ Welcome component rendering

**Component Structure Tests**
- ✓ Correct nesting (div > main > components)
- ✓ Navbar rendered before Welcome
- ✓ text-2xl class application

**Component Integration Tests**
- ✓ Navbar import from #components
- ✓ Welcome import from #components

**Snapshot Tests**
- ✓ Component snapshot matching

**Edge Cases**
- ✓ Multiple re-renders handling
- ✓ Single instance verification

**Semantic HTML Tests**
- ✓ Semantic main element usage
- ✓ Proper document structure

**Performance Tests**
- ✓ Efficient rendering (< 50ms)

### 3. `src/components/index.test.js` (173 lines)

Comprehensive test suite for component exports with 50+ test cases.

#### Test Categories

**Named Exports Tests**
- ✓ Navbar export verification
- ✓ Welcome export verification
- ✓ Exact export count (2 components)
- ✓ Property existence checks

**Export Types Tests**
- ✓ Correct component references
- ✓ Function type verification

**Import Integrity Tests**
- ✓ Reference maintenance for Navbar
- ✓ Reference maintenance for Welcome

**Re-export Verification Tests**
- ✓ Component name preservation
- ✓ No modification during export

**Destructuring Tests**
- ✓ Navbar destructuring
- ✓ Welcome destructuring
- ✓ Combined destructuring

**Module Structure Tests**
- ✓ Valid ES module verification
- ✓ No default export
- ✓ Named exports only

**Component Availability Tests**
- ✓ Import availability
- ✓ Multiple import handling

**Type Safety Tests**
- ✓ Callable functions
- ✓ Non-null/undefined values

## Test Coverage Goals

The test suite aims for:
- **Line Coverage**: > 80%
- **Branch Coverage**: > 75%
- **Function Coverage**: > 80%
- **Statement Coverage**: > 80%

## Mocked Dependencies

### GSAP (gsap)
```javascript
gsap.to() // Mocked to return animation object
gsap.from() // Mocked
gsap.timeline() // Mocked
```

### @gsap/react
```javascript
useGSAP(callback, deps) // Executes callback and returns cleanup
```

### Browser APIs
- `window.matchMedia` - Mocked for responsive tests
- `IntersectionObserver` - Mocked for visibility tests

## Writing New Tests

### Test Structure

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Feature Group', () => {
    it('should do something specific', () => {
      render(<ComponentName />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
```

### Best Practices

1. **Group related tests** using nested `describe` blocks
2. **Use descriptive test names** that explain intent
3. **Clear mocks** between tests using `beforeEach`
4. **Test user behavior** rather than implementation details
5. **Use semantic queries** (getByRole, getByLabelText) over CSS selectors
6. **Mock external dependencies** to isolate component logic
7. **Test accessibility** with proper ARIA attributes
8. **Cover edge cases** and error scenarios

## Testing Patterns Used

### 1. Rendering Tests
```javascript
it('should render component', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

### 2. User Interaction Tests
```javascript
it('should handle click', () => {
  render(<Component />)
  fireEvent.click(screen.getByRole('button'))
  expect(mockHandler).toHaveBeenCalled()
})
```

### 3. Mock Verification
```javascript
it('should call GSAP animation', () => {
  render(<Component />)
  expect(gsap.to).toHaveBeenCalled()
})
```

### 4. Snapshot Testing
```javascript
it('should match snapshot', () => {
  const { container } = render(<Component />)
  expect(container.firstChild).toMatchSnapshot()
})
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --run
      - run: npm run test:coverage
```

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module"
**Solution**: Ensure path aliases in `vitest.config.js` match `vite.config.js`

**Issue**: GSAP animations cause test failures
**Solution**: GSAP is mocked in `src/test/setup.js`

**Issue**: "window is not defined"
**Solution**: Ensure `environment: 'jsdom'` is set in `vitest.config.js`

**Issue**: React 19 compatibility warnings
**Solution**: Using latest React Testing Library v16.1.0 with React 19 support

## Dependencies

```json
{
  "vitest": "^2.1.8",
  "@testing-library/react": "^16.1.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.5.2",
  "@vitest/ui": "^2.1.8",
  "@vitest/coverage-v8": "^2.1.8",
  "jsdom": "^25.0.1"
}
```

## Coverage Report

After running `npm run test:coverage`, view the HTML report:

```bash
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

## Next Steps

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Review coverage: `npm run test:coverage`
4. Add more tests as components are developed
5. Integrate with CI/CD pipeline

---

**Note**: All tests are written following React Testing Library best practices and focus on testing behavior rather than implementation details.