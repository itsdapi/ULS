export interface HomeworkListResponse {
  pn: number;
  ps: number;
  total: number;
  homeworkList: Homework[];
}

export interface Homework {
  id: number;
  type: number;
  homeworkTitle: string;
  startTime: number;
  endTime: number;
  // 0.未提交 1.未互评 2.互评中 3.待批阅 4.已批阅 5.需重写 6.申诉中 7.申诉成功 8.申诉失败 9逾期未交,
  state: number;
  timeStatus: string;
  status: number;
  teacherId: number;
  publisher: string;
  showLevel: number;
  personStatus: number;
}

export interface CourseListResponse {
  ps: number;
  pn: number;
  total: number;
  courseList: Course[];
}

export interface Course {
  id: number;
  learnProgress: number;
  creatorOrgName: string;
  classUserId: number;
  publishStatus: number;
  className: string;
  courseCode: string;
  type: number;
  creatorOrgId: number;
  teacherName: string;
  totalDuration: number;
  cover: string;
  classId: number;
  name: string;
  status: number;
}

export interface User {
  userId: number;
  loginName: string;
  name: string;
  orgId: number;
  roleId: number;
  authorization: string;
}

export interface LoginErrorResponse {
  code: number;
  message: string;
}

export interface ExamListResponse {
  pn: number;
  ps: number;
  total: number;
  examList: Exam[];
}

export interface Exam {
  examId: number;
  answerTimes: number;
  title: string;
  subjective: null;
  objective: null;
  examTime: number;
  limitTimes: number;
  isLimitTimes: string;
  lateTime: number;
  creatorName: string;
  isLate: string;
  // 1-未开始 2-进行中 3-已结束
  examState: number;
  examType: number;
  isInExam: number;
  isTooLate: null;
  notEnoughTime: null;
  showExamRecord: number;
  showExamRecodAfterDate: number;
  examFinish: string;
  allExamBatchEnd: number;
  examRelationTimeList: ExamRelationTime[];
}

export interface ExamRelationTime {
  endTime: number;
  startTime: number;
  examRoomName: null;
  seatNo: null;
}