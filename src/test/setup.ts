import '@testing-library/jest-dom'
import { beforeAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: vi.fn(),
    useNavigate: () => vi.fn()
  }
})

beforeAll(() => {
  // global setup
})

afterEach(() => {
  cleanup()
})