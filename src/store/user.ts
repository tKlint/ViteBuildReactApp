/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from '@/util/storage';
import api from '@/service';
import { generateMenus } from '@/routes/generator';
import { API_LOGIN } from '@/service/login';
import useAccess from '@/util/useAccess';

export type IMenus = Pick<API.RoutesResponse,
  'icon' | 'name' | 'path' | 'children' | 'meta' | 'target' | 'hideInMenu' | 'fullScreen'
>

export interface UserState {
  token: string;
  userName?: string;
  routes?: API.RoutesResponse[];
  userNo?: string;
  menus?: IMenus[];
  permissions?: React.Key[];
  avatarUrl?: string;
}

const creatInitalState = (): UserState => ({
  token: storage.get('access_token', ''),
  userNo: storage.get('user_no', ''),
  avatarUrl: storage.get('avatar_url', ''),
  userName: storage.get('user_name', ''),
  menus: storage.get('menus', undefined),
  permissions: storage.get('permissions', undefined),
  routes: storage.get('routes', undefined),
});

async function createRoutes({ token, userNo }: Pick<UserState, 'token' | 'userNo'>) {
  const routes = await api.userRoutesApi({ token, userNo });
  const menus = generateMenus(routes);
  return {
    routes,
    menus,
  };
}

async function getUserPermiss({ userNo }: Required<Pick<UserState, 'userNo'>>) {
  const permiss = await api.userPermissApi({ userNo });
  const [setAccess] = useAccess();
  setAccess(permiss);
  return permiss;
}

const cacheStore = (cacheData: Record<string, unknown>) => {
  Object.keys(cacheData).forEach((key) => storage.set(key, cacheData[key]));
};

export const fetchUser = createAsyncThunk<Pick<UserState, 'token' | 'menus' | 'routes'>, API_LOGIN.LoginData>('user/info', async (data) => {
  const response = await api.login(data);
  const {
    token, userNo, userName, avatarUrl,
  } = response;
  cacheStore({
    access_token: token,
    user_no: userNo,
    user_name: userName,
    avatar_url: avatarUrl,
  });
  const { routes, menus } = await createRoutes({ token, userNo });
  const permissions = await getUserPermiss({ userNo });
  cacheStore({
    menus,
    permissions,
    routes,
  });
  return {
    ...response,
    routes,
    menus,
    permissions,
  };
});

export const afterLogin = createAsyncThunk<Pick<UserState, 'routes' | 'menus'>, Required<Pick<UserState, 'token' | 'userNo'>>>('user/after', async (data) => {
  const { token, userNo } = data;
  const { routes, menus } = await createRoutes({ token, userNo });
  const permissions = await getUserPermiss({ userNo });
  cacheStore({
    routes, menus, permissions,
  });
  return {
    routes,
    menus,
    permissions,
  };
});

const userSlice = createSlice({
  name: 'user',
  initialState: creatInitalState(),
  reducers: {
    signOut() {
      storage.clear();
      return creatInitalState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
    builder.addCase(afterLogin.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
  },
});

export const {
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
