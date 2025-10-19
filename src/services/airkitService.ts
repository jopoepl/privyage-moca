import { AirService, BUILD_ENV } from "@mocanetwork/airkit";

let instance: AirService | null = null;

export async function initAirkit(partnerId: string) {
  if (instance) return instance;
  instance = new AirService({ partnerId });
  await instance.init({
    buildEnv: BUILD_ENV.SANDBOX,
    enableLogging: true,
    skipRehydration: false,
  });
  console.log("✅ AirKit initialized");
  return instance;
}

export function getAirkit() {
  return instance;
}
