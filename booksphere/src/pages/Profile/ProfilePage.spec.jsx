import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Import the component to test
import ProfilePage from './ProfilePage';

vi.mock('/images/profile-icon-light.png', () => ({
  default: () => 'mocked-profile-pic-path'
}));

// Mock the dependencies
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>
}));

vi.mock('../../components/sidebar', () => ({
  default: () => <div data-testid="sidebar-mock">Sidebar Mock</div>
}));

vi.mock('../../components/home-feed', () => ({
  default: ({ feedType }) => <div data-testid="home-feed-mock">Home Feed Mock - Type: {feedType}</div>
}));

vi.mock('../../components/recommendations-feed', () => ({
  default: () => <div data-testid="recommendations-feed-mock">Recommendations Feed Mock</div>
}));

vi.mock('../../components/Profile/Profile', () => ({
  default: ({ username, fullName, description, imageUrl }) => (
    <div data-testid="profile-component-mock">
      <p data-testid="username">{username}</p>
      <p data-testid="fullName">{fullName}</p>
      <p data-testid="description">{description}</p>
      <img data-testid="profile-image" src={imageUrl} alt="Profile" />
    </div>
  )
}));

// Mock axios
vi.mock('axios');

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
};

describe('ProfilePage Component', () => {
  const originalSessionStorage = window.sessionStorage;
  
  beforeEach(() => {
    // Setup mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true
    });

    // Reset mock for sessionStorage.getItem
    mockSessionStorage.getItem.mockReset();
    
    // Reset any mocks before each test
    vi.resetAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks();
    
    // Restore original sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage
    });
  });

  it('should render loading state initially', () => {
    // Mock sessionStorage to return a user ID
    mockSessionStorage.getItem.mockReturnValue('user123');
    
    // Mock axios to delay response
    const axios = require('axios');
    axios.default.get = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<ProfilePage />);
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading profile...')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    
    // Sidebar should not be present in loading state
    expect(screen.queryByTestId('sidebar-mock')).not.toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    // Mock user ID in session storage
    mockSessionStorage.getItem.mockReturnValue('user123');
    
    // Mock API error
    const mockError = new Error('Failed to fetch user data');
    const axios = require('axios');
    axios.default.get = vi.fn().mockRejectedValue(mockError);
    
    // Mock console.log
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<ProfilePage />);
    
    // Initially should show loading
    expect(screen.getByText('Loading profile...')).toBeInTheDocument();
    
    // Wait for error handling to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading profile...')).not.toBeInTheDocument();
    });
    
    // Should log error
    expect(consoleLogSpy).toHaveBeenCalledWith("Failed to fetch user data:", mockError);
    
    // Restore console.log
    consoleLogSpy.mockRestore();
  });

  it('should have the correct layout structure', async () => {
    // Mock user ID in session storage and successful API response
    mockSessionStorage.getItem.mockReturnValue('user123');
    
    const mockProfileData = {
      username: 'testuser',
      fullName: 'Test User',
      description: 'Test Bio',
      imageUrl: 'test-image.jpg'
    };
    
    const axios = require('axios');
    axios.default.get = vi.fn().mockResolvedValue({ data: mockProfileData });
    
    render(<ProfilePage />);
    
    // Wait for profile data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading profile...')).not.toBeInTheDocument();
    });
    
    // Check main container structure
    const mainContainer = screen.getByTestId('navbar-mock').parentElement;
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('flex-col');
    expect(mainContainer).toHaveClass('grid');
    expect(mainContainer).toHaveClass('grid-rows-[8%_92%]');
    expect(mainContainer).toHaveClass('h-screen');
    
    // Check grid layout of content area
    const contentGrid = screen.getByTestId('sidebar-mock').parentElement.parentElement;
    expect(contentGrid).toHaveClass('grid');
    expect(contentGrid).toHaveClass('grid-cols-[20%_20%_35%_25%]');
    
    // Check sidebar container
    const sidebarContainer = screen.getByTestId('sidebar-mock').parentElement;
    expect(sidebarContainer).toHaveClass('col-span-1');
    expect(sidebarContainer).toHaveClass('overflow-y-auto');
    
    // Check main content container
    const mainContentContainer = screen.getByTestId('profile-component-mock').parentElement.parentElement;
    expect(mainContentContainer).toHaveClass('col-span-2');
    expect(mainContentContainer).toHaveClass('h-full');
    expect(mainContentContainer).toHaveClass('overflow-y-auto');
    expect(mainContentContainer).toHaveClass('border-1');
    expect(mainContentContainer).toHaveClass('px-[3vw]');
    expect(mainContentContainer).toHaveClass('py-[4vh]');
    
    // Check recommendations container
    const recommendationsContainer = screen.getByTestId('recommendations-feed-mock').parentElement;
    expect(recommendationsContainer).toHaveClass('col-span-1');
    expect(recommendationsContainer).toHaveClass('border-1');
    expect(recommendationsContainer).toHaveClass('h-full');
    expect(recommendationsContainer).toHaveClass('overflow-y-auto');
    expect(recommendationsContainer).toHaveClass('px-[1.5vw]');
    expect(recommendationsContainer).toHaveClass('py-[3vh]');
  });
});