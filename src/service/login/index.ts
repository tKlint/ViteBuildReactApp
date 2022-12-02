import request from '@/util/request';

export declare namespace API_LOGIN {
  type LoginResult = {
    token: string;
    userNo: string;
    userFullNameCn: string;
  }
  type LoginData = {
    userName: string;
    userPassword: string;
  }
}
const loginApi = {
  async login(data: API_LOGIN.LoginData) {
    const result = await request<API_LOGIN.LoginResult>('/signin', { method: 'POST', data });
    return {
      ...result,
      userName: result.userFullNameCn,
      avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    };
  },
};
export default loginApi;
