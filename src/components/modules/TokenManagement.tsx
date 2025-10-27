import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface TokenManagementProps {
  onTokenSaved: () => void;
  onTokenDeleted: () => void;
  tokenSaved: boolean;
}

const TokenManagement = ({ onTokenSaved, onTokenDeleted, tokenSaved }: TokenManagementProps) => {
  const [token, setToken] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveToken = () => {
    if (token.length < 10) {
      toast.error('Некорректный токен. Введите действительный токен ВКонтакте');
      return;
    }
    localStorage.setItem('vk_token', token);
    toast.success('Токен успешно сохранен');
    onTokenSaved();
  };

  const handleEditToken = () => {
    const savedToken = localStorage.getItem('vk_token');
    if (savedToken) {
      setToken(savedToken);
      setIsEditing(true);
    }
  };

  const handleDeleteToken = () => {
    localStorage.removeItem('vk_token');
    setToken('');
    setIsEditing(false);
    toast.success('Токен удален');
    onTokenDeleted();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Управление токеном VK</CardTitle>
          <CardDescription>
            {isEditing ? 'Редактируйте токен доступа' : 'Введите токен доступа для начала работы'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="token">Токен доступа ВКонтакте</Label>
            <Input
              id="token"
              type="password"
              placeholder="Введите токен ВКонтакте"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono"
              disabled={tokenSaved && !isEditing}
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSaveToken} 
              className="flex-1"
              disabled={!token || (tokenSaved && !isEditing)}
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleEditToken}
              disabled={!tokenSaved || isEditing}
            >
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleDeleteToken}
              disabled={!tokenSaved}
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Удалить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenManagement;
