import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount', () => {
  it('should render name if user is available', () => {
    const user: User = { id: 1, name: 'John' };
    render(<UserAccount user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toHaveTextContent(user.name);
  })

  it('should render edit button if user is admin', () => {
    const user: User = { id: 1, name: 'John', isAdmin: true };
    render(<UserAccount user={user} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  })

  it('should not render edit button if user is not admin', () => {
    const user: User = { id: 1, name: 'John', isAdmin: false };
    render(<UserAccount user={user} />); 

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  })
})