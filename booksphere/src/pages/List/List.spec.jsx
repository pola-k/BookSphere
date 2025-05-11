import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import List from './List';
import axios from 'axios';
import React from 'react';
import { vi } from 'vitest';

vi.mock('axios');
vi.mock('../../components/navbar', () => ({
  default: () => <div data-testid="navbar" />
}));
vi.mock('../../components/sidebar', () => ({
  default: () => <div data-testid="sidebar" />
}));
vi.mock('../../components/ListBook/Listbook.jsx', () => ({
  default: ({ title }) => <div data-testid="list-book">{title}</div>
}));
vi.mock('../../components/Loading/Loading.jsx', () => ({
  default: () => <div data-testid="loading">Loading...</div>
}));

describe('List Component', () => {

  const userId = '123';

  beforeEach(() => {
      sessionStorage.setItem('user_id', userId); // Set user_id in sessionStorage
  });

  afterEach(() => {
      vi.clearAllMocks(); // Clean up mocks
  });

  test('renders loading state initially', async () => {
      axios.get.mockResolvedValue({ data: [] });

      render(<List />);

      // Assert that the loading component is rendered
      expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders list of books after data is fetched', async () => {
      axios.get.mockResolvedValue({ data: [{ id: 1, title: '1984', image: 'someurl' }] });

      render(<List />);

      // Wait for data to be fetched and rendered
      await waitFor(() => screen.getByText('1984'));

      // Assert that the book title is rendered
      expect(screen.getByText('1984')).toBeInTheDocument();
  });

  test('shows "No Books in List" when there are no books', async () => {
      axios.get.mockResolvedValue({ data: [] });

      render(<List />);

      // Wait for the loading to finish and check for empty state
      await waitFor(() => screen.getByText('No Books in List'));

      // Assert that the "No Books in List" message is displayed
      expect(screen.getByText('No Books in List')).toBeInTheDocument();
  });

  test('shows "Login to View List" when user_id is null', async () => {
      sessionStorage.removeItem('user_id'); // Remove user_id

      render(<List />);

      // Wait for loading to finish and check for login message
      await waitFor(() => screen.getByText('Login to View List'));

      // Assert that the login prompt is displayed
      expect(screen.getByText('Login to View List')).toBeInTheDocument();
  });
});