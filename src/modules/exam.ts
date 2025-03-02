import { Exam, ExamListResponse } from '../types';
import { createXHR } from '../utils/xhr';

/**
 * Fetches student exams for a specific course
 * @param token Authorization token
 * @param ocId Online course ID
 * @param pageNumber Page number for pagination (default: 1)
 * @param pageSize Maximum number of items per page (default: 20)
 * @param language Language preference (default: 'zh')
 * @returns Array of exam assignments
 * @throws Error if token is invalid or request fails
 */
export function getStudentExams(
    token: string,
    ocId: number,
    pageNumber: number = 1,
    pageSize: number = 20,
    language: string = 'zh'
): Exam[] {
  // Check if token is provided
  if (!token || token.trim() === '') {
    throw new Error("Authorization token is required");
  }

  // Check if course ID is valid
  if (!ocId || ocId <= 0) {
    throw new Error("Valid course ID is required");
  }

  try {
    // Create XMLHttpRequest object
    const xhr = createXHR();

    // Configure the request - using synchronous mode
    xhr.open('GET',
        `https://utestapi.ulearning.cn/exams/student?ocId=${ocId}&pn=${pageNumber}&ps=${pageSize}&lang=${language}`,
        false
    );

    // Set the Authorization header
    xhr.setRequestHeader('Authorization', token);

    // Send the request
    xhr.send();

    // Parse and return the result
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText) as ExamListResponse;
      return response.examList || [];
    } else {
      throw new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`);
    }
  } catch (error) {
    console.error('Get exams error:', error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}