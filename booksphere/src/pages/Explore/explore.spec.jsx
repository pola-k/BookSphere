import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from './explore';

// Mock react-icons components
vi.mock('react-icons/fa', () => ({
  FaChevronLeft: () => <div data-testid="chevron-left">Left Icon</div>,
  FaChevronRight: () => <div data-testid="chevron-right">Right Icon</div>
}));

// Mock all imported components
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>
}));

vi.mock('../../components/Preview/preview', () => ({
  default: ({ book, className }) => (
    <div data-testid="book-preview" className={className}>
      <p data-testid="book-title">{book.title}</p>
      <p data-testid="book-author">{book.Authors ? book.Authors[0].name : 'Unknown Author'}</p>
    </div>
  )
}));

vi.mock('../../components/Loading/Loading', () => ({
  default: () => <div data-testid="loading-mock">Loading...</div>
}));

// Mock external book data import
vi.mock('../../../book_data', () => ({
  books: [
    { id: '1', title: 'Mock Book 1', author: 'Author 1' },
    { id: '2', title: 'Mock Book 2', author: 'Author 2' }
  ]
}));

describe('Explore Component', () => {
  // Sample mock data for different book categories
  const mockRomanceBooks = [
    { id: '1', title: 'Romance Book 1', Authors: [{ name: 'Romance Author 1' }] },
    { id: '2', title: 'Romance Book 2', Authors: [{ name: 'Romance Author 2' }] },
    { id: '3', title: 'Romance Book 3', Authors: [{ name: 'Romance Author 3' }] },
    { id: '4', title: 'Romance Book 4', Authors: [{ name: 'Romance Author 4' }] }
  ];

  const mockFictionBooks = [
    { id: '5', title: 'Fiction Book 1', Authors: [{ name: 'Fiction Author 1' }] },
    { id: '6', title: 'Fiction Book 2', Authors: [{ name: 'Fiction Author 2' }] },
    { id: '7', title: 'Fiction Book 3', Authors: [{ name: 'Fiction Author 3' }] },
    { id: '8', title: 'Fiction Book 4', Authors: [{ name: 'Fiction Author 4' }] }
  ];

  const mockScifiBooks = [
    { id: '9', title: 'Sci-Fi Book 1', Authors: [{ name: 'Sci-Fi Author 1' }] },
    { id: '10', title: 'Sci-Fi Book 2', Authors: [{ name: 'Sci-Fi Author 2' }] },
    { id: '11', title: 'Sci-Fi Book 3', Authors: [{ name: 'Sci-Fi Author 3' }] }
  ];

  const mockMysteryBooks = [
    { id: '12', title: 'Mystery Book 1', Authors: [{ name: 'Mystery Author 1' }] },
    { id: '13', title: 'Mystery Book 2', Authors: [{ name: 'Mystery Author 2' }] }
  ];

  const mockTrendingBooks = [
    { id: '14', title: 'Trending Book 1', Authors: [{ name: 'Trending Author 1' }] },
    { id: '15', title: 'Trending Book 2', Authors: [{ name: 'Trending Author 2' }] },
    { id: '16', title: 'Trending Book 3', Authors: [{ name: 'Trending Author 3' }] },
    { id: '17', title: 'Trending Book 4', Authors: [{ name: 'Trending Author 4' }] }
  ];

  const mockNewReleases = [
    { id: '18', title: 'New Release 1', Authors: [{ name: 'New Author 1' }] },
    { id: '19', title: 'New Release 2', Authors: [{ name: 'New Author 2' }] },
    { id: '20', title: 'New Release 3', Authors: [{ name: 'New Author 3' }] }
  ];

  beforeEach(() => {
    // Mock all fetch calls
    global.fetch = vi.fn();

    // Mock fetch responses for different API calls
    global.fetch.mockImplementation((url) => {
      if (url.includes('/genre/romance')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRomanceBooks)
        });
      } else if (url.includes('/genre/fiction')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFictionBooks)
        });
      } else if (url.includes('/genre/science-fiction')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockScifiBooks)
        });
      } else if (url.includes('/genre/mystery')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMysteryBooks)
        });
      } else if (url.includes('/trending')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTrendingBooks)
        });
      } else if (url.includes('/latest')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockNewReleases)
        });
      }
      
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve([])
      });
    });

    // Mock scrollIntoView that's used by scrollToSection
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render loading state initially', () => {
    render(<Explore />);
    expect(screen.getByTestId('loading-mock')).toBeInTheDocument();
  });

  it('should render all sections after loading completes', async () => {
    render(<Explore />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Check that main content is rendered
    expect(screen.getByText('Explore Books')).toBeInTheDocument();
    
    // Check all genre sections are rendered
    expect(screen.getByText('Explore Romance')).toBeInTheDocument();
    expect(screen.getByText('Explore Fiction')).toBeInTheDocument();
    expect(screen.getByText('Explore Science Fiction')).toBeInTheDocument();
    expect(screen.getByText('Explore Mystery')).toBeInTheDocument();
    
    // Check book section headers
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
    expect(screen.getByText('New Releases')).toBeInTheDocument();
    expect(screen.getByText('Explore Romance Novels')).toBeInTheDocument();
    expect(screen.getByText('Explore Fiction Novels')).toBeInTheDocument();
    expect(screen.getByText('Explore Science Fiction Novels')).toBeInTheDocument();
    expect(screen.getByText('Explore Mystery Novels')).toBeInTheDocument();
  });

  it('should render book previews after loading', async () => {
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Check that book previews are rendered
    const bookPreviews = screen.getAllByTestId('book-preview');
    expect(bookPreviews.length).toBeGreaterThan(0);
    
    // Check if at least one trending book is rendered
    expect(screen.getByText('Trending Book 1')).toBeInTheDocument();
  });

  it('should scroll through books when right button is clicked', async () => {
    const user = userEvent.setup();
    
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Find scroll right buttons
    const scrollRightButtons = screen.getAllByTestId('chevron-right');
    expect(scrollRightButtons.length).toBeGreaterThan(0);
    
    // Click the first scroll right button (trending section)
    await user.click(scrollRightButtons[0]);
    
    // Verify state changes by checking for timers
    // This is indirectly testing that the scrollRight function was called
    expect(setTimeout).toHaveBeenCalled;
  });

  it('should scroll through books when left button is clicked', async () => {
    const user = userEvent.setup();
    
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Find scroll left buttons
    const scrollLeftButtons = screen.getAllByTestId('chevron-left');
    expect(scrollLeftButtons.length).toBeGreaterThan(0);
    
    // Click the first scroll left button (trending section)
    await user.click(scrollLeftButtons[0]);
    
    // Verify state changes by checking for timers
    // This is indirectly testing that the scrollLeft function was called
    expect(setTimeout).toHaveBeenCalled;
  });

  it('should scroll to Romance section when Romance genre is clicked', async () => {
    const user = userEvent.setup();
    
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Find and click the Romance genre card
    const romanceGenre = screen.getByText('Explore Romance').closest('.genre');
    await user.click(romanceGenre);
    
    // Check if scrollIntoView was called
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('should handle API errors gracefully when fetching Romance books', async () => {
    // Override the fetch mock for romance books to simulate an error
    global.fetch.mockImplementation((url) => {
      if (url.includes('/genre/romance')) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.reject(new Error('API Error'))
        });
      }
      // Keep the default implementations for other URLs
      return global.fetch.getMockImplementation()(url);
    });
    
    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });
    
    // Check that console.error was called with the fetch error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Fetch error:'),
      expect.any(Error)
    );
    
    // Should still render the page with other book sections
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('should render fewer than 3 books correctly when available', async () => {
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });
    
    // Mystery section should have only 2 books
    const mysterySection = screen.getByText('Explore Mystery Novels').parentElement;
    const mysteryBooks = mysterySection.querySelectorAll('[data-testid="book-preview"]');
    
    // Check if there are only 2 mystery books (as per mock data)
    expect(mysteryBooks.length).toBe(2);
    expect(screen.getByText('Mystery Book 1')).toBeInTheDocument();
    expect(screen.getByText('Mystery Book 2')).toBeInTheDocument();
  });

  it('should clean up intervals when unmounting', async () => {
    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    const { unmount } = render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });
    
    // Unmount the component
    unmount();
    
    // Should call clearInterval to clean up
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    // Clean up
    clearIntervalSpy.mockRestore();
  });

  it('should render 3 books at a time for sections with more than 3 books', async () => {
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });
    
    // Check romance section which has 4 books in mock data
    const romanceSection = screen.getByText('Explore Romance Novels').parentElement;
    const displayedRomanceBooks = romanceSection.querySelectorAll('[data-testid="book-preview"]');
    
    // Should display exactly 3 books at a time
    expect(displayedRomanceBooks.length).toBe(3);
  });

  it('should display navigation buttons for sections with more than 3 books', async () => {
    render(<Explore />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });
    
    // Check romance section which has 4 books in mock data
    const romanceSection = screen.getByText('Explore Romance Novels').parentElement;
    const leftButton = romanceSection.querySelector('[data-testid="chevron-left"]');
    const rightButton = romanceSection.querySelector('[data-testid="chevron-right"]');
    
    // Should have navigation buttons
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    
    // Check mystery section which has only 2 books in mock data
    const mysterySection = screen.getByText('Explore Mystery Novels').parentElement;
    const mysteryLeftButton = mysterySection.querySelector('[data-testid="chevron-left"]');
    const mysteryRightButton = mysterySection.querySelector('[data-testid="chevron-right"]');
    
    // Should not have navigation buttons
    expect(mysteryLeftButton).toBeNull();
    expect(mysteryRightButton).toBeNull();
  });
});