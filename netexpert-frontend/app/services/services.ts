import axios from 'axios';

const API_URL = 'https://netexpert-server.onrender.com'; // Thay đổi URL này thành URL của backend của bạn

// Hàm để lấy token từ localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

//#region  Auth Services
// Đăng nhập
export const signIn = async (username: string, password: string) => {
  try {
    console.log('Signing In:', username, password);
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    console.log('Sign In Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Đăng ký
export const signUp = async (username: string, email: string, password : string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getUser = async (username : string) => {
    try{
        const response = await axios.get(`${API_URL}/users/${username}`);
        return response.data;
    }
    catch(error){
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Lấy danh sách người dùng
export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
//#region Chat Services

// Lấy các cuộc trò chuyện của người dùng
export const getUserConversations = async () => {
  try {
    const token = getToken();
    const user_id = localStorage.getItem('user_id');
    const response = await axios.get(`${API_URL}/chat/conversation/user/${user_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    throw error;
  }
};

// Lấy các cuộc trò chuyện của phiên làm việc
export const getSessionConversations = async (session_id: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/chat/conversation/session/${session_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching session conversations:', error);
    throw error;
  }
};

// Lấy lịch sử chat
export const getChatHistory = async (conversation_id: string, user_id: string, session_id: string) => {
  try {
    const token = getToken();
    const params = { conversation_id, user_id, session_id };
    const response = await axios.get(`${API_URL}/chat/history`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

// Bắt đầu cuộc trò chuyện mới
export const startNewChat = async (message: string) => {
  try {
    const token = getToken();
    const user_id = localStorage.getItem('user_id');

//Tạo session id bằng cách nào đó và lưu vào localStorage
    const session_id = ''; // Thay đổi giá trị này thành session_id thực tế
    localStorage.setItem('session_id', session_id);

    const response = await axios.post(`${API_URL}/chat/newChat`, { message, user_id, session_id }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error starting new chat:', error);
    throw error;
  }
};

// Nhận phản hồi từ AI
export const getResponse = async (message: string) => {
  try {
    const token = getToken();
    const user_id = localStorage.getItem('user_id') || '';
    const conversation_id = localStorage.getItem('conversation_id') || '';
    const session_id = localStorage.getItem('session_id') || '';

    const response = await axios.post(`${API_URL}/chat/question`, { conversation_id, message, user_id, session_id }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting response:', error);
    throw error;
  }
};
