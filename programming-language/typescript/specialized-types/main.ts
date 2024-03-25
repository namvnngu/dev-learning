function projectACtion<U extends any[]>(
  name: string,
  func: (...args: U) => any
) {
  return function wrapper(project: string, ...args: U) {
    func(...args);
    console.log(project, name);
  };
}

// Tuples
type ElementTuple = [number, number, number, number];

function hitTest(elem1: ElementTuple, elem2: ElementTuple) {
  const [x1, y1, w1, h1] = elem1;
  const [x2, y2, w2, h2] = elem2;

  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

const didHit = hitTest([1, 2, 3, 4], [1, 2, 3, 3]);

// Functionality of Classes with Mixins
class CoreApi {
  constructor(public baseUrl: string) { }
}

type BaseApiConstructor = new (...args: any[]) => CoreApi;

function ImagesApi<TBase extends BaseApiConstructor>(Base: TBase) {
  return class extends Base {
    getImages() { }
    saveImage() { }
  };
}

function ProjectApi<TBase extends BaseApiConstructor>(Base: TBase) {
  return class extends Base {
    getProjects() { }
    saveProject() { }
    deleteProject() { }
  };
}

class ApiClient extends ProjectApi(ImagesApi(CoreApi)) { }

// Modelling Idiomatic Data Sources with Iterators
class ProjectClass {
  constructor(private projects: { [projectId: string]: string }) { }

  [Symbol.iterator]() {
    let pointers = 0;
    let projects = Object.values(this.projects);

    return {
      next: (): IteratorResult<string> => {
        if (pointers < projects.length) {
          return {
            done: false,
            value: projects[pointers++],
          };
        } else {
          return {
            done: true,
            value: null,
          };
        }
      },
    };
  }
}

function renderIterators(iterableObject: ProjectClass) {
  for (const project of iterableObject) {
    console.log(project);
  }
}

// Using Generators for Functions That Can Be Paused or Resumed
async function* projectGenerator() {
  const startProject = "start";

  while (true) {
    await new Promise((r) => setTimeout(r, 1000));
    yield startProject;
  }
}

async function renderOverTime(projects: () => AsyncGenerator<string>) {
  for await (const proj of projects()) {
    console.log(proj);
  }
}
