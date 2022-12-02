import request from '@/util/request';

export default {
  getDataReportListApi(
    data: API_ABOUT.GetDataReportListApi['params'],
  ) {
    return request<API_ABOUT.GetDataReportListApi['data']>('/collection/dataOffer/getDataOfferList', {
      data,
      method: 'POST',
    });
  },
};
