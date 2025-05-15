import { AxiosError } from "axios";
import { createSafeActionClient } from "next-safe-action"
import { ZodSchema } from "zod";

export const actionClient = createSafeActionClient({
    handleServerError(error) {
        return error.message || "Something went wrong!";
    }
})

export function createSafeAction<TInput, TOutput>(
    schema: ZodSchema<TInput>,
    handler: (params: { parsedInput: TInput }) => Promise<TOutput>
) {
    return actionClient
        .schema(schema)
        .action(async ({ parsedInput }) => {
            try {
                return await handler({ parsedInput });
            } catch (error) {
                const axiosError = error as AxiosError<{ message?: string }>;
                throw new Error(axiosError?.response?.data?.message || "Something went wrong");
            }
        });
}