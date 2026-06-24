/**
 * Theology quiz — transport layer.
 *
 * This router is intentionally thin: it validates input, fetches the candidate
 * posts (the only I/O), and delegates all scoring to the pure quiz service.
 * The question bank and scoring logic live under `./quiz/`.
 */
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { listPosts } from "./db";
import { THEOLOGY_QUIZ_QUESTIONS, QUIZ_LENGTH } from "./quiz/questions";
import { buildQuizResult } from "./quiz/quiz-service";

export const quizRouter = router({
  getQuestions: publicProcedure.query(() => THEOLOGY_QUIZ_QUESTIONS),

  getRecommendations: publicProcedure
    .input(z.object({ answers: z.array(z.number()).length(QUIZ_LENGTH) }))
    .query(async ({ input }) => {
      const allPosts = await listPosts();
      return buildQuizResult(input.answers, allPosts);
    }),
});
