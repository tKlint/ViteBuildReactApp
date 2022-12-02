# Getting Start🌟

> 此项目作为祺鲲FE团队基建模版, 能够快速搭建新的产品线

## 项目依赖

![react](https://img.shields.io/badge/react%20-v18.2.0-blue) ![react-router-dom](https://img.shields.io/badge/redux-v6-blue)
![react-router-dom](https://img.shields.io/badge/react--router--dom-v6-blue)
![antd](https://img.shields.io/badge/antd%20-v4.24.1-blue) ![less](https://img.shields.io/badge/less%20-v4.1.3-blue) ![axios](https://img.shields.io/badge/axios%20-v1.1.3-blue)

![vite](https://img.shields.io/badge/vite%20-v3.2.3-grren)
![build](https://img.shields.io/badge/pnpm%20-v7.13.4-grren)
![build](https://img.shields.io/badge/node%20-v16.13.1-grren)

---
## 代码规范Eslint

使用[airbnb](https://github.com/airbnb/javascript)配置模版作为代码规范标准
> A mostly reasonable approach to JavaScript
> This guide is available in other languages too. See Translation

### 组件规范
不允许使用匿名组件
```tsx
export default function () {
  return (
    // code
  )
}
// 或者
export default () => {
  return (
    // code
  )
}
```
你可以使用**函数声明式**, **函数表达式**, **箭头函数**来声明组件

<div style="background: #af71ff; padding: 10px; border-radius: 8px">
在项目编译阶段, 会进行代码格式校验, 如果你的代码为能通过`Eslint`检测, 那么你会在浏览器看到这些错误内容, 他们阻断你的编程, 所以请及时修改不规范的代码
</div>

---
## 环境变量
你可以在 `.env.development`和`.env.production`中配置系统变量
比如: 请求地址, 网站标题, 网站icon, 网站logo等
> 变量以`QK`作为前缀, 否则不能正常被识⚠️
> 在项目中通过 `import.mate.env` 来获取
---
## 网络请求
> 使用`axios`作为网络请求库
已经封装了完整的请求功能`request`

request最多可接收三个参数 `url, options, isDirectly = true`
如果你想获取完整的响应内容, 可以讲第三个参数改为false
> request已经有完整的Ts类型注解, 根据你不同的传参, 会自动推断出类型

```ts
import request from '@/util/request';
  const reqData = {
    userName: 'name',
    password: 'abc'
  }
  type LoginRespont = {
    token: string; 
  }
  const result1 = await request<LoginRespont>('/login', {
    method: 'POST',
    data: {
      userName: 'name',
      password: 'abc'
    }
  });
  result1; // { token: 'xxx' }

  const result2 = await request<LoginRespont>('/login', {
    method: 'POST',
    data: {
      userName: 'name',
      password: 'abc'
    }
  }, false);
  result1; // { code: 200, data: { token: 'xxx' }, message: 'ok' }
```
