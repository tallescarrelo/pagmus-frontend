import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
  columns: {
    'column-1': { id: 'column-1', title: 'Reportados', icon: 'mdi:alert-circle-outline', taskIds: ['task-1', 'task-2'] },
    'column-2': { id: 'column-2', title: 'Enviados', icon: 'mdi:truck-fast-outline', taskIds: ['task-3'] },
    'column-3': { id: 'column-3', title: 'Saiu para Entrega', icon: 'mdi:truck-delivery-outline', taskIds: [] },
    'column-4': { id: 'column-4', title: 'Retirar nos Correios', icon: 'mdi:email-outline', taskIds: [] },
    'column-5': { id: 'column-5', title: 'Requer Atenção', icon: 'mdi:alert-outline', taskIds: [] },
    'column-6': { id: 'column-6', title: 'Entregues', icon: 'mdi:check-circle-outline', taskIds: ['task-4'] },
    'column-7': { id: 'column-7', title: 'Inadimplências', icon: 'mdi:currency-usd-off', taskIds: [] },
  },
  tasks: {
    'task-1': { id: 'task-1', name: 'Almir De Souza Santos', produto: 'Combo Suplementos', quantidade: 3, data: '01/07/2025', status: 'Em Análise', badgeColor: 'warning', avatar: 'https://ui-avatars.com/api/?name=Almir+Santos' },
    'task-2': { id: 'task-2', name: 'Maria Batista Da Silva', produto: 'Kit Imunidade', quantidade: 2, data: '01/07/2025', status: 'Em Análise', badgeColor: 'warning', avatar: 'https://ui-avatars.com/api/?name=Maria+Batista' },
    'task-3': { id: 'task-3', name: 'Tania Maria Corrêa', produto: 'Chá Detox', quantidade: 1, data: '02/07/2025', status: 'Preparando', badgeColor: 'info', avatar: 'https://ui-avatars.com/api/?name=Tania+Correa' },
    'task-4': { id: 'task-4', name: 'José Carlos Jardim', produto: 'Suplemento Masculino', quantidade: 1, data: '29/06/2025', status: 'Entregue', badgeColor: 'success', avatar: 'https://ui-avatars.com/api/?name=Jose+Jardim' },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7'],
};

const DashboardLayout = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = { ...start, taskIds: startTaskIds };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = { ...finish, taskIds: finishTaskIds };

      setData({
        ...data,
        columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish },
      });
    }
  };

  return (
    <div className="container-fluid px-3 py-4">
      {/* Top 3 Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card h-100 p-3">
            <h5 className="mb-3">Resumo de Vendas</h5>
            <div className="d-flex flex-column gap-3">
              <div className="bg-dark text-white rounded p-3 shadow-sm">
                <div className="text-sm text-muted">Hoje</div>
                <div className="fw-bold fs-5">R$ 1.250,00</div>
              </div>
              <div className="bg-dark text-white rounded p-3 shadow-sm">
                <div className="text-sm text-muted">Na Semana</div>
                <div className="fw-bold fs-5">R$ 8.430,00</div>
              </div>
              <div className="bg-dark text-white rounded p-3 shadow-sm">
                <div className="text-sm text-muted">No Mês</div>
                <div className="fw-bold fs-5">R$ 32.140,00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          
        </div>

        <div className="col-md-4">
          <div className="card h-100 p-3 text-center">
            <h5 className="mb-3">Distribuição Geográfica</h5>
            <img src="/assets/mapa-brasil.png" alt="Mapa Brasil" className="img-fluid" style={{ maxHeight: 250, objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* Kanban */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="d-flex gap-3 overflow-auto pb-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <div className="card min-w-300px" key={column.id}>
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <div>
                    <Icon icon={column.icon} className="me-2" /> {column.title}
                  </div>
                  <span className="badge bg-light text-dark">{tasks.length}</span>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div className="card-body" ref={provided.innerRef} {...provided.droppableProps}>
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              className="card bg-light mb-3 shadow-sm"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="card-body p-2">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <img src={task.avatar} alt={task.name} className="rounded-circle" width={32} height={32} />
                                  <strong>{task.name}</strong>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted mb-1">
                                  <Icon icon="mdi:package-variant-closed" className="me-1" />
                                  <span>{task.produto} ({task.quantidade})</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-muted">
                                  <Icon icon="mdi:calendar" className="me-1" />
                                  <span>{task.data}</span>
                                </div>
                                <span className={`badge bg-${task.badgeColor} mt-2`}>{task.status}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DashboardLayout;
