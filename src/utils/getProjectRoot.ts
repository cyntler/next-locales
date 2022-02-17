import { cwd } from 'process';
import findProjectRoot from 'find-project-root';

export const getProjectRoot = () => findProjectRoot(cwd());
