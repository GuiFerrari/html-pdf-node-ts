/// <reference types="node" />
import { PDFOptions } from 'puppeteer';
declare type CallBackType = (pdf: any) => void;
interface OptionsProps {
    args?: string[];
}
declare type PDFProps = OptionsProps & PDFOptions;
interface FileWithUrl {
    url: string;
    content?: never;
}
interface FileWithContent {
    url?: never;
    content: string;
}
declare type FileType = FileWithUrl | FileWithContent;
export declare function generatePdf(file: FileType, options?: PDFProps, callback?: CallBackType): Promise<Buffer>;
export {};
//# sourceMappingURL=index.d.ts.map