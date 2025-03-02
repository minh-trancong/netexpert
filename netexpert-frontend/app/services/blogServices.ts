import axios from 'axios';

const API_URL = 'https://netexpert-server.onrender.com'; // Thay đổi URL này thành URL của backend của bạn

// Tạo blog mới
export const createBlog = async (blog : {
    title: string;
    content: string;
    category: string;
    thumbnail: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, blog);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Lấy tất cả blogs
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Lấy blog theo ID
export const getBlogById = async (id:number) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
};

// Cập nhật blog
export const updateBlog = async (id : number, blog : {
    title: string;
    content: string;
    category: string;
    thumbnail: string;
}) => {
  try {
    const response = await axios.put(`${API_URL}/blogs/${id}`, blog);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

// Xóa blog
export const deleteBlog = async (id : number) => {
  try {
    const response = await axios.delete(`${API_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// Lấy blogs theo category
export const getBlogsByCategory = async (category : string) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    throw error;
  }
};