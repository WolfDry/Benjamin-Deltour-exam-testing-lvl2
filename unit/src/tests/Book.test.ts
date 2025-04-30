import { describe, it, expect, beforeEach } from 'vitest';
import { Book } from '../Book' ;

describe('Book class', () => {
  let book: Book;

  beforeEach(() => {
    book = new Book('1', 'Test Title', 'Test Author');
  });

  describe('constructor', () => {
    it('should initialize properties correctly', () => {
      expect(book.id).toBe('1');
      expect(book.title).toBe('Test Title');
      expect(book.author).toBe('Test Author');
      expect(book.status).toBe('available');
      expect(book.borrowedBy).toBeUndefined();
      expect(book.borrowDate).toBeUndefined();
      expect(book.dueDate).toBeUndefined();
    });
  });

  describe('isAvailable', () => {
    it('should return true when status is "available"', () => {
      book.status = 'available';
      expect(book.isAvailable()).toBe(true);
    });

    it('should return false when status is not "available"', () => {
      book.status = 'borrowed';
      expect(book.isAvailable()).toBe(false);
    });
  });

  describe('isBorrowed', () => {
    it('should return true when status is "borrowed"', () => {
      book.status = 'borrowed';
      expect(book.isBorrowed()).toBe(true);
    });

    it('should return false when status is not "borrowed"', () => {
      book.status = 'available';
      expect(book.isBorrowed()).toBe(false);
    });
  });

  describe('isInMaintenance', () => {
    it('should return true when status is "maintenance"', () => {
      book.status = 'maintenance';
      expect(book.isInMaintenance()).toBe(true);
    });

    it('should return false when status is not "maintenance"', () => {
      book.status = 'borrowed';
      expect(book.isInMaintenance()).toBe(false);
    });
  });

  describe('edge cases and robustness', () => {
    it('should handle unexpected status values gracefully', () => {
      book.status = 'lost';
      expect(book.isAvailable()).toBe(false);
      expect(book.isBorrowed()).toBe(false);
      expect(book.isInMaintenance()).toBe(false);
    });

    it('should support undefined borrowedBy, borrowDate and dueDate by default', () => {
      expect(book.borrowedBy).toBeUndefined();
      expect(book.borrowDate).toBeUndefined();
      expect(book.dueDate).toBeUndefined();
    });
  });
});
