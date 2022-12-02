import QkTable, { RequestParams } from '@/components/QkTable';
import api from '@/service';
import { formatPaginationParams } from '@/util';
import { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Link } from 'react-router-dom';

const TabTable: React.FC = () => {
  const columns: ProColumns<API_ABOUT.DataReportFeilds>[] = [
    {
      title: '企业名称',
      dataIndex: 'companyName',
    }, {
      title: '项目名称',
      dataIndex: 'projectName',
    }, {
      title: '生产工艺',
      dataIndex: 'processName',
    }, {
      title: '数据',
      dataIndex: 'dataName',
    }, {
      title: '待填报',
      dataIndex: 'waitFillIn',
    }, {
      title: '操作',
      render: () => [<Link to="./detail">详情</Link>],
    },
  ];
  const fetechDataSource = async (params: RequestParams) => {
    const { pageNow, pageSize } = formatPaginationParams(params);
    const { result, pagination } = await api.getDataReportListApi({
      pageNow,
      pageSize,
      emissionCode: 2,
      ...params,
    });

    return {
      data: result,
      total: pagination.totalSize,
      success: true,
    };
  };

  return (
    <div>
      <QkTable
        columns={columns}
        request={fetechDataSource}
        key="projectCode"
      />
    </div>
  );
};

export default TabTable;
