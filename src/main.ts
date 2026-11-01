import { web } from "./application/web";
import { logger } from "./application/logging";
import { PORT } from "./application/env";

web.listen(PORT, () => {
  logger.info("App works and now it is running!");
});
