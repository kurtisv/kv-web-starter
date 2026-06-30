import type { ComponentVariable } from "./types";

/**
 * Return the subset of variables whose `dependencies` list includes `changedId`.
 * Used by the value store to know which variables to re-evaluate after a change.
 */
export function getDependents(
  variables: ComponentVariable[],
  changedId: string,
): ComponentVariable[] {
  return variables.filter((v) => v.dependencies?.includes(changedId));
}

/**
 * Build a dependency map: variableId → ids it depends on.
 */
export function buildDependencyMap(
  variables: ComponentVariable[],
): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const v of variables) {
    map[v.id] = v.dependencies ?? [];
  }
  return map;
}

/**
 * Return variable ids in topological order so that dependencies are
 * always resolved before the variables that depend on them.
 * Falls back to original order if a cycle is detected (safe default).
 */
export function topoSort(variables: ComponentVariable[]): ComponentVariable[] {
  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();

  for (const v of variables) {
    inDegree.set(v.id, 0);
    adjList.set(v.id, []);
  }

  for (const v of variables) {
    for (const dep of v.dependencies ?? []) {
      if (adjList.has(dep)) {
        adjList.get(dep)!.push(v.id);
        inDegree.set(v.id, (inDegree.get(v.id) ?? 0) + 1);
      }
    }
  }

  const queue = variables.filter((v) => (inDegree.get(v.id) ?? 0) === 0);
  const result: ComponentVariable[] = [];
  const byId = new Map(variables.map((v) => [v.id, v]));

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const nextId of adjList.get(node.id) ?? []) {
      const next = inDegree.get(nextId)! - 1;
      inDegree.set(nextId, next);
      if (next === 0) queue.push(byId.get(nextId)!);
    }
  }

  // Cycle detected — return original order as safe fallback
  return result.length === variables.length ? result : [...variables];
}
