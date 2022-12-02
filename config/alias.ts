import path from 'path';

export default [
  { find: /^~/, replacement: '' },
  {
    find: '@',
    replacement: path.resolve(__dirname, '/src'),
  },
  {
    find: '@type',
    replacement: path.resolve(__dirname, '/src/types'),
  },
];
