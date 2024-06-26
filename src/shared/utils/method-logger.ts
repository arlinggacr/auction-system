export const MethodLogger = {
  Controller: (methodName: string) => `Execute ${methodName} controller`,
  Service: (methodName: string) => `Execute ${methodName} service`,
  Repository: (methodName: string) => `Execute ${methodName} repository`,
};
