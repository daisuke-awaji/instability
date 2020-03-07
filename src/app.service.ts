import { Injectable } from '@nestjs/common';
import { GetRandomParams } from './params/GetRandomParams';

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

@Injectable()
export class AppService {
  async getRandomResponse(
    params: GetRandomParams,
  ): Promise<{ status: number; message: string }> {
    const status = this.constructStatusListForErrorRate(params);
    const random = status[Math.floor(Math.random() * status.length)];
    if (random.status === 504) {
      await sleep(1000);
    }
    return random;
  }

  private constructStatusListForErrorRate(params: GetRandomParams) {
    const status = {
      success: [{ status: 200, message: 'OK' }],
      error: [
        { status: 500, message: 'Internal Server Error' },
        { status: 503, message: 'Service Unavailable' },
        { status: 504, message: 'Gateway Timeout' },
      ],
    };
    if (params.errorRate) {
      const rate = params.errorRate / 100.0;
      if (Math.random() <= rate) {
        return status.error;
      }
      return status.success;
    } else {
      return [...status.success, ...status.error];
    }
  }
}
