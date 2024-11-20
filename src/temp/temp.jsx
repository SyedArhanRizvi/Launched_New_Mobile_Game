import { getConnectedGroups } from '../utils/group.items';

vi.mock('../utils/data', async () => {
  const { connectedWords } = await vi.importActual('../utils/data');
  return {
    connectedWords: new Map([[2, connectedWords.get(2)]]),
  };
});

describe('helpers: getConnectedGroups', () => {
  it('should return connected groups', () => {
    vi.restoreAllMocks();

    const [itemGroups, allItems] = getConnectedGroups(8, 2);
    expect(itemGroups).toHaveLength(8);
    expect(allItems).toHaveLength(16);
  });

  it('should throw error for invalid group size', () => {
    expect(() => getConnectedGroups(8, 3)).toThrowError('Invalid group size: 3');
  });
});