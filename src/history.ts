import { createBrowserHistory, History } from 'history';

let history: History;
let basename = '/';

export function createHistory(opts: { basename?: string } = {}) {
  const h = createBrowserHistory();
  if (opts.basename) {
    basename = opts.basename;
  }
  history = {
    ...h,
    push(to: any, state: any) {
      h.push(patchTo(to), state);
    },
    replace(to: any, state: any) {
      h.replace(patchTo(to), state);
    },
  };
  return h;
}

// Patch `to` to support basename
// Refs:
// https://github.com/remix-run/history/blob/3e9dab4/packages/history/index.ts#L484
// https://github.com/remix-run/history/blob/dev/docs/api-reference.md#to
function patchTo(to: any) {
  if (typeof to === 'string') {
    return `${stripLastSlash(basename)}${to}`;
  } else if (typeof to === 'object' && to.pathname) {
    return {
      ...to,
      pathname: `${stripLastSlash(basename)}${to.pathname}`,
    };
  } else {
    throw new Error(`Unexpected to: ${to}`);
  }
}

function stripLastSlash(path: string) {
  return path.slice(-1) === '/' ? path.slice(0, -1) : path;
}

export { history };
