// test/pages/SavedPostsPage.test.jsx
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SavedPostsPage from './saved-posts-page';

// Mock all child components with identifiers
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}));

vi.mock('../../components/sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>
}));

vi.mock('../../components/saved_posts', () => ({
  default: () => <div data-testid="saved-posts">SavedPosts</div>
}));

vi.mock('../../components/recommendations-feed', () => ({
  default: () => <div data-testid="recommendations-feed">RecommendationsFeed</div>
}));

describe('SavedPostsPage', () => {
  it('renders all sections correctly', () => {
    render(<SavedPostsPage />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('saved-posts')).toBeInTheDocument();
    expect(screen.getByTestId('recommendations-feed')).toBeInTheDocument();
  });

  it('places each section into correct grid columns', () => {
    const { container } = render(<SavedPostsPage />);

    const sidebar = screen.getByTestId('sidebar');
    const savedPosts = screen.getByTestId('saved-posts');
    const recommendations = screen.getByTestId('recommendations-feed');

    const sidebarCol = sidebar.closest('div.col-span-1');
    const savedPostsCol = savedPosts.closest('div.col-span-2');
    const recommendationsCol = recommendations.closest('div.col-span-1');

    expect(sidebarCol).toBeInTheDocument();
    expect(savedPostsCol).toBeInTheDocument();
    expect(recommendationsCol).toBeInTheDocument();
  });

  it('ensures all sections are scrollable when content overflows', () => {
    const { container } = render(<SavedPostsPage />);
    const scrollableDivs = container.querySelectorAll('div.overflow-y-auto');
    expect(scrollableDivs.length).toBeGreaterThanOrEqual(3); // Sidebar, SavedPosts, Recommendations
  });
});
