import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mockCategories = [
  { id: '1', name: 'Food & Dining', color: '#FF6384' },
  { id: '2', name: 'Transportation', color: '#36A2EB' },
  { id: '3', name: 'Housing & Utilities', color: '#FFCE56' },
  { id: '4', name: 'Health & Fitness', color: '#4BC0C0' },
  { id: '5', name: 'Entertainment', color: '#9966FF' },
  { id: '6', name: 'Shopping', color: '#FF9F40' },
  { id: '7', name: 'Travel', color: '#8AC926' },
]

export const mockExpenses = [
  { id: 'e1', amount: 45.99, category_id: '1', description: 'Lunch at cafe', date: '2025-09-28' },
  { id: 'e2', amount: 60.00, category_id: '2', description: 'Bus pass', date: '2025-09-29' },
  { id: 'e3', amount: 700.00, category_id: '3', description: 'Monthly rent', date: '2025-09-01' },
  { id: 'e4', amount: 25.00, category_id: '4', description: 'Yoga class', date: '2025-09-15' },
  { id: 'e5', amount: 15.00, category_id: '1', description: 'Dinner', date: '2025-09-26' },
  { id: 'e6', amount: 80.00, category_id: '5', description: 'Movie night', date: '2025-09-10' },
  { id: 'e7', amount: 200.00, category_id: '6', description: 'Clothing haul', date: '2025-09-22' },
  { id: 'e8', amount: 150.00, category_id: '7', description: 'Weekend getaway', date: '2025-09-20' },
]