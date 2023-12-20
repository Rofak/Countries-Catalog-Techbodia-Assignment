export default function useLoading() {
  return useState("loading", () => false);
}
