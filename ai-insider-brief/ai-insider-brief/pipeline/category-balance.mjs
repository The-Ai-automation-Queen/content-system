// Reorders candidates so specialist beats are evaluated before high-volume
// Tools/Breaking feeds consume the run. It never forces a card to publish and
// never changes source trust order within a category.

const COVERAGE_ORDER = [
  'Finance', 'Healthcare', 'Marketing', 'Real Estate', 'Education', 'Media',
  'Privacy', 'Strategy', 'Tools', 'Breaking'
];

export function prioritizeCategoryCoverage(items) {
  const source = Array.isArray(items) ? items : [];
  const selected = [];
  const used = new Set();
  const buckets = new Map(COVERAGE_ORDER.map(category => [category, []]));

  source.forEach((item, index) => {
    const affinities = Array.isArray(item.categoryAffinity) ? item.categoryAffinity : [];
    affinities.forEach(category => {
      if (buckets.has(category)) buckets.get(category).push({ item, index });
    });
  });

  // First pass guarantees evaluation opportunity for every represented beat.
  COVERAGE_ORDER.forEach(category => {
    const candidate = buckets.get(category).find(entry => !used.has(entry.index));
    if (candidate) {
      selected.push(candidate.item);
      used.add(candidate.index);
    }
  });

  // Preserve the crawler's original tier/date ordering for everything else.
  source.forEach((item, index) => {
    if (!used.has(index)) selected.push(item);
  });
  return selected;
}

export { COVERAGE_ORDER };
