import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilityService {
  /**
   * Format date for display in UI
   */
  formatForDisplay(date: string | Date | null | undefined): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /**
   * Format date for form input (YYYY-MM-DD)
   */
  formatForInput(date: string | Date | null | undefined): string {
    if (!date) return '';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toISOString().split('T')[0];
  }

  /**
   * Calculate age from birth date
   */
  calculateAge(birthDate: string | Date | null | undefined): number {
    if (!birthDate) return 0;

    const birth =
      typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    if (isNaN(birth.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  /**
   * Check if date is valid
   */
  isValidDate(date: string | Date | null | undefined): boolean {
    if (!date) return false;

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  }

  /**
   * Get today's date in YYYY-MM-DD format
   */
  getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get date constraints for form validation
   */
  getDateConstraints(): { maxDate: string; minDate: string } {
    const today = new Date();
    const minDate = new Date(1900, 0, 1);

    return {
      maxDate: today.toISOString().split('T')[0],
      minDate: minDate.toISOString().split('T')[0],
    };
  }
}
