interface AccessHooc {
  (a: string[]): void;
}
const accessRef: {
  current: string[];
} = {
  current: [],
};

export function useAccess(tag: string): boolean;
export function useAccess(tag?: void): [ AccessHooc, string[] ];
export function useAccess(tag?: string | void) {
  if (typeof tag === 'string') {
    return accessRef.current.includes(tag);
  }
  if (!tag) {
    const setAccess: AccessHooc = (nextAccess) => {
      accessRef.current = nextAccess;
    };
    return [
      setAccess,
      accessRef.current,
    ];
  }
  return undefined;
}

export default useAccess;
