import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DatabaseManagementProps {
  onBack: () => void;
}

interface Group {
  id: string;
  vkId: string;
  name: string;
  category: string;
  members: number;
}

interface Post {
  id: string;
  text: string;
  hasMedia: boolean;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface Token {
  id: string;
  token: string;
  dateAdded: string;
}

const DatabaseManagement = ({ onBack }: DatabaseManagementProps) => {
  const [searchGroups, setSearchGroups] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState<'group' | 'post' | 'category' | 'token'>('group');

  const [groups, setGroups] = useState<Group[]>([
    { id: '1', vkId: '12345', name: 'Группа 1', category: 'Маркетинг', members: 5000 },
    { id: '2', vkId: '67890', name: 'Группа 2', category: 'IT', members: 3000 },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { id: '1', text: 'Отличное предложение для вас!', hasMedia: true, category: 'Промо' },
    { id: '2', text: 'Важная новость дня', hasMedia: false, category: 'Новости' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Маркетинг' },
    { id: '2', name: 'IT' },
    { id: '3', name: 'Промо' },
    { id: '4', name: 'Новости' },
  ]);

  const [tokens, setTokens] = useState<Token[]>([
    { id: '1', token: 'vk1.a.***************', dateAdded: '2025-10-20 14:30' },
  ]);

  const handleEdit = (type: 'group' | 'post' | 'category' | 'token', item: any) => {
    setEditType(type);
    setEditItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (type: 'group' | 'post' | 'category' | 'token', id: string) => {
    switch (type) {
      case 'group':
        setGroups(groups.filter(g => g.id !== id));
        break;
      case 'post':
        setPosts(posts.filter(p => p.id !== id));
        break;
      case 'category':
        setCategories(categories.filter(c => c.id !== id));
        break;
      case 'token':
        setTokens(tokens.filter(t => t.id !== id));
        break;
    }
    toast.success('Запись удалена');
  };

  const handleSaveEdit = () => {
    toast.success('Изменения сохранены');
    setEditDialogOpen(false);
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchGroups.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Работа с БД</h1>
            <p className="text-gray-600 mt-1">Управление всеми данными системы</p>
          </div>
        </div>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups">Группы</TabsTrigger>
            <TabsTrigger value="posts">Посты</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="tokens">Токены</TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>Управление группами</CardTitle>
                <CardDescription>Просмотр и редактирование групп</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Поиск по названию</Label>
                    <Input
                      placeholder="Введите название группы"
                      value={searchGroups}
                      onChange={(e) => setSearchGroups(e.target.value)}
                    />
                  </div>
                  <div className="w-64">
                    <Label>Категория</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Участники</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGroups.map((group) => (
                        <TableRow key={group.id}>
                          <TableCell className="font-mono">{group.vkId}</TableCell>
                          <TableCell className="font-medium">{group.name}</TableCell>
                          <TableCell>{group.category}</TableCell>
                          <TableCell>{group.members.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit('group', group)}
                              >
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete('group', group.id)}
                              >
                                <Icon name="Trash2" size={14} className="mr-1" />
                                Удалить
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Управление постами</CardTitle>
                <CardDescription>Просмотр и редактирование постов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Текст поста</TableHead>
                        <TableHead>Медиа</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="max-w-md truncate">{post.text}</TableCell>
                          <TableCell>
                            {post.hasMedia && <Icon name="Image" size={16} className="text-blue-600" />}
                          </TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit('post', post)}
                              >
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete('post', post.id)}
                              >
                                <Icon name="Trash2" size={14} className="mr-1" />
                                Удалить
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Управление категориями</CardTitle>
                <CardDescription>Просмотр и редактирование категорий</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название категории</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit('category', category)}
                              >
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete('category', category.id)}
                              >
                                <Icon name="Trash2" size={14} className="mr-1" />
                                Удалить
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <Card>
              <CardHeader>
                <CardTitle>Управление токенами</CardTitle>
                <CardDescription>Просмотр и редактирование токенов доступа</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Активный токен</TableHead>
                        <TableHead>Дата добавления</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-mono">{token.token}</TableCell>
                          <TableCell>{token.dateAdded}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit('token', token)}
                              >
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete('token', token.id)}
                              >
                                <Icon name="Trash2" size={14} className="mr-1" />
                                Удалить
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование</DialogTitle>
              <DialogDescription>Внесите изменения в запись</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {editType === 'group' && editItem && (
                <>
                  <div className="space-y-2">
                    <Label>Название группы</Label>
                    <Input defaultValue={editItem.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select defaultValue={editItem.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {editType === 'post' && editItem && (
                <div className="space-y-2">
                  <Label>Текст поста</Label>
                  <Textarea defaultValue={editItem.text} rows={6} />
                </div>
              )}

              {editType === 'category' && editItem && (
                <div className="space-y-2">
                  <Label>Название категории</Label>
                  <Input defaultValue={editItem.name} />
                </div>
              )}

              {editType === 'token' && editItem && (
                <div className="space-y-2">
                  <Label>Токен</Label>
                  <Input type="password" defaultValue={editItem.token} />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveEdit}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DatabaseManagement;
