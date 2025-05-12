import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SavedPosts from './saved_posts';
import axios from 'axios';

// ✅ Mock axios
vi.mock('axios');

// ✅ Mock sessionStorage
vi.stubGlobal('sessionStorage', {
  getItem: vi.fn(() => 'user123'),
});

// ✅ Mock Post component
vi.mock('./post', () => ({
  default: ({ post }) => <div data-testid="post">{post.title}</div>
}));

// ✅ Spy object to hold the passed props
let fetchObjectsSpy = null;

// ✅ Mock InfiniteScroll with prop capture
vi.mock('./infinite-scroll', () => ({
  default: (props) => {
    fetchObjectsSpy = props.fetchObjects;
    const mockPosts = [
      { id: 1, title: 'Mock Post 1', isSaved: true },
      { id: 2, title: 'Mock Post 2', isSaved: true }
    ];
    return <div>{props.renderObjects(mockPosts, vi.fn(), true)}</div>;
  }
}));

describe('SavedPosts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Saved Posts heading and all posts', () => {
    render(<SavedPosts />);
    expect(screen.getByText('Saved Posts')).toBeInTheDocument();
    expect(screen.getAllByTestId('post')).toHaveLength(2);
  });

  it('calls axios with correct params when fetching posts', async () => {
    // Mock response
    axios.get.mockResolvedValueOnce({
      data: {
        saved_posts: [{ id: 1, title: 'Fetched Post', isSaved: true }]
      }
    });

    render(<SavedPosts />);

    // Act: call the real fetchObjects function
    await fetchObjectsSpy(1, 10);

    // Assert: axios called correctly
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5001/api/auth/get-saved-posts?user_id=user123',
      expect.objectContaining({
        params: {
          user_id: 'user123',
          page: 1,
          limit: 10,
        },
        withCredentials: true
      })
    );
  });
  
});
