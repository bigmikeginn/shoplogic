import { useState } from 'react';
import { WOOD_DATABASE, searchWood, getWoodsByHardness, getWoodsByStability } from '../utils/woodDatabase';

export default function WoodDatabase() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'hardness', 'stability'
  const [filterValue, setFilterValue] = useState(1000);
  const [selectedWood, setSelectedWood] = useState(WOOD_DATABASE[0]);

  let displayWoods = WOOD_DATABASE;

  if (search) {
    displayWoods = searchWood(search);
  } else if (filter === 'hardness') {
    displayWoods = getWoodsByHardness(filterValue);
  } else if (filter === 'stability') {
    displayWoods = getWoodsByStability(filterValue);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wood Database</h2>
      <p className="text-sm text-gray-600 mb-6">Reference properties for common woodworking species</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold mb-3">Species</h3>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search woods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!search && (
            <div className="space-y-2 mb-4 pb-4 border-b">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={filter === 'all'}
                  onChange={() => setFilter('all')}
                  className="w-3 h-3"
                />
                All Woods
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={filter === 'hardness'}
                  onChange={() => setFilter('hardness')}
                  className="w-3 h-3"
                />
                Min Hardness
              </label>
              {filter === 'hardness' && (
                <input
                  type="range"
                  min="500"
                  max="2000"
                  step="100"
                  value={filterValue}
                  onChange={(e) => setFilterValue(parseInt(e.target.value))}
                  className="w-full text-xs mt-2"
                />
              )}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={filter === 'stability'}
                  onChange={() => setFilter('stability')}
                  className="w-3 h-3"
                />
                Max Movement
              </label>
              {filter === 'stability' && (
                <input
                  type="range"
                  min="2"
                  max="11"
                  step="0.5"
                  value={filterValue}
                  onChange={(e) => setFilterValue(parseFloat(e.target.value))}
                  className="w-full text-xs mt-2"
                />
              )}
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {displayWoods.map((wood) => (
              <button
                key={wood.name}
                onClick={() => setSelectedWood(wood)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  selectedWood.name === wood.name
                    ? 'bg-blue-100 border-l-4 border-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <p className="font-medium">{wood.name}</p>
                <p className="text-xs text-gray-500">
                  Move: {wood.movement}% | Hard: {wood.hardness}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        {selectedWood && (
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-xl font-bold text-amber-900 mb-4">{selectedWood.name}</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-md border border-amber-100">
                  <p className="text-xs text-gray-600">Movement</p>
                  <p className="text-2xl font-bold text-amber-700">{selectedWood.movement}%</p>
                  <p className="text-xs text-gray-500 mt-1">Width change 0-FSP</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-amber-100">
                  <p className="text-xs text-gray-600">Hardness</p>
                  <p className="text-2xl font-bold text-amber-700">{selectedWood.hardness}</p>
                  <p className="text-xs text-gray-500 mt-1">Janka scale</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-amber-100">
                  <p className="text-xs text-gray-600">Density</p>
                  <p className="text-2xl font-bold text-amber-700">{selectedWood.density}</p>
                  <p className="text-xs text-gray-500 mt-1">Relative to water</p>
                </div>
                <div className="bg-white p-3 rounded-md border border-amber-100">
                  <p className="text-xs text-gray-600">Color</p>
                  <p className="text-sm font-bold text-amber-700">{selectedWood.color}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Grain</p>
                  <p className="text-sm text-gray-800">{selectedWood.grain}</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Workability</p>
                  <p className="text-sm text-gray-800">{selectedWood.workability}</p>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Finishing</p>
                  <p className="text-sm text-gray-800">{selectedWood.finishing}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
