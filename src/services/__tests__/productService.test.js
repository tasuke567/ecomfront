// src/services/__tests__/productService.test.js
import { productService } from '../productService';
import axios from 'axios';

jest.mock('axios');

describe('productService', () => {
  const mockToken = 'test-token';
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    image: 'test.jpg',
    category: 'test-category'
  };

  beforeEach(() => {
    localStorage.setItem('token', mockToken);
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    test('fetches products without parameters', async () => {
      const mockProducts = [mockProduct];
      axios.get.mockResolvedValueOnce({ data: mockProducts });

      const result = await productService.getProducts();

      expect(axios.get).toHaveBeenCalledWith('/api/products');
      expect(result).toEqual(mockProducts);
    });

    test('fetches products with search query', async () => {
      const query = 'test';
      const mockProducts = [mockProduct];
      axios.get.mockResolvedValueOnce({ data: mockProducts });

      const result = await productService.getProducts({ search: query });

      expect(axios.get).toHaveBeenCalledWith(`/api/products?search=${query}`);
      expect(result).toEqual(mockProducts);
    });

    test('fetches products with category filter', async () => {
      const category = 'electronics';
      const mockProducts = [mockProduct];
      axios.get.mockResolvedValueOnce({ data: mockProducts });

      const result = await productService.getProducts({ category });

      expect(axios.get).toHaveBeenCalledWith(`/api/products?category=${category}`);
      expect(result).toEqual(mockProducts);
    });

    test('fetches products with pagination', async () => {
      const page = 2;
      const limit = 10;
      const mockResponse = {
        data: {
          products: [mockProduct],
          total: 25,
          currentPage: page,
          totalPages: 3
        }
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await productService.getProducts({ page, limit });

      expect(axios.get).toHaveBeenCalledWith(`/api/products?page=${page}&limit=${limit}`);
      expect(result).toEqual(mockResponse.data);
    });

    test('handles error when fetching products', async () => {
      const error = new Error('Network error');
      axios.get.mockRejectedValueOnce(error);

      await expect(productService.getProducts()).rejects.toThrow('Network error');
    });
  });

  describe('getProduct', () => {
    test('fetches single product by id', async () => {
      axios.get.mockResolvedValueOnce({ data: mockProduct });

      const result = await productService.getProduct(1);

      expect(axios.get).toHaveBeenCalledWith('/api/products/1');
      expect(result).toEqual(mockProduct);
    });

    test('handles product not found', async () => {
      const error = new Error('Product not found');
      error.response = { status: 404 };
      axios.get.mockRejectedValueOnce(error);

      await expect(productService.getProduct(999)).rejects.toThrow('Product not found');
    });
  });

  describe('createProduct', () => {
    test('creates new product successfully', async () => {
      const newProduct = {
        name: 'New Product',
        price: 200,
        description: 'New Description'
      };
      axios.post.mockResolvedValueOnce({ data: { ...newProduct, id: 2 } });

      const result = await productService.createProduct(newProduct);

      expect(axios.post).toHaveBeenCalledWith('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${mockToken}` }
      });
      expect(result).toEqual({ ...newProduct, id: 2 });
    });

    test('handles validation error in product creation', async () => {
      const invalidProduct = { name: '' };
      const error = new Error('Validation error');
      error.response = { 
        status: 400,
        data: { message: 'Name is required' }
      };
      axios.post.mockRejectedValueOnce(error);

      await expect(productService.createProduct(invalidProduct))
        .rejects.toThrow('Name is required');
    });
  });

  describe('updateProduct', () => {
    test('updates existing product', async () => {
      const updateData = { price: 150 };
      const updatedProduct = { ...mockProduct, ...updateData };
      axios.patch.mockResolvedValueOnce({ data: updatedProduct });

      const result = await productService.updateProduct(1, updateData);

      expect(axios.patch).toHaveBeenCalledWith('/api/products/1', updateData, {
        headers: { Authorization: `Bearer ${mockToken}` }
      });
      expect(result).toEqual(updatedProduct);
    });

    test('handles unauthorized update attempt', async () => {
      const error = new Error('Unauthorized');
      error.response = { status: 401 };
      axios.patch.mockRejectedValueOnce(error);

      await expect(productService.updateProduct(1, { price: 150 }))
        .rejects.toThrow('Unauthorized');
    });
  });

  describe('deleteProduct', () => {
    test('deletes product successfully', async () => {
      axios.delete.mockResolvedValueOnce({ data: { message: 'Product deleted' } });

      await productService.deleteProduct(1);

      expect(axios.delete).toHaveBeenCalledWith('/api/products/1', {
        headers: { Authorization: `Bearer ${mockToken}` }
      });
    });

    test('handles product not found in deletion', async () => {
      const error = new Error('Product not found');
      error.response = { status: 404 };
      axios.delete.mockRejectedValueOnce(error);

      await expect(productService.deleteProduct(999))
        .rejects.toThrow('Product not found');
    });
  });

  describe('getCategories', () => {
    test('fetches all product categories', async () => {
      const mockCategories = ['electronics', 'clothing'];
      axios.get.mockResolvedValueOnce({ data: mockCategories });

      const result = await productService.getCategories();

      expect(axios.get).toHaveBeenCalledWith('/api/products/categories');
      expect(result).toEqual(mockCategories);
    });
  });

  describe('uploadProductImage', () => {
    test('uploads product image successfully', async () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const mockImageUrl = 'http://example.com/test.jpg';
      const formData = new FormData();
      formData.append('image', mockFile);

      axios.post.mockResolvedValueOnce({ data: { url: mockImageUrl } });

      const result = await productService.uploadProductImage(mockFile);

      expect(axios.post).toHaveBeenCalledWith('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${mockToken}`
        }
      });
      expect(result).toBe(mockImageUrl);
    });

    test('handles image upload error', async () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const error = new Error('Upload failed');
      axios.post.mockRejectedValueOnce(error);

      await expect(productService.uploadProductImage(mockFile))
        .rejects.toThrow('Upload failed');
    });
  });
});