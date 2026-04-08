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
    <div className="w-full min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-bold mb-1 sm:mb-2 text-white text-center">Wood Database</h2>
        <p className="text-responsive-sm sm:text-responsive-base text-gray-300 mb-3 sm:mb-4 text-center">Reference properties for common woodworking species</p>

        <div className="form-compact mb-4">
          <input
            type="text"
            placeholder="Search woods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-modern"
          />
        </div>

        {!search && (
          <div className="space-y-2 pb-3 border-b border-gray-700 mb-3">
            <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
              <input
                type="radio"
                checked={filter === 'all'}
                onChange={() => setFilter('all')}
                className="w-3 h-3"
              />
              All Woods
            </label>
            <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
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
                className="w-full text-xs mt-1"
              />
            )}
            <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
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
                className="w-full text-xs mt-1"
              />
            )}
          </div>
        )}

        <div className="space-y-1 max-h-48 sm:max-h-64 lg:max-h-96 overflow-y-auto scrollbar-styled mb-4">
          {displayWoods.map((wood) => (
            <button
              key={wood.name}
              onClick={() => setSelectedWood(wood)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition ${
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

        {/* Details Panel */}
        {selectedWood && (
          <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg border border-amber-400">
            <h3 className="text-responsive-lg sm:text-responsive-xl font-bold text-white mb-3">
              {selectedWood.name}
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Movement</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{selectedWood.movement}%</p>
                <p className="text-xs text-amber-100 mt-1">Width change 0-FSP</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Hardness</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{selectedWood.hardness}</p>
                <p className="text-xs text-amber-100 mt-1">Janka scale</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Density</p>
                <p className="text-responsive-lg sm:text-responsive-xl font-bold text-white">{selectedWood.density}</p>
                <p className="text-xs text-amber-100 mt-1">Relative to water</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs text-amber-100">Color</p>
                <p className="text-responsive-sm sm:text-responsive-base font-bold text-white">{selectedWood.color}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Grain</p>
                <p className="text-xs sm:text-sm text-white">{selectedWood.grain}</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Workability</p>
                <p className="text-xs sm:text-sm text-white">{selectedWood.workability}</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-2 sm:p-3 rounded-lg border border-amber-400">
                <p className="text-xs font-semibold text-amber-100 mb-1">Finishing</p>
                <p className="text-xs sm:text-sm text-white">{selectedWood.finishing}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
