import {Course, CourseListResponse} from '../types';
import {createXHR} from '../utils/xhr';

/**
 * Fetches student courses from the API
 * @param token Authorization token
 * @param courseLimit Maximum number of courses to fetch
 * @returns Array of courses
 * @throws Error if token is invalid or request fails
 */
export function getStudentCourses(token: string, courseLimit: number): Course[] {
  // Check if token is provided
  if (!token || token.trim() === '') {
    throw new Error("Authorization token is required");
  }

  try {
    // Create XMLHttpRequest object using the utility function
    const xhr = createXHR();

    // Configure the request - using synchronous mode (third parameter set to false)
    xhr.open('GET', `https://courseapi.ulearning.cn/courses/students?keyword=&publishStatus=1&type=1&pn=1&ps=${courseLimit}`, false);

    // Set the Authorization header
    xhr.setRequestHeader('Authorization', token);

    // Send the request
    xhr.send();

    // Parse and return the result
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText) as CourseListResponse;
      return response.courseList || [];
    } else {
      throw new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`);
    }
  } catch (error) {
    console.error('Get courses error:', error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}