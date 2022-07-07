import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  logger,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { stringUtils } from '@nrwl/workspace';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';
import { IonicFeatureSchema } from './schema';

/**
 * Remove a file from the Virtual Schematic Tree
 */
export function deleteFile(from: string) {
  return (host: Tree) => host.delete(from);
}

export default async function (tree: Tree, schema: IonicFeatureSchema) {
  logger.info(`Generating ${names(schema.name).className}`);

  const libName = 'feature-' + schema.name;
  const libFolderPath = schema.path.replace('/', '-');
  const libraryGenerator = wrapAngularDevkitSchematic(
    '@nrwl/angular',
    'lib',
  );
  await libraryGenerator(tree, {
    name: names(libName).fileName,
    directory: schema.path,
    buildable: true,
    standaloneConfig: true,
    tags: 'scope:' + schema.scope + ',type:feature,platform:web',
    strict: true,
    skipModule: true,
  });

  // add the page suffix to the lint rules
  

  const libRoot = readProjectConfiguration(
    tree,
    names(libFolderPath + '-' + libName).fileName
  ).root;

  const fileToDelete =
    libRoot + '/src/lib/' + schema.path.replace('/', '-') + '-' + libName;

  tree.delete(fileToDelete + '.spec.ts');
  tree.delete(fileToDelete + '.ts');
  tree.delete(libRoot + '/src/index.ts');

  // generate the files performing substitutions
  generateFiles(tree, joinPathFragments(__dirname, './files'), libRoot, {
    name: schema.name,
    className: names(schema.name).className,
    fileName: names(schema.name).fileName,
    selector: schema.selector,
    storeName: schema.componentStoreName,
    storeImport: schema.componentStoreImport,
    tmpl: '',
  });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
