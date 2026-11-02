import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const VendorPortfolioPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const [images, setImages] = useState<string[]>(vendor.images);

  const [modalOpen, setModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const updated = [...images, newImageUrl.trim()];
    setImages(updated);
    storageService.updateVendor(vendor.id, { images: updated });
    showToast('New photograph added to portfolio!', 'success');
    setNewImageUrl('');
    setModalOpen(false);
  };

  const handleDeleteImage = (index: number) => {
    if (images.length <= 1) {
      showToast('You must maintain at least one portfolio image.', 'warning');
      return;
    }
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    storageService.updateVendor(vendor.id, { images: updated });
    showToast('Image removed from portfolio', 'info');
  };

  const handleSetCover = (imgUrl: string) => {
    storageService.updateVendor(vendor.id, { coverImage: imgUrl });
    showToast('Cover image updated!', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Visual Showcase</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Portfolio Gallery
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            High-resolution ceremony photographs displayed on your public profile
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Photograph
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => {
          const isCover = vendor.coverImage === img;

          return (
            <Card key={idx} className="p-0 overflow-hidden relative group">
              <div className="aspect-[4/3] bg-mauve-100 overflow-hidden">
                <img src={img} alt="Portfolio item" className="w-full h-full object-cover" />
              </div>

              {isCover && (
                <div className="absolute top-3 left-3 bg-roseGold-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Main Cover
                </div>
              )}

              <div className="p-3 bg-white flex items-center justify-between border-t border-blush-100">
                {!isCover ? (
                  <button
                    onClick={() => handleSetCover(img)}
                    className="text-xs font-semibold text-roseGold-700 hover:underline"
                  >
                    Set as Cover
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700">Active Cover</span>
                )}

                <button
                  onClick={() => handleDeleteImage(idx)}
                  className="p-1.5 text-mauve-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Image Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Portfolio Image"
        subtitle="Provide image URL to add to your high-definition gallery"
      >
        <form onSubmit={handleAddImage} className="space-y-4">
          <Input
            label="Image URL (Unsplash or direct image link)"
            placeholder="https://images.unsplash.com/photo-..."
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            required
          />

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Photograph
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
