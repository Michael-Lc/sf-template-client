import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, CreditCard as Edit, Trash2, Folder, FolderOpen, Palette, Save, X, ChevronDown, ChevronRight } from 'lucide-react';
import { usePFMStore } from '@/stores/pfmStore';
import { ExpenseCategory } from '@/types/pfm';
import { cn } from '@/lib/utils';

const AVAILABLE_ICONS = ['🍽️', '🚗', '💡', '🏠', '📚', '🏥', '🎬', '📦', '🛒', '⛽', '💊', '🎓', '💳', '📱', '🎮', '👕', '🎵', '🏋️', '✈️', '🎨'];
const AVAILABLE_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#EC4899', '#6B7280', '#84CC16', '#F97316'];

export function ManageCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = usePFMStore();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [subcategories, setSubcategories] = useState<Array<{name: string, budgetPercentage: number}>>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    color: AVAILABLE_COLORS[0],
    icon: AVAILABLE_ICONS[0],
    parentId: '',
    alertThreshold: 80
  });

  const resetForm = () => {
    setFormData({
      name: '',
      color: AVAILABLE_COLORS[0],
      icon: AVAILABLE_ICONS[0],
      parentId: '',
      alertThreshold: 80
    });
    setIsCreating(false);
    setEditingCategory(null);
    setShowSubcategoryForm(false);
    setSubcategories([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create subcategories if any
    const createdSubcategories: ExpenseCategory[] = subcategories.map((sub, index) => ({
      id: `${Date.now()}-sub-${index}`,
      name: sub.name,
      color: formData.color,
      icon: formData.icon,
      isCustom: true,
      parentId: editingCategory?.id || Date.now().toString(),
      alertThreshold: formData.alertThreshold,
      subcategories: []
    }));
    
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: formData.name,
        color: formData.color,
        icon: formData.icon,
        alertThreshold: formData.alertThreshold,
        subcategories: [...(editingCategory.subcategories || []), ...createdSubcategories]
      });
    } else {
      const newCategory: ExpenseCategory = {
        id: Date.now().toString(),
        name: formData.name,
        color: formData.color,
        icon: formData.icon,
        isCustom: true,
        parentId: formData.parentId || undefined,
        alertThreshold: formData.alertThreshold,
        subcategories: createdSubcategories
      };
      
      addCategory(newCategory);
    }
    
    resetForm();
  };
  
  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: '', budgetPercentage: 0 }]);
  };
  
  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };
  
  const updateSubcategory = (index: number, field: 'name' | 'budgetPercentage', value: string | number) => {
    const updated = [...subcategories];
    updated[index] = { ...updated[index], [field]: value };
    setSubcategories(updated);
  };

  const handleEdit = (category: ExpenseCategory) => {
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
      parentId: category.parentId || '',
      alertThreshold: category.alertThreshold
    });
    setEditingCategory(category);
    setIsCreating(true);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      deleteCategory(categoryId);
    }
  };

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const mainCategories = categories.filter(cat => !cat.parentId);
  const customCategories = categories.filter(cat => cat.isCustom);
  const predefinedCategories = categories.filter(cat => !cat.isCustom);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Expense Categories</h2>
          <p className="text-gray-600">Customize your budgeting system with personal categories</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category (Optional)
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None (Main Category)</option>
                  {mainCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-10 gap-2">
                  {AVAILABLE_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={cn(
                        "p-2 text-lg border rounded-lg hover:bg-gray-50 transition-colors",
                        formData.icon === icon ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      )}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={cn(
                        "w-10 h-10 rounded-lg border-2 transition-all",
                        formData.color === color ? "border-gray-900 scale-110" : "border-gray-300"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.alertThreshold}
                onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get alerts when spending reaches this percentage of your budget
              </p>
            </div>
            
            {/* Subcategories Section */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showSubcategoryForm}
                    onChange={(e) => setShowSubcategoryForm(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Add Subcategories</span>
                </label>
                {showSubcategoryForm && (
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Subcategory</span>
                  </button>
                )}
              </div>
              
              {showSubcategoryForm && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-3">
                    Create subcategories for more detailed expense tracking (max 10)
                  </p>
                  
                  {subcategories.map((subcategory, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Subcategory name"
                          value={subcategory.name}
                          onChange={(e) => updateSubcategory(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          placeholder="% of parent"
                          min="0"
                          max="100"
                          value={subcategory.budgetPercentage}
                          onChange={(e) => updateSubcategory(index, 'budgetPercentage', parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {subcategories.length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      No subcategories added yet. Click "Add Subcategory" to get started.
                    </div>
                  )}
                  
                  {subcategories.length >= 10 && (
                    <p className="text-xs text-amber-600">
                      Maximum of 10 subcategories allowed per category
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Folder className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Custom Categories</h3>
              <p className="text-sm text-gray-600">{customCategories.length} categories created</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {customCategories.length === 0 ? (
              <div className="text-center py-8">
                <Folder className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No custom categories yet</p>
                <p className="text-gray-400 text-xs">Create your first custom category</p>
              </div>
            ) : (
              customCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-500">Alert at {category.alertThreshold}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: category.color }}
                    />
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Categories</h3>
              <p className="text-sm text-gray-600">{predefinedCategories.length} predefined categories</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {predefinedCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleExpanded(category.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {category.subcategories.length > 0 ? (
                        expandedCategories.has(category.id) ? (
                          <FolderOpen className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Folder className="w-4 h-4 text-gray-600" />
                        )
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      {category.subcategories.length > 0 && (
                        <p className="text-xs text-gray-500">{category.subcategories.length} subcategories</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: category.color }}
                    />
                    <Badge variant="outline" className="text-xs">System</Badge>
                  </div>
                </div>
                
                {/* Subcategories */}
                {expandedCategories.has(category.id) && category.subcategories.length > 0 && (
                  <div className="ml-8 mt-2 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{subcategory.icon}</span>
                          <span className="text-sm text-gray-700">{subcategory.name}</span>
                          {subcategory.isCustom && (
                            <Badge variant="outline" className="text-xs">Custom</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: subcategory.color }}
                          />
                          {subcategory.isCustom && (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(subcategory)}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(subcategory.id)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Category Usage Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">{categories.length}</p>
            <p className="text-sm text-gray-600">Total Categories</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">{customCategories.length}</p>
            <p className="text-sm text-gray-600">Custom Categories</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">
              {categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Subcategories</p>
          </div>
        </div>
      </Card>
    </div>
  );
}