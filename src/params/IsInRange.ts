import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
export function IsInRange(
  property: { min: number; max: number },
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsInRange',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }
          const [props] = args.constraints;
          return props.min <= Number(value) && Number(value) <= props.max;
        },
      },
    });
  };
}
