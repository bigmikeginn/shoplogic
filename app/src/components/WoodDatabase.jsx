import { useState } from 'react';
import { WOOD_DATABASE, searchWood, getWoodsByHardness, getWoodsByStability } from '../utils/woodDatabase';
import WoodDatabaseIllustration from './WoodDatabaseIllustration';

export default function WoodDatabase() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
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
    <div className="w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <input type="text" placeholder="Search woods..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-modern mb-3" />

      {!search && (
        <div className="space-y-2 pb-3 border-b border-white/[0.06] mb-3">
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input type="radio" checked={filter === 'all'} onChange={() => setFilter('all')} className="w-3 h-3 accent-amber-500" />
            All Woods
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input type="radio" checked={filter === 'hardness'} onChange={() => setFilter('hardness')} className="w-3 h-3 accent-amber-500" />
            Hardness ≥
          </label>
          {filter === 'hardness' && (
            <input type="number" value={filterValue} onChange={(e) => setFilterValue(parseInt(e.target.value))} placeholder="Janka rating" className="input-modern" />
          )}
          <label className="flex items-center gap-2 text-xs text-gray-400">
            <input type="radio" checked={filter === 'stability'} onChange={() => setFilter('stability')} className="w-3 h-3 accent-amber-500" />
            Stability ≤
          </label>
          {filter === 'stability' && (
            <input type="number" step="0.1" value={filterValue} onChange={(e) => setFilterValue(parseFloat(e.target.value))} placeholder="Movement coefficient" className="input-modern" />
          )}
        </div>
      )}

      <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-styled mb-3">
        {displayWoods.map((wood) => (
          <button
            key={wood.name}
            onClick={() => setSelectedWood(wood)}
            className={`w-full text-left p-2.5 rounded text-xs transition ${selectedWood.name === wood.name ? 'bg-amber-500/[0.08] border border-amber-500/30' : 'border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'}`}
          >
            <span className="text-white font-medium">{wood.name}</span>
            <span className="text-gray-500 ml-2">{wood.scientificName}</span>
          </button>
        ))}
      </div>

      {selectedWood && (
        <div className="result-card space-y-2">
          <h3 className="text-lg font-bold text-amber-400">{selectedWood.name}</h3>
          <p className="text-xs text-gray-500 italic">{selectedWood.scientificName}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-500">Janka</span><p className="text-white">{selectedWood.janka} lbf</p></div>
            <div><span className="text-gray-500">Density</span><p className="text-white">{selectedWood.density} lbs/ft³</p></div>
            <div><span className="text-gray-500">Stability</span><p className="text-white">{selectedWood.stability}</p></div>
            <div><span className="text-gray-500">Workability</span><p className="text-white">{selectedWood.workability}</p></div>
          </div>
          <div className="divider-subtle my-2" />
          <p className="text-xs text-gray-400">{selectedWood.notes}</p>
        </div>
      )}
      <WoodDatabaseIllustration />
    </div>
  );
}