/* eslint no-eval: 0 */

import { DataQueryRequest, DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';

export class DataSource extends DataSourceApi {
  constructor(instanceSettings: DataSourceInstanceSettings) {
    super(instanceSettings);
  }

  async query(options: DataQueryRequest): Promise<DataQueryResponse> {
    return { data: [] };
  }

  metricFindQuery(expr: string) {
    const templateSrv = getTemplateSrv();
    let result = eval(templateSrv.replace(expr));

    if (
      Array.isArray(result) &&
      result.every((item) => {
        return typeof item === 'string' || item instanceof String;
      })
    ) {
      return Promise.resolve(
        result.map((item) => {
          return { text: item };
        })
      );
    } else if (typeof result === 'string' || result instanceof String) {
      return Promise.resolve([{ text: result }]);
    }
    return Promise.resolve([]);
  }

  async testDatasource() {
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
