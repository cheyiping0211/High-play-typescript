import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
@Injectable()
export class GenericService {
  async getCityData(res) {
    const file = join(__dirname, './city.json'); //文件路径，__dirname为当前运行js文件的目录
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        res.json({
          status: 400,
          errMsg: '文件读取失败',
        });
      } else {
        res.json({
          status: 200,
          data: JSON.parse(data),
          message: '读取文件成功',
        });
      }
    });
  }
}
