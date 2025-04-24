import {getStudentCourses} from "../modules/course.ts";
import {getStudentHomework} from "../modules/homework.ts";
import {getStudentExams} from "../modules/exam.ts";
import {ParsedAssignment, parseExam, parseHomework} from "../utils/parser";

/**
 * Gets all pending assignments (homeworks and exams) for a user
 * @param token Authorization token
 * @param coursePageSize Number of courses to fetch per page
 * @returns An array of unified assignment objects
 */
export function getAllPendingAssignment(
    token: string,
    coursePageSize: number = 10
): ParsedAssignment[] {
  // Get all student courses
  const courses = getStudentCourses(token, coursePageSize);
  console.log("getAllPendingAssignment", courses);

  // Store all parsed assignments (homeworks and exams)
  const allAssignments: ParsedAssignment[] = [];

  // Loop through each course and get homeworks and exams
  for (const course of courses) {
    try {
      // Get and process homeworks
      const courseHomeworks = getStudentHomework(token, course.id);
      console.log("hw:", courseHomeworks);
      if (courseHomeworks && courseHomeworks.length > 0) {
        // Filter homeworks by states 0, 2, 5 and parse them
        const parsedHomeworks = courseHomeworks
            .filter(hw => [0, 2, 5].includes(hw.state) &&
                (!hw.startTime || new Date(hw.startTime) <= new Date()))
            .map(hw => parseHomework(hw, course));

        if (parsedHomeworks.length > 0) {
          allAssignments.push(...parsedHomeworks);
        }
      }

      // Get and process exams
      const courseExams = getStudentExams(token, course.id);
      console.log("exams:", courseExams);
      if (courseExams && courseExams.length > 0) {
        // Filter exams with examState 2 (in progress) and parse them
        const parsedExams = courseExams
            .filter(exam => exam.examState === 2)
            .map(exam => parseExam(exam, course));

        if (parsedExams.length > 0) {
          allAssignments.push(...parsedExams);
        }
      }
    } catch (error) {
      console.error(`Error fetching assignments for course ${course.name}:`, error);
    }
  }

  return allAssignments;
}