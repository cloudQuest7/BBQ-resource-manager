export const MOCK_PITS = [];
export const MOCK_RESOURCES = [];

// Simulated API service — replace with real axios calls to your FastAPI later
export const api = {
  getPits: async () => MOCK_PITS,
  getResources: async () => MOCK_RESOURCES,
  getSmokeQueue: async () => MOCK_RESOURCES.filter(r => r.status === 'queue'),
  getServed: async () => MOCK_RESOURCES.filter(r => r.status === 'served'),
  searchResources: async (query) => {
    const q = query.toLowerCase();
    return MOCK_RESOURCES.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.pitName && r.pitName.toLowerCase().includes(q))
    );
  },
  addResource: async (data) => ({
    _id: 'new_' + Date.now(),
    ...data,
    heat: 0.1,
    status: 'queue',
    createdAt: new Date().toISOString(),
  }),
  addPit: async (data) => ({
    _id: 'pit_' + Date.now(),
    ...data,
    count: 0,
  }),
};
