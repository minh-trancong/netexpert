// import axios from 'axios';
// import { signIn, signUp, getUsers } from './services';

// jest.mock('axios');

// describe('Auth Services', () => {
//   it('should sign in a user', async () => {
//     const mockResponse = { data: { token: 'fake-token' } };
//     (axios.post as jest.Mock).mockResolvedValue(mockResponse);

//     const result = await signIn('testuser', 'password');
//     console.log( "Sign In Result: ", result);
//     expect(result).toEqual(mockResponse.data);
//   });

//   it('should sign up a user', async () => {
//     const mockResponse = { data: { id: 1, username: 'testuser' } };
//     (axios.post as jest.Mock).mockResolvedValue(mockResponse);

//     const result = await signUp('testuser', 'test@example.com', 'password');
//     console.log( "Sign Up Result: ", result);
//     expect(result).toEqual(mockResponse.data);
//   });

//   it('should fetch users', async () => {
//     const mockResponse = { data: [{ id: 1, username: 'testuser' }] };
//     (axios.get as jest.Mock).mockResolvedValue(mockResponse);

//     const result = await getUsers();
//     console
//     expect(result).toEqual(mockResponse.data);
//   });
// });