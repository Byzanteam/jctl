import { join } from "path";

import { Console, consoleImpl } from "@/api/console.ts";
import { DB, db, DBClass } from "@/api/db.ts";
import { DirEntry, FS, fs, MkdirOptions, WriteFileOptions } from "@/api/fs.ts";
import {
  Deployment,
  DeploymentLog,
  DeploymentLogSeverity,
  DeploymentState,
  Jet,
  jet,
  JetProject,
  ProjectEnvironmentName,
} from "@/api/jet.ts";

import { Config } from "@/jcli/config/config.ts";
import {
  JcliConfigDotJSON,
  jcliConfigDotJSONPath,
} from "@/jcli/config/jcli-config-json.ts";

export const PROJECT_ASSETS_DIRECTORY = ".jcli";
export const PROJECT_DB_PATH = join(PROJECT_ASSETS_DIRECTORY, "project.sqlite");

let config: Config<JcliConfigDotJSON>;

export function getConfig(): Config<JcliConfigDotJSON> {
  if (undefined === config) {
    config = new Config<JcliConfigDotJSON>(jcliConfigDotJSONPath());
  }

  return config;
}

export type {
  Console,
  DB,
  DBClass,
  Deployment,
  DeploymentLog,
  DeploymentLogSeverity,
  DeploymentState,
  DirEntry,
  FS,
  Jet,
  JetProject,
  MkdirOptions,
  ProjectEnvironmentName,
  WriteFileOptions,
};

export interface APIClient {
  console: Console;
  db: DB;
  fs: FS;
  jet: Jet;
}

export const api: APIClient = {
  console: consoleImpl,
  db,
  fs,
  jet,
};

export function setupAPI(instance: APIClient): void {
  api.console = instance.console;
  api.db = instance.db;
  api.fs = instance.fs;
  api.jet = instance.jet;
}
