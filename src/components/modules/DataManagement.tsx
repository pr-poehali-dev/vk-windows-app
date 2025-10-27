import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DataManagementProps {
  onBack: () => void;
}

const DataManagement = ({ onBack }: DataManagementProps) => {
  const [groupVkId, setGroupVkId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  
  const [postText, setPostText] = useState('');
  const [postMediaUrl, setPostMediaUrl] = useState('');
  const [postCategory, setPostCategory] = useState('');
  
  const [categoryName, setCategoryName] = useState('');

  const categories = ['Маркетинг', 'IT', 'Промо', 'Новости'];

  const handleAddGroup = () => {
    if (!groupVkId || !groupName) {
      toast.error('Заполните обязательные поля');
      return;
    }
    toast.success('Группа добавлена');
    setGroupVkId('');
    setGroupName('');
    setGroupCategory('');
    setGroupMembers('');
  };

  const handleAddPost = () => {
    if (!postText) {
      toast.error('Введите текст поста');
      return;
    }
    toast.success('Пост добавлен');
    setPostText('');
    setPostMediaUrl('');
    setPostCategory('');
  };

  const handleAddCategory = () => {
    if (!categoryName) {
      toast.error('Введите название категории');
      return;
    }
    toast.success('Категория добавлена');
    setCategoryName('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Добавление данных</h1>
            <p className="text-gray-600 mt-1">Управление группами, постами и категориями</p>
          </div>
        </div>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">Группы</TabsTrigger>
            <TabsTrigger value="posts">Посты</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>Добавление группы</CardTitle>
                <CardDescription>Добавьте новую группу ВКонтакте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupVkId">
                    VK ID группы <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="groupVkId"
                    placeholder="Введите ID группы"
                    value={groupVkId}
                    onChange={(e) => setGroupVkId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupName">
                    Название группы <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="groupName"
                    placeholder="Введите название группы"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupCategory">Категория</Label>
                  <Select value={groupCategory} onValueChange={setGroupCategory}>
                    <SelectTrigger id="groupCategory">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                      <SelectItem value="new">+ Создать новую</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupMembers">Количество участников</Label>
                  <Input
                    id="groupMembers"
                    type="number"
                    placeholder="Необязательное поле"
                    value={groupMembers}
                    onChange={(e) => setGroupMembers(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddGroup} className="flex-1">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить группу
                  </Button>
                  <Button variant="outline" onClick={onBack}>
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Добавление поста</CardTitle>
                <CardDescription>Создайте новый пост для публикации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="postText">
                    Текст поста <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="postText"
                    placeholder="Введите текст поста"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    rows={6}
                    maxLength={4096}
                  />
                  <p className="text-sm text-gray-500">{postText.length}/4096 символов</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postMediaUrl">Медиа-ссылка</Label>
                  <Input
                    id="postMediaUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={postMediaUrl}
                    onChange={(e) => setPostMediaUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postCategory">Категория</Label>
                  <Select value={postCategory} onValueChange={setPostCategory}>
                    <SelectTrigger id="postCategory">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                      <SelectItem value="new">+ Создать новую</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddPost} className="flex-1">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить пост
                  </Button>
                  <Button variant="outline" onClick={onBack}>
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Добавление категории</CardTitle>
                <CardDescription>Создайте новую категорию для организации данных</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">
                    Название категории <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="categoryName"
                    placeholder="Введите название категории"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddCategory} className="flex-1">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить категорию
                  </Button>
                  <Button variant="outline" onClick={onBack}>
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataManagement;
