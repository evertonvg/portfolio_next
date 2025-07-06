'use client';

import { useState, MouseEvent } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  active: boolean;
  online: boolean;
  image: string | null;
};

type DashboardProps = {
  users: UserProps[];
};

type SortConfig = {
  key: 'name' | 'email' | 'active' | null;
  direction: 'asc' | 'desc' | null;
};

const TruncatedCell = ({ text }: { text: string }) => {
  const isLong = text.length > 20;
  const truncated = text.slice(0, 20) + '...';

  return isLong ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-pointer text-gray-500">{truncated}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    <span className="text-gray-500">{text}</span>
  );
};

const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

// Função para renderizar dots de paginação (máx 5 dots, centrado na página atual)
function PaginationDots({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages === 0) return null;

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-3 h-3 rounded-full transition-colors ${
            page === currentPage
              ? 'bg-gray-700 dark:bg-gray-300'
              : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300'
          }`}
          aria-label={`Página ${page}`}
          title={`Página ${page}`}
          type="button"
        />
      ))}
    </div>
  );
}

export default function DashboardPageClient({ users }: DashboardProps) {
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomStyle, setZoomStyle] = useState<{ backgroundPosition?: string }>({});
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const usersPerPage = 10;

  // Ordenação
  const sortedUsers = () => {
    if (!sortConfig.key || !sortConfig.direction) {
      return users;
    }
    const sorted = [...users].sort((a, b) => {
      let aVal: string | boolean = '';
      let bVal: string | boolean = '';

      switch (sortConfig.key) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'email':
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case 'active':
          aVal = a.active;
          bVal = b.active;
          break;
      }

      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        if (aVal === bVal) return 0;
        return (aVal ? 1 : -1) * (sortConfig.direction === 'asc' ? 1 : -1);
      }

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const paginatedUsers = sortedUsers().slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.ceil(users.length / usersPerPage);

  let clickTimeout: NodeJS.Timeout | null = null;

  const handleSort = (key: SortConfig['key']) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      setSortConfig({ key: null, direction: null });
      setCurrentPage(1);
      return;
    }

    clickTimeout = setTimeout(() => {
      setSortConfig((prev) => {
        if (prev.key !== key) {
          return { key, direction: 'asc' };
        }
        if (prev.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return { key: null, direction: null };
      });
      setCurrentPage(1);
      clickTimeout = null;
    }, 250);
  };

  const handleZoom = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseEnter = () => setIsZoomActive(true);
  const handleMouseLeave = () => {
    setIsZoomActive(false);
    setZoomStyle({ backgroundPosition: 'center' });
  };

  const renderSortIndicator = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'asc') return <span> ▲</span>;
    if (sortConfig.direction === 'desc') return <span> ▼</span>;
    return null;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 pb-24 relative">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Usuários</h1>
      <p className="text-gray-500 mb-6">
        Mostrando {paginatedUsers.length} usu{paginatedUsers.length === 1 ? 'ário' : 'ários'} de {users.length} totais
      </p>

      <TooltipProvider>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500 font-bold">Imagem</TableHead>
                <TableHead
                  className="text-gray-500 font-bold cursor-pointer select-none"
                  onClick={() => handleSort('name')}
                  onDoubleClick={() => handleSort('name')}
                  title="Clique para ordenar, duplo clique para limpar ordenação"
                >
                  Nome{renderSortIndicator('name')}
                </TableHead>
                <TableHead
                  className="text-gray-500 font-bold cursor-pointer select-none"
                  onClick={() => handleSort('email')}
                  onDoubleClick={() => handleSort('email')}
                  title="Clique para ordenar, duplo clique para limpar ordenação"
                >
                  Email{renderSortIndicator('email')}
                </TableHead>
                <TableHead className="text-gray-500 font-bold">Telefone</TableHead>
                <TableHead className="text-gray-500 font-bold">Localização</TableHead>
                <TableHead className="text-gray-500 font-bold">Online</TableHead>
                <TableHead
                  className="text-gray-500 font-bold cursor-pointer select-none"
                  onClick={() => handleSort('active')}
                  onDoubleClick={() => handleSort('active')}
                  title="Clique para ordenar, duplo clique para limpar ordenação"
                >
                  Ativo{renderSortIndicator('active')}
                </TableHead>
                <TableHead className="text-gray-500 font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-gray-500">
                    {user.image ? (
                      <div
                        onClick={() =>
                          setSelectedImage(user.image && user.image.startsWith('http') ? user.image : `http://localhost:3333/${user.image}`)
                        }
                        className="cursor-pointer inline-block"
                      >
                        <Image
                          src={user.image.startsWith('http') ? user.image : `http://localhost:3333/${user.image}`}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                    )}
                  </TableCell>
                  <TableCell><TruncatedCell text={user.name} /></TableCell>
                  <TableCell><TruncatedCell text={user.email} /></TableCell>
                  <TableCell className="text-gray-500">{formatPhone(user.phone)}</TableCell>
                  <TableCell>
                    <TruncatedCell text={`${user.city}, ${user.state}, ${user.country}`} />
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {user.online ? (
                      <span className="inline-block w-4 h-4 rounded-full bg-green-500 animate-pulse" title="Online" />
                    ) : (
                      <span
                        className="inline-block w-4 h-4 rounded-full bg-black shadow-[0_0_5px_1px_rgba(255,255,255,0.3)]"
                        title="Offline"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className={`font-medium ${
                        user.active ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {user.active ? 'Ativo' : 'Inativo'}
                    </Button>
                  </TableCell>
                  <TableCell className="flex gap-2 text-gray-500">
                    <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                      <Eye className="w-4 h-4 mr-1" /> Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-1" /> Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" /> Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação fixada */}
        <div className="fixed bottom-4 left-0 w-full flex justify-center gap-4 z-10">
          <div className="bg-white border rounded-md shadow-md px-3 py-2 flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <PaginationDots
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />

            <Button
              variant="outline"
              size="sm"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Modal de Detalhes */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Usuário</DialogTitle>
              <DialogDescription>
                Veja os dados completos do usuário selecionado.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Nome:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Telefone:</strong> {formatPhone(selectedUser.phone)}</p>
                <p><strong>Localização:</strong> {selectedUser.city}, {selectedUser.state}, {selectedUser.country}</p>
                <p><strong>Status:</strong> {selectedUser.active ? 'Ativo' : 'Inativo'}</p>
                <Button
                  className="mt-4 flex items-center gap-2"
                  variant="secondary"
                  onClick={() => alert(`Conversar com ${selectedUser.name} - Funcionalidade futura`)}
                >
                  <MessageCircle className="w-5 h-5" />
                  Conversar com esse usuário
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de imagem com zoom */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Visualizar imagem</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div
                onMouseMove={isZoomActive ? handleZoom : undefined}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full h-[400px] border rounded-md bg-no-repeat"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: isZoomActive ? '200%' : 'contain',
                  backgroundPosition: isZoomActive
                    ? zoomStyle.backgroundPosition
                    : 'center',
                  transition: 'background-size 0.3s ease',
                  cursor: isZoomActive ? 'zoom-in' : 'default',
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
