import type { Tree } from '@nx/devkit';
import { normalizeNameAndPaths } from '../../utils/path';
import type { NormalizedSchema, Schema } from '../schema';
import { determineArtifactNameAndDirectoryOptions } from '@nx/devkit/src/generators/artifact-name-and-directory-utils';
import { names } from '@nx/devkit';

export async function normalizeOptions(
  tree: Tree,
  options: Schema
): Promise<NormalizedSchema> {
  const {
    artifactName: name,
    directory,
    fileName,
    filePath,
    project,
  } = await determineArtifactNameAndDirectoryOptions(tree, {
    artifactType: 'directive',
    callingGenerator: '@nx/angular:scam-directive',
    name: options.name,
    directory: options.directory ?? options.path,
    flat: options.flat,
    nameAndDirectoryFormat: options.nameAndDirectoryFormat,
    project: options.project,
    suffix: 'directive',
  });

  const { className } = names(name);
  const { className: suffixClassName } = names('directive');
  const symbolName = `${className}${suffixClassName}`;

  return {
    ...options,
    export: options.export ?? true,
    inlineScam: options.inlineScam ?? true,
    directory,
    fileName,
    filePath,
    name,
    symbolName,
    project,
  };
}
