import { useEffect, useState } from 'react';
import { useCategoryStore } from '../stores/useCategoryStore';
import { Loader, Pencil, Trash2 } from 'lucide-react';

const CategoryManager = () => {
  const {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();

  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCategory(newName);
    setNewName('');
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;
    updateCategory(editId, editName);
    setEditId(null);
    setEditName('');
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-6">Category Manager</h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="px-4 py-2 rounded bg-slate-700 text-white w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium"
        >
          Add
        </button>
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      )}

      <ul className="space-y-4">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center bg-slate-700 p-3 rounded"
          >
            {editId === cat._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-2 py-1 bg-slate-600 rounded text-white w-full"
                />
                <button
                  onClick={handleUpdate}
                  className="ml-4 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setEditName('');
                  }}
                  className="ml-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(cat._id);
                      setEditName(cat.name);
                    }}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
