// src/utils/__tests__/validation.test.js
import { validateForm } from '../validation';

describe('Form Validation', () => {
  describe('Email Validation', () => {
    test('validates required email', () => {
      expect(validateForm.email('')).toBe('Email is required');
    });

    test('validates email format', () => {
      const invalidEmails = [
        'notanemail',
        '@nodomain.com',
        'missing@domain',
        'spaces in@email.com'
      ];

      invalidEmails.forEach(email => {
        expect(validateForm.email(email)).toBe('Invalid email format');
      });
    });

    test('accepts valid email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+label@domain.com'
      ];

      validEmails.forEach(email => {
        expect(validateForm.email(email)).toBe('');
      });
    });
  });

  describe('Password Validation', () => {
    test('validates required password', () => {
      expect(validateForm.password('')).toBe('Password is required');
    });

    test('validates password length', () => {
      expect(validateForm.password('12345')).toBe('Password must be at least 6 characters');
    });

    test('validates password number requirement', () => {
      expect(validateForm.password('abcdefgh')).toBe('Password must contain at least one number');
    });

    test('validates password uppercase requirement', () => {
      expect(validateForm.password('abcdef123')).toBe('Password must contain at least one uppercase letter');
    });

    test('accepts valid passwords', () => {
      const validPasswords = [
        'Password123',
        'SecurePass1',
        'StrongP@ssw0rd'
      ];

      validPasswords.forEach(password => {
        expect(validateForm.password(password)).toBe('');
      });
    });
  });

  describe('Name Validation', () => {
    test('validates required name', () => {
      expect(validateForm.name('')).toBe('Name is required');
    });

    test('validates name length', () => {
      expect(validateForm.name('a')).toBe('Name must be at least 2 characters');
    });

    test('accepts valid names', () => {
      const validNames = [
        'John',
        'Jane Doe',
        'J. Smith'
      ];

      validNames.forEach(name => {
        expect(validateForm.name(name)).toBe('');
      });
    });

    test('handles whitespace in names', () => {
      expect(validateForm.name('   ')).toBe('Name is required');
      expect(validateForm.name('  J  ')).toBe('Name must be at least 2 characters');
      expect(validateForm.name('  John  ')).toBe('');
    });
  });

  describe('Multiple Field Validation', () => {
    test('validates registration form fields', () => {
      const formData = {
        name: '',
        email: 'invalid-email',
        password: 'weak'
      };

      expect(validateForm.name(formData.name)).toBe('Name is required');
      expect(validateForm.email(formData.email)).toBe('Invalid email format');
      expect(validateForm.password(formData.password)).toBe('Password must be at least 6 characters');
    });

    test('accepts valid form data', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      };

      expect(validateForm.name(formData.name)).toBe('');
      expect(validateForm.email(formData.email)).toBe('');
      expect(validateForm.password(formData.password)).toBe('');
    });
  });
});