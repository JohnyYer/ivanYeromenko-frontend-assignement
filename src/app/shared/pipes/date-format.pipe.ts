import { Pipe, PipeTransform } from '@angular/core';

// Dates are allways pain in the ass, so this pipe is a quick fix to get the date in the format we want
@Pipe({
  name: 'dateFormat',
  standalone: false,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: string | Date | null | undefined,
    format: string = 'display'
  ): string {
    if (!value) {
      return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      return '';
    }

    switch (format) {
      case 'display':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }); // Dec 31, 1990

      case 'short':
        return date.toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        }); // 12/31/90

      case 'long':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }); // December 31, 1990

      case 'iso':
        return date.toISOString().split('T')[0]; // 1990-12-31

      case 'age':
        return this.calculateAge(date);

      default:
        return date.toLocaleDateString();
    }
  }

  private calculateAge(birthDate: Date): string {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} years old`;
  }
}
