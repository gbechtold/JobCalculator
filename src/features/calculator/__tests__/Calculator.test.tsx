import { render, screen } from '@testing-library/react';
import { Calculator } from '../ui/Calculator';

describe('Calculator', () => {
  it('renders without crashing', () => {
    render(<Calculator />);
    expect(screen.getByText('Stellenreichweiten-Kalkulator')).toBeInTheDocument();
  });
});
