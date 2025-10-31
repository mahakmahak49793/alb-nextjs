declare module 'react-csv' {
  import { Component } from 'react';

  export interface CSVLinkProps {
    data: any[] | string;
    filename?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export class CSVLink extends Component<CSVLinkProps> {}
}