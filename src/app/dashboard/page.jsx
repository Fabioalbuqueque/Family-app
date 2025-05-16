'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  StylesMain,StylesHeader,StylesUserName,
  StylesLogoutButton,StylesAddButton,StylesModal,StylesModalContent,
  StylesModalHeader,StylesModalClose,StylesModalForm,StylesModalInput,StylesModalSelect,
  StylesModalButton,StylesSummaryCards,StylesSummaryCard,StylesSummaryTitle,StylesSummaryValue,
  StylesActivitiesList,StylesActivitiesTitle,StylesActivityItem,StylesActivityInfo,StylesActivityDescription,
  StylesActivityDate,StylesActivityValue,StylesNoActivities,StylesActivityActions,StylesEditButton,
  StylesSaveButton,StylesCancelButton,StylesActivityEditForm,StylesActivityEditInput,StylesActivityEditSelect,
  StylesDeleteButton,StylesPasswordModal,StylesPasswordModalContent,StylesPasswordModalHeader,StylesPasswordModalTitle,
  StylesPasswordModalClose,StylesPasswordModalForm,StylesPasswordModalInput,
StylesPasswordModalButton,
  StylesPasswordModalError,
  StylesCheckboxLabel
} from './dashboard.style'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false)
  const [activityName, setActivityName] = useState('')
  const [editError, setEditError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [formData, setFormData] = useState({
    type: 'receita',
    description: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    isCard: false,
    category: 'Outros'
  })
  const [showCardModal, setShowCardModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [checkedActivities, setCheckedActivities] = useState({})
  const [categories] = useState([ ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showGoalsModal, setShowGoalsModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUncheckModal, setShowUncheckModal] = useState(false)
  const [activityToUncheck, setActivityToUncheck] = useState(null)
  const [financialGoals, setFinancialGoals] = useState([])
  const [newGoal, setNewGoal] = useState({
    description: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // Buscar dados do usuário no localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    setUser(JSON.parse(userData))

    // Buscar transações do localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    setTransactions(storedTransactions)

    // Carregar metas do localStorage
    const storedGoals = JSON.parse(localStorage.getItem('financialGoals') || '[]')
    setFinancialGoals(storedGoals)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleAddTransaction = (e) => {
    e.preventDefault()
    
    const newTransaction = {
      id: Date.now(),
      ...formData,
      value: parseFloat(formData.value),
      category: formData.category || 'Outros'
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    
    setShowModal(false)
    setFormData({
      type: 'receita',
      description: '',
      value: '',
      date: new Date().toISOString().split('T')[0],
      isCard: false,
      category: 'Outros'
    })
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction({
      ...transaction,
      value: transaction.value.toString()
    })
    setEditError('')
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    
    if (!editingTransaction) return

    if (!editingTransaction.description || !editingTransaction.value || !editingTransaction.date) {
      setEditError('Por favor, preencha todos os campos')
      return
    }

    const value = parseFloat(editingTransaction.value)
    if (isNaN(value)) {
      setEditError('Por favor, insira um valor válido')
      return
    }

    const updatedTransactions = transactions.map(t => {
      if (t.id === editingTransaction.id) {
        return {
          ...editingTransaction,
          value: value
        }
      }
      return t
    })
    
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    
    setEditingTransaction(null)
    setEditError('')
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditingTransaction(prev => ({
      ...prev,
      [name]: value
    }))
    setEditError('')
  }

  const handleCancelEdit = () => {
    setEditingTransaction(null)
    setEditError('')
  }

  const handleDeleteTransaction = (transaction) => {
    setTransactionToDelete(transaction)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = (e) => {
    e.preventDefault()
    
    if (activityName !== transactionToDelete.description) {
      setDeleteError('Nome da atividade incorreto')
      return
    }

    const updatedTransactions = transactions.filter(t => t.id !== transactionToDelete.id)
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    
    setShowDeleteModal(false)
    setActivityName('')
    setDeleteError('')
    setTransactionToDelete(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getTotal = (type) => {
    return transactions
      .filter(t => t.type === type)
      .reduce((total, t) => total + t.value, 0)
  }

  const getSaldo = () => {
    const totalReceitas = getTotal('receita')
    const totalGastos = getTotal('gasto')
    return totalReceitas - totalGastos
  }

  const handleCardTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setShowCardModal(true)
  }

  const handleCloseCardModal = () => {
    setShowCardModal(false)
    setSelectedTransaction(null)
  }

  const handleCheckboxChange = (id) => {
    if (checkedActivities[id]) {
      setActivityToUncheck(id)
      setShowUncheckModal(true)
    } else {
      setCheckedActivities(prev => ({
        ...prev,
        [id]: true
      }))
    }
  }

  const handleConfirmUncheck = () => {
    if (activityToUncheck) {
      setCheckedActivities(prev => ({
        ...prev,
        [activityToUncheck]: false
      }))
      setShowUncheckModal(false)
      setActivityToUncheck(null)
    }
  }

  const handleCancelUncheck = () => {
    setShowUncheckModal(false)
    setActivityToUncheck(null)
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleAddGoal = (e) => {
    e.preventDefault()
    
    const goal = {
      id: Date.now(),
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount)
    }

    const updatedGoals = [...financialGoals, goal]
    setFinancialGoals(updatedGoals)
    localStorage.setItem('financialGoals', JSON.stringify(updatedGoals))
    
    setShowGoalsModal(false)
    setNewGoal({
      description: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: new Date().toISOString().split('T')[0]
    })
  }

  const handleUpdateGoalProgress = (goalId, amount) => {
    const updatedGoals = financialGoals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount)
        return { ...goal, currentAmount: newAmount }
      }
      return goal
    })
    
    setFinancialGoals(updatedGoals)
    localStorage.setItem('financialGoals', JSON.stringify(updatedGoals))
  }

  if (!user) {
    return null
  }

  return (
    <StylesMain>
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .mobile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
          }
          .mobile-menu.show {
            display: flex;
            flex-direction: column;
          }
          .mobile-menu-button {
            display: block !important;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
            color: #333;
          }
          .header-container {
            flex-direction: column;
            align-items: flex-start;
            position: relative;
          }
          .user-info {
            flex-direction: column;
            width: 100%;
          }
          .add-button {
            width: 100%;
            margin-left: 0 !important;
            margin-bottom: 10px;
          }
          .logout-button {
            width: 100%;
          }
          .content-container {
            padding: 10px;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
          .desktop-menu {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <StylesHeader>
        <div className="header-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            width: '100%',
            justifyContent: 'space-between'
          }}>
            <StylesUserName>{user.name}</StylesUserName>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="mobile-menu-button"
            >
              {showMobileMenu ? '✕' : '☰'}
            </button>
          </div>
          
          {/* Menu Desktop */}
          <div className="desktop-menu">
            <StylesAddButton 
              onClick={() => setShowModal(true)}
            >
              Adicionar
            </StylesAddButton>
            <StylesAddButton 
              onClick={() => setShowFilters(!showFilters)}
              style={{ 
                backgroundColor: showFilters ? '#4CAF50' : '#2196F3'
              }}
            >
              {showFilters ? 'Ocultar Filtros' : 'Filtros'}
            </StylesAddButton>
            <StylesAddButton 
              onClick={() => setShowGoalsModal(true)}
              style={{ 
                backgroundColor: '#9C27B0'
              }}
            >
              Metas
            </StylesAddButton>
            <StylesLogoutButton 
              onClick={handleLogout}
              style={{ 
                backgroundColor: '#dc3545',
              }}
            >
              Sair
            </StylesLogoutButton>
          </div>

          {/* Menu Mobile */}
          <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
            <div className="user-info" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%'
            }}>
              <StylesAddButton 
                onClick={() => {
                  setShowModal(true)
                  setShowMobileMenu(false)
                }}
                className="add-button"
              >
                Adicionar
              </StylesAddButton>
              <StylesAddButton 
                onClick={() => {
                  setShowFilters(!showFilters)
                  setShowMobileMenu(false)
                }}
                className="add-button"
                style={{ 
                  backgroundColor: showFilters ? '#4CAF50' : '#2196F3'
                }}
              >
                {showFilters ? 'Ocultar Filtros' : 'Filtros'}
              </StylesAddButton>
              <StylesAddButton 
                onClick={() => {
                  setShowGoalsModal(true)
                  setShowMobileMenu(false)
                }}
                className="add-button"
                style={{ 
                  backgroundColor: '#9C27B0'
                }}
              >
                Metas
              </StylesAddButton>
              <StylesLogoutButton 
                onClick={handleLogout}
                className="logout-button"
                style={{ 
                  backgroundColor: '#dc3545',
                }}
              >
                Sair
              </StylesLogoutButton>
            </div>
          </div>
        </div>
      </StylesHeader>

      <div className="content-container">
        {showFilters && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <div style={{ 
                display: 'flex', 
                flex: 1, 
                gap: '10px',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <input
                  type="text"
                  placeholder="Buscar por descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '8px',
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 10px',
                    color: '#666',
                    fontSize: '16px'
                  }}
                >
                  {searchTerm ? '×' : '🔍'}
                </button>
              </div>
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: searchTerm ? 'block' : 'none'
                }}
              >
                Limpar
              </button>
            </div>
            {searchTerm && (
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                marginTop: '5px'
              }}>
                {filteredTransactions.length} {filteredTransactions.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </div>
            )}
          </div>
        )}

        <StylesSummaryCards>
          <StylesSummaryCard>
            <StylesSummaryTitle>Saldo Atual</StylesSummaryTitle>
            <StylesSummaryValue type="saldo">
              {formatCurrency(getSaldo())}
            </StylesSummaryValue>
          </StylesSummaryCard>

          <StylesSummaryCard>
            <StylesSummaryTitle>Entradas</StylesSummaryTitle>
            <StylesSummaryValue type="entrada">
              {formatCurrency(getTotal('receita'))}
            </StylesSummaryValue>
          </StylesSummaryCard>

          <StylesSummaryCard>
            <StylesSummaryTitle>Gastos</StylesSummaryTitle>
            <StylesSummaryValue type="gasto">
              {formatCurrency(getTotal('gasto'))}
            </StylesSummaryValue>
          </StylesSummaryCard>
        </StylesSummaryCards>

        {financialGoals.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '15px' }}>Metas Financeiras</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
              {financialGoals.map(goal => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                return (
                  <div key={goal.id} style={{
                    padding: '15px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ marginBottom: '10px' }}>{goal.description}</h3>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ 
                        width: '100%', 
                        height: '20px', 
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: progress >= 100 ? '#4CAF50' : '#2196F3',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span>Progresso: {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                      <span>Meta: {formatDate(goal.deadline)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="number"
                        placeholder="Valor"
                        style={{
                          padding: '5px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          flex: 1
                        }}
                        onChange={(e) => handleUpdateGoalProgress(goal.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <StylesActivitiesList>
          <StylesActivitiesTitle>Todas as Atividades</StylesActivitiesTitle>
          {filteredTransactions.length === 0 ? (
            <StylesNoActivities>Nenhuma atividade registrada</StylesNoActivities>
          ) : (
            filteredTransactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(transaction => (
                <StylesActivityItem key={transaction.id}>
                  {editingTransaction?.id === transaction.id ? (
                    <StylesActivityEditForm onSubmit={handleSaveEdit}>
                      <input
                        type="checkbox"
                        checked={!!checkedActivities[transaction.id]}
                        onChange={() => handleCheckboxChange(transaction.id)}
                        style={{ marginRight: '8px' }}
                      />
                      {editError && (
                        <div style={{ 
                          color: 'red', 
                          marginBottom: '10px',
                          fontSize: '0.9em'
                        }}>
                          {editError}
                        </div>
                      )}
                      <StylesActivityEditSelect
                        name="type"
                        value={editingTransaction.type}
                        onChange={handleEditChange}
                        required
                      >
                        <option value="receita">Receita</option>
                        <option value="gasto">Gasto</option>
                      </StylesActivityEditSelect>
                      
                      <StylesActivityEditSelect
                        name="category"
                        value={editingTransaction.category}
                        onChange={handleEditChange}
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </StylesActivityEditSelect>
                      
                      <StylesActivityEditInput
                        type="text"
                        name="description"
                        value={editingTransaction.description}
                        onChange={handleEditChange}
                        placeholder="Descrição"
                        required
                      />
                      
                      <StylesActivityEditInput
                        type="number"
                        name="value"
                        value={editingTransaction.value}
                        onChange={handleEditChange}
                        step="0.01"
                        min="0"
                        placeholder="Valor"
                        required
                      />
                      
                      <StylesActivityEditInput
                        type="date"
                        name="date"
                        value={editingTransaction.date}
                        onChange={handleEditChange}
                        required
                      />
                      
                      <StylesActivityActions>
                        <StylesSaveButton type="submit" onClick={handleSaveEdit}>
                          Salvar Alterações
                        </StylesSaveButton>
                        <StylesCancelButton type="button" onClick={handleCancelEdit}>
                          Cancelar
                        </StylesCancelButton>
                      </StylesActivityActions>
                    </StylesActivityEditForm>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={!!checkedActivities[transaction.id]}
                        onChange={() => handleCheckboxChange(transaction.id)}
                        style={{ marginRight: '8px' }}
                      />
                      <StylesActivityInfo>
                        <StylesActivityDescription>
                          {transaction.description}
                          {checkedActivities[transaction.id] && (
                            <span style={{ 
                              marginLeft: '8px', 
                              color: '#4CAF50', 
                              fontWeight: 'bold',
                              fontSize: '0.9em'
                            }}>
                              (Pago)
                            </span>
                          )}
                        </StylesActivityDescription>
                        <StylesActivityDate>
                          {formatDate(transaction.date)}
                        </StylesActivityDate>
                      </StylesActivityInfo>
                      <StylesActivityValue type={transaction.type}>
                        {formatCurrency(transaction.value)}
                      </StylesActivityValue>
                      <StylesActivityActions>
                        <StylesEditButton onClick={() => handleEditTransaction(transaction)}>
                          Editar
                        </StylesEditButton>
                        <StylesDeleteButton onClick={() => handleDeleteTransaction(transaction)}>
                          Apagar
                        </StylesDeleteButton>
                      </StylesActivityActions>
                    </>
                  )}
                </StylesActivityItem>
              ))
          )}
        </StylesActivitiesList>

        {showModal && (
          <StylesModal>
            <StylesModalContent>
              <StylesModalHeader>
                <h2>Adicionar</h2>
                <StylesModalClose onClick={() => setShowModal(false)}>
                  ×
                </StylesModalClose>
              </StylesModalHeader>

              <StylesModalForm onSubmit={handleAddTransaction}>
                <StylesModalSelect
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="receita">Entradas</option>
                  <option value="gasto">Gasto</option>
                </StylesModalSelect>

                <StylesModalInput
                  type="text"
                  name="description"
                  placeholder="Descrição"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <StylesModalInput
                  type="number"
                  name="value"
                  placeholder="Valor"
                  value={formData.value}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />

                <StylesModalInput
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                {formData.type === 'gasto' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StylesModalInput
                      type="checkbox"
                      id="isCard"
                      name="isCard"
                      checked={formData.isCard}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        isCard: e.target.checked
                      }))}
                    />
                    <StylesCheckboxLabel htmlFor="isCard">
                      Gasto com cartão
                    </StylesCheckboxLabel>
                  </div>
                )}

                <StylesModalButton type="submit">
                  Adicionar
                </StylesModalButton>
              </StylesModalForm>
            </StylesModalContent>
          </StylesModal>
        )}

        {showDeleteModal && (
          <StylesPasswordModal>
            <StylesPasswordModalContent>
              <StylesPasswordModalHeader>
                <StylesPasswordModalTitle>Confirmar Exclusão</StylesPasswordModalTitle>
                <StylesPasswordModalClose onClick={() => {
                  setShowDeleteModal(false)
                  setActivityName('')
                  setDeleteError('')
                  setTransactionToDelete(null)
                }}>
                  ×
                </StylesPasswordModalClose>
              </StylesPasswordModalHeader>

              <StylesPasswordModalForm onSubmit={handleConfirmDelete}>
                <p style={{ marginBottom: '1rem' }}>
                  Digite o nome da atividade para confirmar a exclusão:
                </p>
                <StylesPasswordModalInput
                  type="text"
                  placeholder="Digite o nome da atividade"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  required
                />
                {deleteError && (
                  <StylesPasswordModalError>{deleteError}</StylesPasswordModalError>
                )}
                <StylesPasswordModalButton type="submit">
                  Confirmar
                </StylesPasswordModalButton>
              </StylesPasswordModalForm>
            </StylesPasswordModalContent>
          </StylesPasswordModal>
        )}

        {showSaveConfirmModal && (
          <StylesPasswordModal>
            <StylesPasswordModalContent>
              <StylesPasswordModalHeader>
                <StylesPasswordModalTitle>Confirmar Atualização</StylesPasswordModalTitle>
                <StylesPasswordModalClose onClick={handleCancelEdit}>
                  ×
                </StylesPasswordModalClose>
              </StylesPasswordModalHeader>

              <StylesPasswordModalForm onSubmit={(e) => {
                e.preventDefault()
                handleSaveEdit()
              }}>
                <p style={{ marginBottom: '1rem' }}>
                  Deseja realmente salvar as alterações?
                </p>
                <StylesPasswordModalButton type="submit">
                  Confirmar
                </StylesPasswordModalButton>
                <StylesCancelButton type="button" onClick={handleCancelEdit}>
                  Cancelar
                </StylesCancelButton>
              </StylesPasswordModalForm>
            </StylesPasswordModalContent>
          </StylesPasswordModal>
        )}

        {showCardModal && selectedTransaction && (
          <StylesModal>
            <StylesModalContent>
              <StylesModalHeader>
                <h2>Detalhes do Cartão</h2>
                <StylesModalClose onClick={handleCloseCardModal}>
                  ×
                </StylesModalClose>
              </StylesModalHeader>

              <div style={{ padding: '20px' }}>
                <p><strong>Descrição:</strong> {selectedTransaction.description}</p>
                <p><strong>Valor:</strong> {formatCurrency(selectedTransaction.value)}</p>
                <p><strong>Data:</strong> {formatDate(selectedTransaction.date)}</p>
                <p><strong>Tipo:</strong> {selectedTransaction.type === 'receita' ? 'Entrada' : 'Gasto'}</p>
              </div>
            </StylesModalContent>
          </StylesModal>
        )}

        {showGoalsModal && (
          <StylesModal>
            <StylesModalContent>
              <StylesModalHeader>
                <h2>Nova Meta Financeira</h2>
                <StylesModalClose onClick={() => setShowGoalsModal(false)}>
                  ×
                </StylesModalClose>
              </StylesModalHeader>

              <StylesModalForm onSubmit={handleAddGoal}>
                <StylesModalInput
                  type="text"
                  placeholder="Descrição da meta"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  required
                />

                <StylesModalInput
                  type="number"
                  placeholder="Valor alvo"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  step="0.01"
                  min="0"
                  required
                />

                <StylesModalInput
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  required
                />

                <StylesModalButton type="submit">
                  Adicionar Meta
                </StylesModalButton>
              </StylesModalForm>
            </StylesModalContent>
          </StylesModal>
        )}

        {showUncheckModal && (
          <StylesModal>
            <StylesModalContent>
              <StylesModalHeader>
                <h2>Confirmar Alteração</h2>
                <StylesModalClose onClick={() => setShowUncheckModal(false)}>
                  ×
                </StylesModalClose>
              </StylesModalHeader>

              <div style={{ padding: '20px' }}>
                <p style={{ marginBottom: '20px' }}>
                  Tem certeza que deseja marcar esta atividade como não paga?
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <StylesCancelButton onClick={() => setShowUncheckModal(false)}>
                    Cancelar
                  </StylesCancelButton>
                  <StylesSaveButton onClick={handleConfirmUncheck}>
                    Confirmar
                  </StylesSaveButton>
                </div>
              </div>
            </StylesModalContent>
          </StylesModal>
        )}
      </div>
    </StylesMain>
  )
} 