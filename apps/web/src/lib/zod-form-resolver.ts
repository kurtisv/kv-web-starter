import type { FieldError, FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

export function zodFormResolver<TFieldValues extends FieldValues>(
  schema: z.ZodType<TFieldValues>
): Resolver<TFieldValues> {
  return (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: FieldErrors<TFieldValues> = {};
    const flatErrors = errors as Record<string, FieldError>;

    result.error.issues.forEach((issue) => {
      const name = issue.path.join(".");
      if (!name || flatErrors[name]) return;
      flatErrors[name] = {
        type: issue.code,
        message: issue.message,
      };
    });

    return {
      values: {},
      errors,
    };
  };
}
