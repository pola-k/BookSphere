import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsPage from './Settings';
import axios from 'axios';

// Mock dependencies
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    // Mock useState, useEffect and useRef but preserve their actual implementation
    useState: actual.useState,
    useEffect: actual.useEffect,
    useRef: actual.useRef,
  };
});

vi.mock('axios');
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar</div>,
}));

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

describe('SettingsPage', () => {
  const mockUserId = 'user123';
  const mockProfileData = {
    username: 'test@example.com',
    fullName: 'Test User',
    imageUrl: 'http://example.com/image.jpg',
    bio: 'Test bio'
  };
  
  // Setup mock URL functions for image previews
  global.URL.createObjectURL = vi.fn(() => 'mock-url');
  global.URL.revokeObjectURL = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock sessionStorage getItem
    mockSessionStorage.getItem.mockReturnValue(mockUserId);
    
    // Mock axios responses
    axios.get.mockResolvedValue({ data: mockProfileData });
    axios.post.mockResolvedValue({ 
      data: { 
        user: { 
          image: 'http://example.com/new-image.jpg' 
        } 
      } 
    });
    axios.defaults = {
      baseURL: 'http://localhost:5001',
      withCredentials: true
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the settings page with navbar', async () => {
    render(<SettingsPage />);
    
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('loads user profile data on mount', async () => {
    render(<SettingsPage />);
    
    // Verify axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(`/api/auth/profile/${mockUserId}`);
    
    // Wait for profile data to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    });
  });

  it('toggles password visibility when eye icon is clicked', async () => {
    render(<SettingsPage />);
    
    // Find password input and toggle button
    const passwordInput = screen.getByPlaceholderText('••••••••');
    expect(passwordInput.type).toBe('password');
    
    // Click the toggle button
    const toggleButton = screen.getByRole('button', { name: /Toggle password visibility/i });
    await userEvent.click(toggleButton);
    
    // Password should now be visible
    expect(passwordInput.type).toBe('text');
    
    // Click again to hide
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('handles API errors during submit', async () => {
    // Setup error response for this test
    axios.post.mockRejectedValueOnce({ 
      response: { 
        data: { message: 'Email already in use' } 
      } 
    });
    
    render(<SettingsPage />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    });
    
    // Change email
    const emailInput = screen.getByDisplayValue('test@example.com');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'new@example.com');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Apply Changes/i });
    await userEvent.click(submitButton);
    
    // Check error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });
  });

  it('handles case when no user_id is in sessionStorage', async () => {
    // Mock sessionStorage to return null for user_id
    mockSessionStorage.getItem.mockReturnValueOnce(null);
    
    render(<SettingsPage />);
    
    // Check error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Could not load profile.')).toBeInTheDocument();
    });
  });

});