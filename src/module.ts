import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';

export const plugin = new DataSourcePlugin<DataSource>(DataSource);
