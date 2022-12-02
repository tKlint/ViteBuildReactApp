/* eslint-disable react/jsx-props-no-spreading */
import { ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';

interface IProps<T, K, H> extends ProTableProps<T, K, H> {
  // custom props
}
interface QkTableType {
  <DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = 'text'>(props: IProps<DataType, Params, ValueType>): JSX.Element;
}

const QkTable: QkTableType = (props) => (
  <div className="qk-component-table">
    <ProTable {...props} />
  </div>
);

export type PaginationParams = {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
}

export type RequestParams<T = Record<string, any>> = T & PaginationParams;

export default QkTable;
