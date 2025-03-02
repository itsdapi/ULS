import { Homework, Exam, Course } from '../types';

  /**
   * Unified type for parsed assignments
   */
  export interface ParsedAssignment {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    state: number;
    type: 'homework' | 'exam';
    url: string;
    courseName: string; // Added courseName field
  }

  /**
   * Converts Unix timestamp to ISO 8601 string
   * @param timestamp Unix timestamp in milliseconds
   * @returns ISO 8601 formatted string
   */
  function toISOString(timestamp: number): string {
    return new Date(timestamp).toISOString();
  }

  /**
   * Parses a homework object into a standardized format
   * @param homework The homework object to parse
   * @param course The associated course object
   * @returns Standardized homework representation
   */
  export function parseHomework(homework: Homework, course: Course): ParsedAssignment {
    return {
      id: homework.id,
      name: homework.homeworkTitle,
      startTime: toISOString(homework.startTime),
      endTime: toISOString(homework.endTime),
      state: homework.state,
      type: 'homework',
      url: `https://courseweb.ulearning.cn/ulearning/index.html#/course/homework?courseId=${course.id}&homeworkId=${homework.id}`,
      courseName: course.name || 'Unknown Course' // Added courseName from course object
    };
  }

  /**
   * Parses an exam object into a standardized format
   * @param exam The exam object to parse
   * @param course The associated course object
   * @returns Standardized exam representation
   */
  export function parseExam(exam: Exam, course: Course): ParsedAssignment {
    // Get the first time range or use defaults
    const timeRange = exam.examRelationTimeList && exam.examRelationTimeList.length > 0
      ? exam.examRelationTimeList[0]
      : { startTime: 0, endTime: 0 };

    return {
      id: exam.examId,
      name: exam.title,
      startTime: toISOString(timeRange.startTime),
      endTime: toISOString(timeRange.endTime),
      state: exam.examState,
      type: 'exam',
      url: `https://courseweb.ulearning.cn/ulearning/index.html#/course/exam?courseId=${course.id}&examId=${exam.examId}`,
      courseName: course.name || 'Unknown Course' // Added courseName from course object
    };
  }

  /**
   * Parses either a homework or exam item into a standardized format
   * @param item The homework or exam object to parse
   * @param course The associated course object
   * @returns Standardized assignment representation
   */
  export function parseAssignment(item: Homework | Exam, course: Course): ParsedAssignment {
    // Determine item type by checking for characteristic properties
    if ('homeworkTitle' in item) {
      return parseHomework(item as Homework, course);
    } else if ('examId' in item) {
      return parseExam(item as Exam, course);
    }

    throw new Error('Unknown assignment type');
  }