import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoanService } from '../LoanService';
import { Book } from '../Book';
import { User } from '../User';

describe('LoanService', () => {
  let service: LoanService;
  let book: Book;
  let user: User;
  let borrowDate: Date;

  beforeEach(() => {
    service = new LoanService();
    book = new Book('book-1', '1984', 'Orwell');
    user = new User('user-1', 'Alice', 'alice@mail.com', 'standard');
    borrowDate = new Date('2024-01-01');

    service.addBook(book);
    service.addUser(user);
  });

  describe('addBook and getBook', () => {
    it('should add and retrieve a book', () => {
      const retrieved = service.getBook('book-1');
      expect(retrieved).toBeDefined();
      expect(retrieved?.title).toBe('1984');
    });

    it('should return undefined for non-existing book', () => {
      expect(service.getBook('unknown')).toBeUndefined();
    });
  });

  describe('addUser and getUser', () => {
    it('should add and retrieve a user', () => {
      const retrieved = service.getUser('user-1');
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe('Alice');
    });

    it('should return undefined for non-existing user', () => {
      expect(service.getUser('unknown')).toBeUndefined();
    });
  });

  describe('borrowBook', () => {
    it('should allow borrowing if book is available and user can borrow', () => {
      const result = service.borrowBook('book-1', 'user-1', borrowDate);
      const borrowedBook = service.getBook('book-1');

      expect(result).toBe(true);
      expect(borrowedBook?.isBorrowed()).toBe(true);
      expect(borrowedBook?.borrowedBy).toBe('user-1');
      expect(user.currentLoans).toContain('book-1');
    });

    it('should not allow borrowing if book does not exist', () => {
      const result = service.borrowBook('invalid', 'user-1');
      expect(result).toBe(false);
    });

    it('should not allow borrowing if user does not exist', () => {
      const result = service.borrowBook('book-1', 'invalid');
      expect(result).toBe(false);
    });

    it('should not allow borrowing if book is already borrowed', () => {
      service.borrowBook('book-1', 'user-1');
      const result = service.borrowBook('book-1', 'user-1');
      expect(result).toBe(false);
    });

    it('should not allow borrowing if user has reached loan limit', () => {
      vi.spyOn(user, 'canBorrow').mockReturnValue(false);
      const result = service.borrowBook('book-1', 'user-1');
      expect(result).toBe(false);
    });
  });

  describe('returnBook', () => {
    it('should return book and calculate 0 penalty if on time', () => {
      service.borrowBook('book-1', 'user-1', borrowDate);
      const returnDate = new Date('2024-01-10');
      const penalty = service.returnBook('book-1', returnDate);

      expect(penalty).toBe(0);
      const returnedBook = service.getBook('book-1');
      expect(returnedBook?.isAvailable()).toBe(true);
      expect(user.currentLoans).not.toContain('book-1');
    });

    it('should return correct penalty for late return', () => {
      service.borrowBook('book-1', 'user-1', borrowDate);
      const returnDate = new Date('2024-02-01');
      const penalty = service.returnBook('book-1', returnDate);

      expect(penalty).toBe(8.5);
    });

    it('should return -1 if book does not exist', () => {
      const penalty = service.returnBook('invalid');
      expect(penalty).toBe(-1);
    });

    it('should return -1 if book is not borrowed', () => {
      const penalty = service.returnBook('book-1');
      expect(penalty).toBe(-1);
    });

    it('should return -1 if user is not found', () => {
      service.borrowBook('book-1', 'user-1', borrowDate);
      service['users'].delete('user-1');
      const penalty = service.returnBook('book-1');
      expect(penalty).toBe(-1);
    });
  });

  describe('calculateDueDate', () => {
    it('should calculate correct due date for each user type', () => {
      const date = new Date('2024-01-01');

      const standard = service.calculateDueDate(date, 'standard');
      expect(standard.toDateString()).toBe(new Date('2024-01-15').toDateString());

      const premium = service.calculateDueDate(date, 'premium');
      expect(premium.toDateString()).toBe(new Date('2024-01-31').toDateString());

      const employee = service.calculateDueDate(date, 'employee');
      expect(employee.toDateString()).toBe(new Date('2024-03-01').toDateString());
    });
  });

  describe('getBorrowedBooks and getAvailableBooks', () => {
    it('should return borrowed books', () => {
      service.borrowBook('book-1', 'user-1');
      const borrowed = service.getBorrowedBooks();
      expect(borrowed.length).toBe(1);
      expect(borrowed[0].id).toBe('book-1');
    });

    it('should return available books', () => {
      const available = service.getAvailableBooks();
      expect(available.length).toBe(1);
    });
  });

  describe('getUserLoans', () => {
    it('should return books borrowed by a specific user', () => {
      service.borrowBook('book-1', 'user-1');
      const loans = service.getUserLoans('user-1');
      expect(loans.length).toBe(1);
      expect(loans[0].id).toBe('book-1');
    });

    it('should return empty array if no loans', () => {
      const loans = service.getUserLoans('user-1');
      expect(loans).toEqual([]);
    });
  });

  describe('getOverdueBooks', () => {
    it('should return overdue books', () => {
      service.borrowBook('book-1', 'user-1', new Date('2024-01-01'));
      const now = new Date('2024-02-01');
      const overdue = service.getOverdueBooks(now);
      expect(overdue.length).toBe(1);
    });

    it('should return empty array if no overdue books', () => {
      service.borrowBook('book-1', 'user-1', new Date('2024-01-01'));
      const now = new Date('2024-01-05');
      const overdue = service.getOverdueBooks(now);
      expect(overdue).toEqual([]);
    });
  });
});
