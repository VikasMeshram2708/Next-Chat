import * as z from "zod";

export const sendChatSchema = z.object({
  msg: z
    .string()
    .min(2, {
      message: "query must have atleast 2 characters",
    })
    .max(150, {
      message: "query should not exceed more than 150 characters",
    }),
});
export type sendChatSchema = z.infer<typeof sendChatSchema>;
