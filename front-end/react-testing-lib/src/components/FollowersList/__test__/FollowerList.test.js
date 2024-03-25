import { render, screen } from '@testing-library/react';
import FollowerList from '../FollowersList';
import { BrowserRouter } from 'react-router-dom';

const MockFollowerList = () => {
  return (
    <BrowserRouter>
      <FollowerList />
    </BrowserRouter>
  );
};
describe('FollowerList', () => {
  beforeEach(() => {
    console.log("Running before each test")
  })

  test('should render follower item', async () => {
    render(<MockFollowerList />);
    const followerDivElement = await screen.findByTestId('follower-item-0');
    expect(followerDivElement).toBeInTheDocument();
  });

  //test('should render follower items', async () => {
  //render(<MockFollowerList />);
  //const followerDivElements = await screen.findAllByTestId(/follower-item/);
  //expect(followerDivElements.length).toBe(5);
  //});
});
