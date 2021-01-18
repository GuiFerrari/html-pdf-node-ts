import puppeteer, { PDFOptions } from 'puppeteer';
import { Promise as PromiseBluebird } from 'bluebird';
import hb from 'handlebars';

type CallBackType = (pdf: any) => void;

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

type FileType = FileWithUrl | FileWithContent;

export async function generatePdf(file: FileType, options?: OptionsProps, callback?: CallBackType) {
  let args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ];

  if(options?.args) {
    args = options.args;
    delete options.args;
  }

  const browser = await puppeteer.launch({
    args: args
  });

  const page = await browser.newPage();

  if(file.content) {
    const template = hb.compile(file.content, { strict: true });
    const result = template(file.content);
    const html = result;

    await page.setContent(html);
  } else {
    await page.goto(file.url as string, {
      waitUntil: 'networkidle0',
    });
  }

  if(file.content) {}

  return PromiseBluebird.props(page.pdf(options))
    .then(async function(data) {
       await browser.close();

       return Buffer.from(Object.values(data));
    }).asCallback(callback);
}

async function generatePdfs(files: FileType[], options?: OptionsProps, callback?: CallBackType) {
  let args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ];

  if(options?.args) {
    args = options.args;
    delete options.args;
  }

  const browser = await puppeteer.launch({
    args: args
  });

  let pdfs = [];

  const page = await browser.newPage();

  for(let file of files) {
    if(file.content) {
      const template = hb.compile(file.content, { strict: true });
      const result = template(file.content);
      const html = result;

      await page.setContent(html);
    } else {
      await page.goto(file.url as string, {
        waitUntil: 'networkidle0',
      });
    }
    let pdfObj = JSON.parse(JSON.stringify(file));
    delete pdfObj['content'];
    pdfObj['buffer'] = Buffer.from(Object.values(await page.pdf(options)));
    pdfs.push(pdfObj);
  }

  return PromiseBluebird.resolve(pdfs)
    .then(async function(data) {
       await browser.close();
       return data;
    }).asCallback(callback);
}

module.exports = {
  generatePdf: generatePdf,
  generatePdfs: generatePdfs
}
