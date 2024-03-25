import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';

const mockedSetTodo = jest.fn();

describe('AddInput', () => {
  test('should render input element', () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: { value: 'Go Grocery Shopping' },
    });
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe('');
  });
});
