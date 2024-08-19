import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const limit = 255;

  const text = 'a'.repeat(limit);
  const longText = 'a'.repeat(limit + 20);
  const truncateText = longText.substring(0, limit) + '...';

  const user = userEvent.setup();

  it(`should render the full text if less than ${limit} characters`, () => {
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it(`should truncate the text if more than ${limit} characters`, () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncateText)).toBeInTheDocument();

    const showMoreButton = screen.getByRole('button');
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });

  it('should expand text when show more button is clicked', async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);

    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text when show less button is clicked', async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole('button', { name: /more/i });
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncateText)).toBeInTheDocument();
    expect(showMoreButton).toBeInTheDocument();
  });
})