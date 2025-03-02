import {login} from "./modules/login";
import {EMAIL, PASSWORD} from "./config";
import {getAllPendingAssignment} from "./features/get-all-pending-assignment.ts";

const message: {
  title: string,
  body: any[]
  error: string,
} = {title: '', body: [], error: ''};

try {
  // Login to get token and user info
  const loginResponse = login(EMAIL, PASSWORD);

  console.log("loginResponse", loginResponse);

  // Get all pending homeworks, passing token and username
  const result = getAllPendingAssignment(loginResponse.token, 5);

  // Set the message title with count
  message.title = `你好👋 ${loginResponse.user.name}, 你还有 ${result.length} 项作业/考试未完成`;

  // Set the message body with all homeworks
  message.body = result;
} catch (e) {
  message.title = "发生了一些错误😨";
  message.error = e instanceof Error ? e.message : '未知错误🤔';
}

// Output the result
if (typeof window !== 'undefined') {
  document.body.textContent = JSON.stringify(message);
} else {
  console.log(message);
}