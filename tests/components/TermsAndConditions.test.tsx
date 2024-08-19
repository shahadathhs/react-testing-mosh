import { render, screen } from '@testing-library/react';
import TermsAndConditions
 from '../../src/components/TermsAndConditions';
import userEvent from '@testing-library/user-event';

describe('TermsAndConditions', () => {
  const user = userEvent.setup();
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button'),
      heading: screen.getByRole('heading')
    };
  };

  it('should render with initial state and text', () => {
    const { checkbox, button, heading } = renderComponent();

    expect(heading).toHaveTextContent('Terms & Conditions');
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it('should enable button when checkbox is checked', async() => {
    const { checkbox, button } = renderComponent();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  })
})