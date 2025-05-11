import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Book from './Book';

// Mock all imported components
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

vi.mock('../../components/rating', () => ({
  default: ({ rating, rateable, book_id, refetch, setNotification }) => (
    <div data-testid="rating-mock" onClick={() => rateable && refetch()}>
      Rating: {rating} - {rateable ? 'Rateable' : 'Not Rateable'} - ID: {book_id}
    </div>
  ),
}));

vi.mock('../../components/Review/review', () => ({
  default: ({ review }) => (
    <div data-testid="review-component">
      <p>Username: {review.username}</p>
      <p>Text: {review.text}</p>
      <p>Time: {review.time}</p>
    </div>
  ),
}));

vi.mock('../../components/Loading/Loading', () => ({
  default: () => <div data-testid="loading-mock">Loading...</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

// Mock axios
vi.mock('axios');

// Mock sessionStorage
const mockSessionStorage = {
  items: {},
  getItem: function(key) {
    return this.items[key] || null;
  },
  setItem: function(key, value) {
    this.items[key] = value;
  },
  clear: function() {
    this.items = {};
  }
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

describe('Book Component', () => {
  const mockBookData = {
    id: '123',
    title: 'Test Book',
    abstract: 'This is a test book abstract.',
    publisher: 'Test Publisher',
    publish_date: '2023-01-01',
    isbn: '1234567890',
    no_pages: 200,
    image: '/test-image.jpg',
    averageRating: 4.5,
    ratingCount: 10,
    Authors: [
      { name: 'Test Author', image: '/author-image.jpg' }
    ],
    Genres: [
      { name: 'fiction' },
      { name: 'mystery' }
    ]
  };

  const mockReviews = [
    {
      User: { username: 'user1', image: '/user1.jpg' },
      text: 'Great book!',
      time: new Date().toISOString(),
      user_id: '1'
    },
    {
      User: { username: 'user2', image: '/user2.jpg' },
      text: 'Amazing read!',
      time: new Date().toISOString(),
      user_id: '2'
    }
  ];

  beforeEach(() => {
    // Reset mocks and session storage
    vi.resetAllMocks();
    mockSessionStorage.clear();
    mockSessionStorage.setItem('user_id', '1');
    
    // Mock fetch for book data
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockBookData)
    });
    
    // Mock axios responses
    axios.get.mockImplementation((url) => {
      if (url.includes('CheckBookStatus')) {
        return Promise.resolve({ data: { status: 'false' } });
      } else if (url.includes('getReview')) {
        return Promise.resolve({ data: mockReviews });
      } else if (url.includes('getRatingStats')) {
        return Promise.resolve({ 
          data: { 
            averageRating: 4.5, 
            ratingCount: 10 
          } 
        });
      } else if (url.includes('getUserDetails')) {
        return Promise.resolve({ data: { user_img: '/test-user.jpg' } });
      }
      return Promise.resolve({ data: {} });
    });

    axios.post.mockResolvedValue({ status: 201 });
    axios.delete.mockResolvedValue({ data: { status: 'true' } });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render loading state initially', () => {
    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-mock')).toBeInTheDocument();
  });

  it('should render book details after loading', async () => {
    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Check that book details are rendered
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('This is a test book abstract.')).toBeInTheDocument();
    expect(screen.getByText('Test Publisher')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('FICTION')).toBeInTheDocument();
    expect(screen.getByText('MYSTERY')).toBeInTheDocument();
  });

  it('should display error when book is not found', async () => {
    // Mock fetch to return error
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Book not found')).toBeInTheDocument();
  });

  it('should render reviews properly', async () => {
    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Check for reviews title with count
    expect(screen.getByText('Reviews 2')).toBeInTheDocument();
    
    // Check for review components
    const reviewComponents = screen.getAllByTestId('review-component');
    expect(reviewComponents).toHaveLength(2);
    expect(screen.getByText('Username: user1')).toBeInTheDocument();
    expect(screen.getByText('Text: Great book!')).toBeInTheDocument();
  });

  it('should display message when no reviews are available', async () => {
    // Mock axios to return empty reviews array
    axios.get.mockImplementation((url) => {
      if (url.includes('getReview')) {
        return Promise.resolve({ data: [] });
      }
      // Keep default implementations for other URLs
      return axios.get.getMockImplementation()(url);
    });

    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('should add book to list when button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Click on "Add to List" button
    const addButton = screen.getByText('Add to List');
    await user.click(addButton);

    // Check if API was called
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/api/list/addBookToList/', {
      user_id: '1',
      book_id: '123'
    });

    // Check if notification is shown
    await waitFor(() => {
      expect(screen.getByText('Book added to your list')).toBeInTheDocument();
    });
  });

  it('should remove book from list when button is clicked', async () => {
    const user = userEvent.setup();
    
    // Mock book already added to list
    axios.get.mockImplementation((url) => {
      if (url.includes('CheckBookStatus')) {
        return Promise.resolve({ data: { status: 'true' } });
      }
      // Keep default implementations for other URLs
      if (url.includes('getReview')) {
        return Promise.resolve({ data: mockReviews });
      } else if (url.includes('getRatingStats')) {
        return Promise.resolve({ 
          data: { 
            averageRating: 4.5, 
            ratingCount: 10 
          } 
        });
      } else if (url.includes('getUserDetails')) {
        return Promise.resolve({ data: { user_img: '/test-user.jpg' } });
      }
      return Promise.resolve({ data: {} });
    });

    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Check that button says "Remove From List"
    const removeButton = screen.getByText('Remove From List');
    await user.click(removeButton);

    // Check if API was called
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5001/api/list/removeBookFromList/', {
      params: {
        user_id: '1',
        book_id: '123'
      }
    });

    // Check if notification is shown
    await waitFor(() => {
      expect(screen.getByText('Book removed from your list')).toBeInTheDocument();
    });
  });

  it('should show notification when user tries to add book without logging in', async () => {
    const user = userEvent.setup();
    
    // Clear session storage to simulate logged out state
    mockSessionStorage.clear();

    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Click on "Add to List" button
    const addButton = screen.getByText('Add to List');
    await user.click(addButton);

    // Check if notification is shown
    await waitFor(() => {
      expect(screen.getByText('Please login to add books to your list')).toBeInTheDocument();
    });
  });

  it('should handle API error when fetching book data', async () => {
    // Mock fetch to throw error
    global.fetch = vi.fn().mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-mock')).not.toBeInTheDocument();
    });

    // Should show book not found error
    expect(screen.getByText('Book not found')).toBeInTheDocument();
  });
});