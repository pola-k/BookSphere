import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// ✅ Create a mock navigate function outside so it's reusable
const mockedNavigate = vi.fn();

// ✅ Mock react-router-dom including useNavigate directly
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>, // optional: stub Link
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    mockedNavigate.mockReset(); // reset before each test
    sessionStorage.clear(); // clear storage
  });

  it('should render form and allow user to login successfully', async () => {
    axios.post.mockResolvedValue({
      data: {
        user_id: '12345',
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/api/auth/login',
        { email: 'test@example.com', password: 'password123' },
        { withCredentials: true }
      );

      expect(sessionStorage.getItem('user_id')).toBe('12345');
      expect(mockedNavigate).toHaveBeenCalledWith('/profile');
    });
  });

  it('should show error message on failed login', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'fail@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
