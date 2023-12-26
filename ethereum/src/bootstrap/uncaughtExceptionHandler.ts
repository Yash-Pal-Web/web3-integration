/**
 * This function is used to handle the uncaught exception thrown by the application. We can implement logic to how to handle
 *  error.
 */
import logger from '../utils/logger';
export default async function handlerejection() {
  try {
    process.on('uncaughtException', (error) => {
      logger.error(error);
    });

    process.on('unhandledRejection', (error) => {
      logger.error(error);
    });
  } catch (error) {
    logger.error('Uncaught Handler middleware not attached');
  }
}
