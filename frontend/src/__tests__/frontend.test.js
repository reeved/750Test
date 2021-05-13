import mockAxios from 'jest-mock-axios';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  mockAxios.reset();
});

it('Loads Page', async () => {
  // Checks for credits
  expect(screen.queryByText(/Made by: Reeve/)).toBeTruthy();

  // Ensures data isn't available yet
  expect(screen.queryByText(/Button is/)).toBeNull();
  expect(screen.queryByText(/Button has been clicked/)).toBeNull();

  // Checks that the GET method was called on initial render and others not
  expect(mockAxios.get).toHaveBeenCalledWith('/Button1');
  expect(mockAxios.post).not.toHaveBeenCalled();
  expect(mockAxios.put).not.toHaveBeenCalled();
});

it('Tries to create button in DB if it doesn not exist', async () => {
  // Simulates an error that the button in GET method didn't exist
  await act(async () => mockAxios.mockError('This is an Error'));

  // Should have rendered data to initial when creating a button
  expect(screen.queryByText('Button is Unpressed')).toBeTruthy();
  expect(screen.queryByText('Button has been clicked 0 times')).toBeTruthy();

  // Should have sent only a POST request to create a new button
  expect(mockAxios.post).toHaveBeenCalled();
  expect(mockAxios.put).not.toHaveBeenCalled();
});

describe('Functionality Tests', () => {
  // Get mocked data before each test so that data is rendered
  beforeEach(async () => {
    // Return data for mocked GET method
    const data = {
      state: true,
      clickCount: 10,
    };
    await act(async () => mockAxios.mockResponse({ data }));
  });

  it('Data is rendered once received', () => {
    // Checks that button and click count are now rendered after receiving data
    expect(screen.queryByText('Button is Pressed')).toBeTruthy();
    expect(screen.queryByText('Button has been clicked 10 times')).toBeTruthy();
  });

  it('Button and Click count change on Click', () => {
    const button = screen.getByText(/Button is/);
    fireEvent.click(button);

    // Checks old information is not present anymore
    expect(screen.queryByText('Button is Pressed')).toBeNull();
    expect(screen.queryByText('Button has been clicked 10 times')).toBeNull();

    // Checks that new information has been set
    expect(screen.queryByText('Button is Unpressed')).toBeTruthy();
    expect(screen.queryByText('Button has been clicked 11 times')).toBeTruthy();

    // Makes sure PUT method was called
    expect(mockAxios.put).toHaveBeenCalled();
  });
});
