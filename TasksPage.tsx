import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { formatDate } from '../../utils/formatters';
import { WeddingTask, TaskPriority, TaskStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  CheckSquare,
  Plus,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Trash2,
  Edit2,
  Filter
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { wedding, tasks, addTask, updateTask, toggleTask, deleteTask, taskStats } = useWedding();

  const [activeTab, setActiveTab] = useState<'all' | 'todo' | 'completed'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<any>('General');
  const [dueDate, setDueDate] = useState('2026-11-20');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const openAddModal = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
    setCategory('General');
    setDueDate('2026-11-20');
    setPriority('medium');
    setModalOpen(true);
  };

  const openEditModal = (task: WeddingTask) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setCategory(task.category);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      updateTask(editingTaskId, {
        title,
        description,
        category,
        dueDate,
        priority,
      });
    } else {
      addTask({
        weddingId: wedding.id,
        title,
        description,
        category,
        dueDate,
        priority,
        status: 'todo',
      });
    }
    setModalOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'todo' && t.status === 'completed') return false;
    if (activeTab === 'completed' && t.status !== 'completed') return false;
    if (filterCategory !== 'All' && t.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Wedding Checklist</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Tasks & Ceremonial Timeline
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Organize Haldi, Sangeet, Muhurat, and Reception to-dos
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Task
        </Button>
      </div>

      {/* Progress Card */}
      <Card className="p-5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white via-roseGold-50/30 to-blush-50/50">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-mauve-500 uppercase tracking-wider">
            Overall Completion
          </span>
          <p className="font-serif text-2xl font-bold text-mauve-900">
            {taskStats.completed} of {taskStats.total} Tasks Finished ({taskStats.percentComplete}%)
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="w-full h-3 rounded-full bg-blush-200 overflow-hidden">
            <div
              className="h-full bg-roseGold-500 rounded-full transition-all duration-500"
              style={{ width: `${taskStats.percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-mauve-500 font-medium">
            <span>{taskStats.pending} remaining</span>
            <span>Target: 100% before Dec 18</span>
          </div>
        </div>
      </Card>

      {/* Filter and Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex bg-blush-100/70 p-1 rounded-2xl border border-blush-200 shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all' ? 'bg-white text-mauve-900 shadow-xs' : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('todo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'todo' ? 'bg-white text-mauve-900 shadow-xs' : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            To-Do ({taskStats.pending})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'completed' ? 'bg-white text-mauve-900 shadow-xs' : 'text-mauve-600 hover:text-mauve-900'
            }`}
          >
            Completed ({taskStats.completed})
          </button>
        </div>

        {/* Category filter */}
        <div className="w-full sm:w-48">
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { value: 'All', label: 'All Categories' },
              { value: 'General', label: 'General' },
              { value: 'Venue', label: 'Venue' },
              { value: 'Photography', label: 'Photography' },
              { value: 'Catering', label: 'Catering' },
              { value: 'Decoration', label: 'Decoration' },
              { value: 'Makeup', label: 'Makeup' },
              { value: 'Invitations', label: 'Invitations' },
            ]}
          />
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={<CheckSquare className="w-8 h-8" />}
          title="No tasks match criteria"
          description="You are caught up with this category or status filter!"
          actionLabel="Add a Task"
          onAction={openAddModal}
        />
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`p-4 transition-all flex items-start justify-between gap-4 ${
                task.status === 'completed'
                  ? 'bg-mauve-50/50 border-mauve-200/50 opacity-70'
                  : 'hover:border-roseGold-300'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-mauve-400 hover:text-roseGold-600 transition-colors shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <div className="w-5 h-5 rounded-md border-2 border-mauve-300 hover:border-roseGold-500 transition-colors" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <h3
                    className={`text-sm font-bold text-mauve-900 ${
                      task.status === 'completed' ? 'line-through text-mauve-500' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-xs text-mauve-600 leading-relaxed">{task.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-mauve-500 font-medium">
                    <Badge variant="blush" size="sm">
                      {task.category}
                    </Badge>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-roseGold-500" /> Due: {formatDate(task.dueDate)}
                    </span>
                    {task.priority === 'high' && (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-1.5 text-mauve-400 hover:text-roseGold-700 hover:bg-blush-50 rounded-lg transition-colors"
                  title="Edit task"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete task "${task.title}"?`)) {
                      deleteTask(task.id);
                    }
                  }}
                  className="p-1.5 text-mauve-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTaskId ? 'Edit Task' : 'Add New Task'}
        subtitle="Manage wedding milestones, appointments, and deliverables"
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Schedule bridal mehendi design session"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Confirm timing with family coordinator"
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'General', label: 'General Planning' },
                { value: 'Venue', label: 'Venue' },
                { value: 'Photography', label: 'Photography' },
                { value: 'Catering', label: 'Catering' },
                { value: 'Decoration', label: 'Decoration' },
                { value: 'Makeup', label: 'Makeup' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Invitations', label: 'Invitations' },
                { value: 'Ceremony', label: 'Rituals / Ceremonies' },
              ]}
            />
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              options={[
                { value: 'high', label: 'High Priority' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>

          <Input
            label="Target Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingTaskId ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
