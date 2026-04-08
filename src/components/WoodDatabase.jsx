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
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto scrollbar-styled flex items-start justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl">
        <h2 className="text-responsive-2xl font-bold mb-2 text-white">Wood Database</h2>
        <p className="text-responsive-base text-gray-300 mb-6 sm:mb-8">Reference properties for common woodworking species</p>

        <div className="space-y-3 sm:space-y-4 mb-6">
          <h3 className="font-bold text-responsive-lg text-white">Species</h3>

          <div>
            <input
              type="text"
              placeholder="Search woods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-modern text-responsive-base"
            />
          </div>

          {!search && (
            <div className="space-y-2 pb-4 border-b border-gray-700">
              <label className="flex items-center gap-2 text-responsive-base text-gray-300">
                <input
                  type="radio"
                  checked={filter === 'all'}
                  onChange={() => setFilter('all')}
                  className="w-3 h-3"
                />
                All Woods
              </label>
              <label className="flex items-center gap-2 text-responsive-base text-gray-300">
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
              <label className="flex items-center gap-2 text-responsive-base text-gray-300">
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

          <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-styled">
            {displayWoods.map((wood) => (
              <button
                key={wood.name}
                onClick={() => setSelectedWood(wood)}
                className={`w-full text-left px-3 py-2 rounded-lg text-responsive-base transition ${
                  selectedWood.name === wood.name
                    ? 'bg-blue-600 bg-opacity-50 border-l-4 border-blue-400 text-white'
                    : 'bg-gray-800 bg-opacity-30 text-gray-300 border border-gray-700 hover:bg-opacity-50'
                }`}
              >
                <p className="font-medium">{wood.name}</p>
                <p className="text-xs text-gray-400">
                  Move: {wood.movement}% | Hard: {wood.hardness}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        {selectedWood && (
          <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg border border-amber-400">
            <h3 className="text-responsive-2xl font-bold text-white mb-4">{selectedWood.name}</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Movement</p>
                <p className="text-responsive-xl font-bold text-white">{selectedWood.movement}%</p>
                <p className="text-xs text-amber-100 mt-1">Width change 0-FSP</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Hardness</p>
                <p className="text-responsive-xl font-bold text-white">{selectedWood.hardness}</p>
                <p className="text-xs text-amber-100 mt-1">Janka scale</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Density</p>
                <p className="text-responsive-xl font-bold text-white">{selectedWood.density}</p>
                <p className="text-xs text-amber-100 mt-1">Relative to water</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Color</p>
                <p className="text-responsive-base font-bold text-white">{selectedWood.color}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Grain</p>
                <p className="text-responsive-base text-white">{selectedWood.grain}</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Workability</p>
                <p className="text-responsive-base text-white">{selectedWood.workability}</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Finishing</p>
                <p className="text-responsive-base text-white">{selectedWood.finishing}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
