import { IsInRange } from './IsInRange';

export class GetRandomParams {
  @IsInRange(
    { min: 0, max: 100 },
    {
      message: 'errorRate must be in the range 0 to 100.',
    },
  )
  errorRate?: number;
}
