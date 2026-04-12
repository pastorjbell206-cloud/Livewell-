import { router, publicProcedure } from "./_core/trpc";
import { generateSitemap, generateRobotsTxt } from "./sitemap-generator";

export const sitemapRouter = router({
  /**
   * Get sitemap XML
   */
  getSitemap: publicProcedure.query(async ({ ctx }) => {
    try {
      const baseUrl = ctx.req?.headers.origin || "https://livewell.com";
      const sitemap = await generateSitemap(baseUrl);

      return {
        success: true,
        content: sitemap,
        contentType: "application/xml",
      };
    } catch (error: any) {
      console.error("[Sitemap Router] Error generating sitemap:", error);
      throw new Error("Failed to generate sitemap");
    }
  }),

  /**
   * Get robots.txt content
   */
  getRobotsTxt: publicProcedure.query(async ({ ctx }) => {
    try {
      const baseUrl = ctx.req?.headers.origin || "https://livewell.com";
      const robotsTxt = generateRobotsTxt(baseUrl);

      return {
        success: true,
        content: robotsTxt,
        contentType: "text/plain",
      };
    } catch (error: any) {
      console.error("[Sitemap Router] Error generating robots.txt:", error);
      throw new Error("Failed to generate robots.txt");
    }
  }),
});
