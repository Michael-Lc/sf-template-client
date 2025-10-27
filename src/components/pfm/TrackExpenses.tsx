import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Download, Upload, CreditCard as Edit, Trash2, Plus, Calendar, DollarSign, Tag } from 'lucide-react';
import { usePFMStore } from '@/stores/pfmStore';
import { formatCurrency, cn } from '@/lib/utils';
import { PAYMENT_SOURCES } from '@/types/pfm';

export function TrackExpenses() {
  const { 
    transactions, 
    categories, 
    selectedMonth, 
    selectedCategory,
    setSelectedCategory,
    setIsEditingTransaction,
    setSelectedTransaction,
    getTransactionsByMonth,
    getTransactionsByCategory,
    deleteTransaction
  } = usePFMStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaymentSource, setSelectedPaymentSource] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const monthTransactions = getTransactionsByMonth(selectedMonth);
  
  // Filter and sort transactions
  const filteredTransactions = monthTransactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || transaction.categoryId === selectedCategory.id;
      const matchesPaymentSource = !selectedPaymentSource || transaction.paymentSource === selectedPaymentSource;
      
      return matchesSearch && matchesCategory && matchesPaymentSource;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          const categoryA = categories.find(c => c.id === a.categoryId)?.name || '';
          const categoryB = categories.find(c => c.id === b.categoryId)?.name || '';
          comparison = categoryA.localeCompare(categoryB);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalExpenses = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = filteredTransactions.length > 0 ? totalExpenses / filteredTransactions.length : 0;

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsEditingTransaction(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transactionId);
    }
  };

  const getPaymentSourceIcon = (source: string) => {
    const paymentSource = PAYMENT_SOURCES.find(ps => ps.id === source);
    return paymentSource?.icon || '💳';
  };

  const getPaymentSourceName = (source: string) => {
    const paymentSource = PAYMENT_SOURCES.find(ps => ps.id === source);
    return paymentSource?.name || source;
  };

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category || { name: 'Unknown', color: '#6B7280', icon: '📦' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Track Expenses</h2>
          <p className="text-gray-600">View and manage your transactions for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Receipt</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Total Expenses</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(totalExpenses)}</p>
          <p className="text-xs text-gray-600 mt-1">{filteredTransactions.length} transactions</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Average Transaction</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(averageTransaction)}</p>
          <p className="text-xs text-gray-600 mt-1">Per transaction</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Auto-Synced</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {filteredTransactions.filter(t => t.isAutoSynced).length}
          </p>
          <p className="text-xs text-gray-600 mt-1">From wallet</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">With Receipts</h3>
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-700">
            {filteredTransactions.filter(t => t.receiptUrl).length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Have receipts</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={selectedCategory?.id || ''}
            onChange={(e) => {
              const category = categories.find(c => c.id === e.target.value);
              setSelectedCategory(category || null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedPaymentSource}
            onChange={(e) => setSelectedPaymentSource(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Payment Sources</option>
            {PAYMENT_SOURCES.map((source) => (
              <option key={source.id} value={source.id}>
                {source.icon} {source.name}
              </option>
            ))}
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field as any);
              setSortOrder(order as any);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="amount-desc">Amount (Highest)</option>
            <option value="amount-asc">Amount (Lowest)</option>
            <option value="category-asc">Category (A-Z)</option>
            <option value="category-desc">Category (Z-A)</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
          <p className="text-sm text-gray-600">{filteredTransactions.length} transactions found</p>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
            <p className="text-gray-600">Try adjusting your filters or add some transactions</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Source</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Transaction ID</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => {
                  const categoryInfo = getCategoryInfo(transaction.categoryId);
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          {transaction.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {transaction.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <span>{categoryInfo.icon}</span>
                          <span className="text-gray-900">{categoryInfo.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <span>{getPaymentSourceIcon(transaction.paymentSource)}</span>
                          <span className="text-gray-600">{getPaymentSourceName(transaction.paymentSource)}</span>
                          {transaction.isAutoSynced && (
                            <Badge className="bg-green-100 text-green-700 text-xs">Auto</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        {transaction.transactionId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {transaction.receiptUrl && (
                            <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                              <Upload className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown by Category</h3>
        
        <div className="space-y-4">
          {categories
            .map(category => {
              const categoryTransactions = filteredTransactions.filter(t => t.categoryId === category.id);
              const categoryTotal = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
              const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0;
              
              return { ...category, total: categoryTotal, percentage, count: categoryTransactions.length };
            })
            .filter(category => category.total > 0)
            .sort((a, b) => b.total - a.total)
            .map((category) => (
              <div key={category.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.count} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(category.total)}</p>
                    <p className="text-sm text-gray-600">{category.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}