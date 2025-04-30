import { describe, it, expect, vi, beforeEach } from 'vitest';
import { User } from '../User';

const mockDate = new Date(2025, 3, 30); 
vi.setSystemTime(mockDate);

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('1', 'John Doe', 'john@example.com');
  });

  describe('canBorrow', () => {
    it('should return true if the user has not exceeded the loan limit for their category', () => {
      user.currentLoans = ['book1', 'book2'];
      expect(user.canBorrow()).toBe(true);
    });

    it('should return false if the user has exceeded the loan limit for their category (standard)', () => {
      user.currentLoans = ['book1', 'book2', 'book3'];
      expect(user.canBorrow()).toBe(false);
    });

    it('should return true for premium users with fewer loans than the limit', () => {
      user.category = 'premium';
      user.currentLoans = ['book1', 'book2', 'book3'];
      expect(user.canBorrow()).toBe(true);
    });

    it('should return false for premium users with too many loans', () => {
      user.category = 'premium';
      user.currentLoans = ['book1', 'book2', 'book3', 'book4', 'book5'];
      expect(user.canBorrow()).toBe(false);
    });

    it('should return true for employee users with fewer loans than the limit', () => {
      user.category = 'employee';
      user.currentLoans = ['book1', 'book2', 'book3', 'book4', 'book5', 'book6', 'book7'];
      expect(user.canBorrow()).toBe(true);
    });
  });

  describe('addLoan', () => {
    it('should add a book to the current loans if it is not already in the list', () => {
      user.addLoan('book1');
      expect(user.currentLoans).toEqual(['book1']);
    });

    it('should not add a book if it is already in the current loans', () => {
      user.addLoan('book1');
      user.addLoan('book1');
      expect(user.currentLoans).toEqual(['book1']);
    });
  });

  describe('removeLoan', () => {
    it('should remove a loaned book from the current loans', () => {
      user.addLoan('book1');
      user.removeLoan('book1');
      expect(user.currentLoans).toEqual([]);
    });

    it('should do nothing if the book is not in the current loans', () => {
      user.addLoan('book1');
      user.removeLoan('book2');
      expect(user.currentLoans).toEqual(['book1']);
    });
  });
});
