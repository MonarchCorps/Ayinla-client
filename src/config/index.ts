const MODE_ENV = process.env.MODE_ENV as string;

const CONFIGS = {
    ENVIRONMENT: MODE_ENV,
    URL: {
        API_BASE_URL: process.env.API_BASE_URL as string,
        CLIENT_BASE_URL: process.env.CLIENT_BASE_URL as string,
    },
    IMAGE: "https://ayinla.vercel.app/images/hero-default.jpg"
};

export { CONFIGS, MODE_ENV };
