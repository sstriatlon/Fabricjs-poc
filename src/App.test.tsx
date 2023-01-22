import '@testing-library/jest-dom'
import { getByTestId, render, screen } from '@testing-library/react'
import  App  from './App'
// it('renders hello message', () => {
//   render(<App />)
//   expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument()
  
// })
it('lala', () => {
    render(<App />)
    expect(getByTestId(document.documentElement, 'h1-element')).toBeInTheDocument()
})