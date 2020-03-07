import { Injectable } from '@nestjs/common';

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

@Injectable()
export class AppService {
  async getRandom(): Promise<{ status: number; message: string }> {
    const status = [
      { status: 200, message: 'OK' },
      { status: 500, message: 'Internal Server Error' },
      { status: 503, message: 'Service Unavailable' },
      { status: 504, message: 'Gateway Timeout' },
    ];
    const random = status[Math.floor(Math.random() * status.length)];

    if (random.status === 504) {
      await sleep(2000);
    }
    return random;
  }
}
