import setUpApp from '../src/setUpApp';

let cachedApp: any;

export default async (req: any, res: any) => {
  if (!cachedApp) {
    try {
      cachedApp = await setUpApp();
    } catch (error) {
      console.error('Error during app initialization:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error during initialization',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return cachedApp(req, res);
};
