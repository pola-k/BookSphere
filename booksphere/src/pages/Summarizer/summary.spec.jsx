import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Summarizer from './summarizer';
import { vi } from 'vitest';

// Mocking the Navbar component since it's a child of Summarizer and doesn't affect the test
vi.mock('../../components/navbar', () => ({
  default: () => <div>Navbar</div>
}));

// Mock the fetch call used in the Summarizer component
global.fetch = vi.fn();

describe('Summarizer Component', () => {
  beforeEach(() => {
    // Clear any mock data before each test
    vi.clearAllMocks();
  });

  test('should render Summarizer component correctly', () => {
    render(<Summarizer />);

    // Check for the page title and description
    expect(screen.getByText('📘 AI Book Summarizer')).toBeInTheDocument();
    expect(screen.getByText('Upload your .txt or .pdf book and instantly generate a summary that saves time.')).toBeInTheDocument();
  });

  test('should handle file upload and display file name', async () => {
    render(<Summarizer />);

    const file = new File(['dummy content'], 'dummy.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/click or drag a .txt or .pdf file/i);

    // Simulate file upload
    fireEvent.change(input, { target: { files: [file] } });

    // Check that file name is displayed
    expect(screen.getByText('✅ DUMMY.TXT')).toBeInTheDocument();
  });
});
