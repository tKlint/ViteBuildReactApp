declare namespace API_ABOUT {
  interface DataReportFeilds {
    emissionCode?: number;
    companyName?: string;
    dataName?: string;
    orgCode?: string;
    processCode?: number;
    processCodeIrec?: string;
    processName?: string;
    projectCode?: string;
    projectName?: string;
    waitFillIn?: string;
  }
  type GetDataReportListApi = {
    params: {
      emissionCode?: number;
    } & API.PaginationParams;
    data: API.PaginationResponseData<DataReportFeilds>
  }
}
