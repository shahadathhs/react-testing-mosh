import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

describe('ProductImageGallery', () => {
  it('should render null when imageUrls array is empty', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    
    expect(container).toBeEmptyDOMElement();
  })

  it('should render a list of images when imageUrls array is not empty', () => {
    const imageUrls: string[] = ['url1', 'url2'];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(imageUrls.length);
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', imageUrls[index]);
    })
  })
})