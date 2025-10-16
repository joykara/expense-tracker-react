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
  { id: 'e1', amount: 45.99, category_id: 'ddb182dc-190d-4139-9b3a-f6f6c0dd8668', description: 'Lunch at cafe', date: '2025-09-28' }, // Food
  { id: 'e2', amount: 60.00, category_id: 'ce38df7f-aa73-4bea-9403-c85fcdb5cee3', description: 'Bus pass', date: '2025-09-29' }, // Transportation
  { id: 'e3', amount: 700.00, category_id: 'e3e9f6d4-f963-4747-947d-49e1e5f85734', description: 'Monthly rent', date: '2025-09-01' }, // Housing
  { id: 'e4', amount: 25.00, category_id: '0155b2f6-735f-4460-b6a0-84cbb7a6943c', description: 'Yoga class', date: '2025-09-15' }, // Health & Fitness
  { id: 'e5', amount: 15.00, category_id: 'ddb182dc-190d-4139-9b3a-f6f6c0dd8668', description: 'Dinner', date: '2025-09-26' }, // Food
  { id: 'e6', amount: 80.00, category_id: '82110ade-6e58-4d05-b754-760f9728e56e', description: 'Movie night', date: '2025-09-10' }, // Entertainment
  { id: 'e7', amount: 200.00, category_id: 'd5d16589-1584-4515-af31-e83c1696f9bb', description: 'Clothing haul', date: '2025-09-22' }, // Shopping
  { id: 'e8', amount: 150.00, category_id: 'a01dbee8-ece5-4566-9c83-08b1c8b48a52', description: 'Weekend getaway', date: '2025-09-20' }, // Dining Out
]