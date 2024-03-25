import { fireEvent, render, screen } from '@testing-library/react';
import Todo from '../Todo';
import { BrowserRouter } from 'react-router-dom';

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};

const addTasks = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole('button', { name: /Add/i });

  tasks.forEach((task) => {
    fireEvent.change(inputElement, {
      target: { value: task },
    });
    fireEvent.click(buttonElement);
  });
};

describe('Todo', () => {
  test('should render same text passed into title prop', () => {
    render(<MockTodo />);
    addTasks(['Go Grocery Shopping']);

    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  test('should render multiple items', () => {
    render(<MockTodo />);
    addTasks(['Go Grocery Shopping', 'Pet my cat', 'Wash my hands']);

    const divElements = screen.getAllByTestId('task-container');
    expect(divElements.length).toBe(3);
  });

  test('tasks should not have completed class when initally rendered', () => {
    render(<MockTodo />);
    addTasks(['Go Grocery Shopping', 'Pet my cat', 'Wash my hands']);

    const divElement = screen.getByText(/Go Grocery Shopping/i);

    expect(divElement).not.toHaveClass('todo-item-active');
  });

  test('tasks should have completed class when clicked', () => {
    render(<MockTodo />);
    addTasks(['Go Grocery Shopping', 'Pet my cat', 'Wash my hands']);

    const divElement = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElement);

    expect(divElement).toHaveClass('todo-item-active');
  });
});
