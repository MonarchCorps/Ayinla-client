import { toast } from "react-toastify";
import { SafeActionResult } from "next-safe-action";

type ToastMessages = {
    pending: string;
    success: string;
    error: {
        render?: (data: any) => string;
    } | string;
};

/**
 * Creates a toast promise that works with next-safe-action
 * @param executeAsync - The executeAsync function from useAction
 * @param values - The values to pass to executeAsync
 * @param toastMessages - Custom toast messages configuration
 * @returns A promise that resolves to the action result data
 */
export const toastActionPromise = async <TInput, TOutput>(
    executeAsync: (input: TInput) => Promise<SafeActionResult<any, any, any, any, any, TOutput> | undefined>,
    values: TInput,
    toastMessages: ToastMessages
): Promise<TOutput | undefined> => {
    return toast.promise(
        new Promise<TOutput>(async (resolve, reject) => {
            const result = await executeAsync(values);

            if (!result) {
                return reject("Something went wrong!");
            }

            if (result.serverError) {
                return reject(result.serverError);
            }

            if (result.validationErrors) {
                return reject("Validation failed. Check your inputs.");
            }

            resolve(result.data as TOutput);
        }),
        {
            pending: toastMessages.pending || "Processing...",
            success: toastMessages.success || "Operation completed successfully!",
            error: toastMessages.error || {
                render({ data }) {
                    return typeof data === "string" ? data : "Operation failed";
                },
            },
        }
    );
};