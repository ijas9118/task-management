/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { StatusCodes } from "http-status-codes";

import { config } from "./config";
import logger from "./logger";

import { ProxyErrorResponse, ServiceConfig } from "@/types";

class ServiceProxy {
  private static readonly serviceConfigs: ServiceConfig[] = [
    {
      path: "/api/v1/auth",
      url: config.auth_service_url,
      pathRewrite: { "^/api/v1/auth": "/" },
      name: "auth-service",
      timeout: 5000,
    },
    {
      path: "/api/v1/users",
      url: config.user_service_url,
      pathRewrite: { "^/api/v1/users": "/" },
      name: "user-service",
    },
    {
      path: "/api/v1/tasks",
      url: config.task_service_url,
      pathRewrite: { "^/api/v1/tasks": "/" },
      name: "task-service",
    },
  ];

  private static createProxyOptions(service: ServiceConfig): Options {
    return {
      target: service.url,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      timeout: service.timeout || config.default_timeout,
      logger: logger,
      on: {
        error: ServiceProxy.handleProxyError,
        proxyReq: ServiceProxy.handleProxyRequest,
        proxyRes: ServiceProxy.handleProxyResponse,
      },
    };
  }

  private static handleProxyError(err: Error, req: any, res: any): void {
    logger.error(`Proxy error for ${req.path}:`, err);

    const errorResponse: ProxyErrorResponse = {
      message: "Service unavailable",
      status: StatusCodes.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
    };

    res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(errorResponse));
  }

  private static handleProxyRequest(_proxyReq: any, req: any): void {
    logger.debug(`Proxying request to ${req.path}`);
  }

  private static handleProxyResponse(_proxyRes: any, req: any): void {
    logger.debug(`Received response for ${req.path}`);
  }

  public static setupProxy(app: Application): void {
    ServiceProxy.serviceConfigs.forEach((service) => {
      const proxyOptions = ServiceProxy.createProxyOptions(service);
      app.use(service.path, createProxyMiddleware(proxyOptions));
      logger.info(`Configured proxy for ${service.name} at ${service.path}`);
    });
  }
}

export const proxyServices = (app: Application): void => {
  ServiceProxy.setupProxy(app);
};
