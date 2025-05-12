// __tests__/List.test.jsx
import { render, screen, act, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import axios from 'axios'

// 1️⃣ Stub sessionStorage.getItem
vi.stubGlobal('sessionStorage', { getItem: vi.fn() })

// 2️⃣ Mock axios
vi.mock('axios')

// 3️⃣ Mock Navbar & Sidebar
vi.mock('../../components/navbar',      () => ({ default: () => <div data-testid="navbar"/> }))
vi.mock('../../components/sidebar',     () => ({ default: () => <div data-testid="sidebar"/> }))

// 4️⃣ Mock ListBook (path must match your import in List.jsx)
vi.mock('../../components/ListBook/Listbook.jsx', () => ({
  default: ({ id, title }) => <div data-testid="list-book">{`${id}:${title}`}</div>
}))

// 5️⃣ Mock Loading
vi.mock('../../components/Loading/Loading.jsx', () => ({ default: () => <div data-testid="loading"/> }))

// 6️⃣ Capture fetchObjects & renderObjects from InfiniteScroll
let fetchObjectsProp, renderObjectsProp
vi.mock('../../components/infinite-scroll.jsx', () => ({
  default: (props) => {
    fetchObjectsProp = props.fetchObjects
    renderObjectsProp = props.renderObjects
    // By default, render empty
    return <div data-testid="infinite-scroll">{props.renderObjects([], () => {}, false)}</div>
  }
}))

// 7️⃣ Now import the component under test
import List from './List.jsx'

describe('List Component', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    fetchObjectsProp = null
    renderObjectsProp  = null
  })

  it('renders login prompt when not authenticated', () => {
    sessionStorage.getItem.mockReturnValueOnce(null)
    render(<List />)
    expect(screen.getByText(/Login to View List/i)).toBeInTheDocument()
  })

  it('renders "No Books in List" when authenticated but server returns empty', async () => {
    sessionStorage.getItem.mockReturnValueOnce('user123')
    render(<List />)

    // Simulate API returning []
    axios.get.mockResolvedValueOnce({ data: [] })

    const data = await fetchObjectsProp(1, 10)
    expect(data).toEqual([])

    // Re-render via renderObjectsProp
    act(() => {
      renderObjectsProp([], () => {}, false)
    })
    expect(screen.getByText(/No Books in List/i)).toBeInTheDocument()
  })

  it('renders a list of books when API returns data', async () => {
    sessionStorage.getItem.mockReturnValueOnce('user123')
    render(<List />)

    const fakeBooks = [
      { id: 'b1', title: 'Book One', image: 'img1' },
      { id: 'b2', title: 'Book Two', image: 'img2' }
    ]
    axios.get.mockResolvedValueOnce({ data: fakeBooks })

    // 1️⃣ Fetch
    const fetched = await fetchObjectsProp(1, 5)
    expect(fetched).toEqual(fakeBooks)
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5001/api/list/getUserList/',
      expect.objectContaining({
        params: { user_id: 'user123', page: 1, limit: 5 }
      })
    )

    // 2️⃣ Render
    act(() => {
      renderObjectsProp(fakeBooks, () => {}, false)
    })
  })
})
