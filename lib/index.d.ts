/// <reference types="node" />
import { PDFOptions } from 'puppeteer';
declare type CallBackType = (pdf: any) => void;
interface OptionsProps extends PDFOptions {
    args?: string[];
}
interface FileWithUrl {
    url: string;
    content?: never;
}
interface FileWithContent {
    url?: never;
    content: string;
}
declare type FileType = FileWithUrl | FileWithContent;
export declare function generatePdf(file: FileType, options?: OptionsProps, callback?: CallBackType): Promise<Buffer>;
export declare function generatePdfs(files: FileType[], options?: OptionsProps, callback?: CallBackType): Promise<any[]>;
export {};
//# sourceMappingURL=index.d.ts.map