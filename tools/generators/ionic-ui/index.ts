import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  logger,
  names,
  readProjectConfiguration,
  Tree
} from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';
import { IonicUiSchema } from './schema';

export default async function (tree: Tree, schema: IonicUiSchema) {
  logger.info(`Generating ${names(schema.name).className}`);

  const libName = 'ui-' + schema.name;
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
    tags: 'scope:' + schema.scope + ',type:ui',
    prefix: "where-app",
    strict: true,
  });

  const libRoot = readProjectConfiguration(
    tree,
    names(libFolderPath + '-' + libName).fileName
  ).root;

  const fileToDelete =
    libRoot + '/src/lib/' + schema.path.replace('/', '-') + '-' + libName;

  tree.delete(fileToDelete + '.spec.ts');
  tree.delete(fileToDelete + '.ts');
  tree.delete(libRoot + '/src/index.ts');

  generateFiles(tree, joinPathFragments(__dirname, './files'), libRoot, {
    name: schema.name,
    className: names(schema.name).className,
    fileName: names(schema.name).fileName,
    selector: schema.selector,
    tmpl: '',
  });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
