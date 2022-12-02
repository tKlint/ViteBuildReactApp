import routesResult from '@/routes/config';
import request from '@/util/request';

export default {
  userRoutesApi({ token, userNo }: {
    token?: string;
    userNo?: string;
  }): Promise<API.RoutesResponse[]> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (token && userNo) {
          res(routesResult);
        } else {
          rej();
        }
      }, 500);
    });
  },
  userPermissApi(data: {
    userNo: string;
  }): Promise<string[]> {
    return request('/userButton', {
      method: 'POST',
      data,
    });
  },
};
