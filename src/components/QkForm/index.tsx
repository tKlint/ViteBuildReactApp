/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ProForm, ProFormProps } from '@ant-design/pro-components';

interface IProps {
  qk?: string;
}

interface QkFormComponent<T = Record<string, any>> {
  (props: ProFormProps<T> & {
    children?: React.ReactNode | React.ReactNode[];
  } & IProps): JSX.Element;
}

const {
  Group, useForm, Item, Provider, useWatch, useFormInstance,
} = ProForm;

declare function QkProForm<T = Record<string, any>>(props: ProFormProps<T> & {
  children?: React.ReactNode | React.ReactNode[];
} & IProps): JSX.Element

const QkForm: QkFormComponent = (props) => (
  <div className="qk-conponent-form">
    <ProForm {...props} />
  </div>
);

export default Object.assign(QkForm as typeof QkProForm, {
  Group, useForm, Item, Provider, useWatch, useFormInstance,
});
